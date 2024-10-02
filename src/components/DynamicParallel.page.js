import React from "react";
import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHeroes = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export default function DynamicParallelPage({ heroIds }) {
  const QueryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHeroes(id),
      };
    })
  );

  console.log(QueryResults);
  return <div>Dynamic Parallel queries</div>;
}
