import axios from "axios";

async function handleMultiSearchRequests({ query }) {
  const queries = await Promise.all(
    query.map((breed) => axios.get(`https://dog.ceo/api/breed/${breed}/images`))
  );
  const data = queries
    .filter((query) => query.data.status === "success")
    .reduce((acc, query) => {
      return [...acc, ...query.data.message];
    }, []);

  shuffleArray(data);

  return data;
}

export async function handleSearchRequest({
  query = [],
  filter = "",
  canFilter = false,
}) {
  if (canFilter && filter) {
    const response = await axios.get(
      `https://dog.ceo/api/breed/${filter}/images`
    );

    if (response.data.status !== "success") {
      return [];
    }

    return response.data.message;
  }

  if (!query.length) {
    const response = await axios.get(
      `https://dog.ceo/api/breeds/image/random/12`
    );

    if (response.data.status !== "success") {
      return [];
    }

    return response.data.message;
  }

  return handleMultiSearchRequests({ query });
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
