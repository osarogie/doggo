import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useAllBreeds() {
  const { data, isValidating } = useSWR(
    "https://dog.ceo/api/breeds/list/all",
    fetcher
  );
  const breeds = useMemo(() => {
    if (data?.status !== "success") {
      return [];
    }

    return Object.keys(data.message).map((breed) => ({
      breed,
      subBreeds: data.message[breed],
    }));
  }, [data]);

  return { breeds, isValidating };
}

export function useFilteredBreeds(input = []) {
  const { data, isValidating } = useSWR(
    "https://dog.ceo/api/breeds/list/all",
    fetcher
  );

  const filteredBreeds = useMemo(() => {
    if (data?.status !== "success") {
      return [];
    }

    if (input.length === 0) {
      const breeds = Object.keys(data.message).map((breed) => ({
        breed,
        subBreeds: data.message[breed],
      }));

      return breeds;
    }

    return input.map((breed) => ({
      breed,
      subBreeds: data.message[breed],
    }));
  }, [data, input]);

  return { breeds: filteredBreeds, isValidating };
}
