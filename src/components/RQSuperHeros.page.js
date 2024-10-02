// import React, { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
// import { useQuery } from "react-query";

// import axios from "axios";

// const fetchSuperHeroes = () => {
//   return axios.get("http://localhost:4000/superheroes");
// };

// export const RQSuperHerospage = () => {
//   // const {isLoading, data} = useQuery("super-heroes",()=>{
//   //   return axios.get("http://localhost:4000/superheroes")
//   // });

//   const [polling,setPolling] = useState(3000);

//   const handleSuccess = (data) => {
//     console.log("Perform side effects after fetching",data);
//     if(data?.data?.length === 4){
//       setPolling(false);
//     }
//   }

//   const handleError = (error) => {
//     setPolling(false);
//     console.log("Perform side effects after Error",error)
//   }

//   const { isLoading, data,isError, error, isFetching,refetch } = useQuery("super-heroes", fetchSuperHeroes,{
//     // cacheTime:5000,
//     // staleTime:30000,
//     // refetchOnMount:true,
//     // refetchOnWindowFocus:true,
//     // refetchInterval:2000,
//     // refetchIntervalInBackground:true,
//     // enabled:false,
//     // refetchInterval:polling,
//     onSuccess:handleSuccess,
//     onError:handleError,
//     select: (data) => {
//       const superHeroNames = data.data.map((hero)=>hero.name)
//       return superHeroNames;
//     }
//   });
//   console.log({isLoading, isFetching});

//   if (isLoading | isFetching) {
//     return <h2>Loading...</h2>;
//   }
//   if(isError) {
//     return <h2>{error.message}</h2>
//   }
//   return (
//     <>
//       <h2>RQ Super Heros</h2>
//       {/* <button onClick={refetch}>Refetch Data</button> */}
//       {/* {data?.data.map((superhero) => {
//         return <div key={superhero.name}>{superhero.name}</div>;
//       })} */}
//       {
//         data.map((heroName) => {
//           return <div key={heroName}>{heroName}</div>
//         })
//       }
//     </>
//   );
// };

export const RQSuperHerospage = () => {
  const handleSuccess = (data) => {
    console.log("Perform side effects after fetching", data);
  };

  const handleError = (error) => {
    console.log("Perform side effects after Error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(handleSuccess, handleError);

  console.log({ isLoading, isFetching });

  if (isLoading | isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>RQ Super Heros</h2>
      <button onClick={refetch}>Refetch Data</button>
      {/* {data &&
        data.map((heroName) => {
          return <div key={heroName}>{heroName}</div>;
        })} */}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
