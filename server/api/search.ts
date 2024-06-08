import {
  AutoTokenizer,
  CLIPTextModelWithProjection,
} from "@xenova/transformers";

import { serverSupabaseClient } from "#supabase/server";

const model_id = "Xenova/clip-vit-base-patch16";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event);

  if (body.query === "") {
      let { data } = await client.rpc("get_random_images");
      return data
  }

  const tokenizer = await AutoTokenizer.from_pretrained(model_id);

  const text_model = await CLIPTextModelWithProjection.from_pretrained(
    model_id,
    {
      quantized: false,
    }
  );

  let text_inputs = tokenizer(body.query, { padding: true, truncation: true });

  // Compute embeddings
  const { text_embeds } = await text_model(text_inputs);
  const query_embedding = text_embeds.tolist()[0];


  let { data, error } = await client.rpc("match_gifs", {
    query_embedding,
    match_threshold: 0.1,
    match_count: 20,
  } as any);

  if (error) {
    console.warn("Error fetching images", error);
    return { error: error };
  }

  return data;
});
