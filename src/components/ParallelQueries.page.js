import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueriespage = () => {
  const {data:superheroes} = useQuery("superheroes", fetchSuperHeroes);
  const {data:friends} =useQuery("friends", fetchFriends);

  console.log(superheroes);
  console.log(friends)

  return <div>ParallelQueries.page</div>;
};
