import Fuse from "fuse.js";

type Image = {
  id: number;
  name: string;
  pathname: string;
  offsetWidth: number;
};

export default defineNuxtPlugin(() => {
  const filenames = ref<string[]>([]);
  const searchQuery = ref("");
  const debouncedSearchQuery = refDebounced(searchQuery, 300);
  const images = ref();
  const listSize = 20;

  let fuse: Fuse<string>;

  const baseUrl =
    "https://raw.githubusercontent.com/snipe/animated-gifs/master/";

  const getMultipleRandom = <T>(arr: T[], num: number): T[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const searchImages = async (query: string) => {
    if (fuse === null || fuse === undefined) {
      const fileList = await fetch("/files.txt");
      const response = await fileList.text();
      filenames.value = response.split(/\r?\n/);

      fuse = new Fuse(filenames.value, {});
    }

    if (query === "") {
      const initialItems = getMultipleRandom(filenames.value, listSize);
      images.value = filenameToImage(initialItems);

      return;
    }

    const items = fuse.search(query).slice(0, listSize);
    const stringItems = items.map((e) => e.item);

    images.value = filenameToImage(stringItems);
  };

  const filenameToImage = (items: string[]): Image[] => {
    return items.map((item, index) => {
      return {
        id: index,
        name: item,
        pathname: `${baseUrl}${item}`,
        offsetWidth: 1,
      };
    });
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
