type Image = {
  id: number;
  name: string;
  pathname: string;
  offsetWidth: number;
};

type ImageSupa = {
  id: number;
  image_url: string;
};

export default defineNuxtPlugin(() => {
  const searchQuery = ref("");
  const debouncedSearchQuery = refDebounced(searchQuery, 300);
  const images = ref();

  const baseUrl =
    "https://raw.githubusercontent.com/snipe/animated-gifs/master/";

  const filenameToImage = (items: ImageSupa[]): Image[] => {
    return items.map((item, index) => {
      return {
        id: item.id,
        name: item.image_url,
        pathname: `${baseUrl}${item.image_url}`,
        offsetWidth: 1,
      };
    });
  };

  const searchImages = async (query: string) => {
    const images_supa = await $fetch("/api/search", {
      method: "POST",
      body: { query: query }
    });
    images.value = filenameToImage(images_supa as unknown as ImageSupa[]);
  };

  watchEffect(() => {
    console.log("searching", debouncedSearchQuery.value);
    searchImages(debouncedSearchQuery.value);
  });

  return {
    provide: {
      file: {
        searchImages,
        searchQuery,
        images,
      },
    },
  };
});
