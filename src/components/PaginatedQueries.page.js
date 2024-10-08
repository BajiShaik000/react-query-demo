import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";

export const PaginatedQueriespage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const fetchColors = (page) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id} - {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
      {isFetching && <div>Loading...</div>}
    </>
  );
};
