// react router dom
import { useActionData } from "react-router-dom";
// components
import Search from "../components/Search";

// custom hook
import { useFetch } from "../hooks/useFetch";
import ImageContainer from "../components/ImageContainer";
import { useEffect, useState, useRef } from "react";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

export default function Home() {
  const searchParamFromAction = useActionData();
  const [allImages, setAllImages] = useState([]);
  const [pageParam, setPageParam] = useState(1);

  const prevSearchParam = useRef(searchParamFromAction);

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }&query=${searchParamFromAction ?? "all"}&page=${pageParam}`
  );

  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImages) => {
        return pageParam === 1
          ? data.results
          : [...prevImages, ...data.results];
      });
    }
  }, [data]);

  console.log(data);

  useEffect(() => {
    if (searchParamFromAction !== prevSearchParam.current) {
      setAllImages([]);
      setPageParam(1);
      prevSearchParam.current = searchParamFromAction;
    }
  }, [searchParamFromAction]);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <>
      <div className="mt-5 mb-5">
        <Search />
      </div>
      {isPending && <h1>Loading...</h1>}
      {allImages.length > 0 && <ImageContainer images={allImages} />}
      <div>
        <button
          onClick={() => {
            setPageParam(pageParam + 1);
          }}
          className="btn btn-secondary w-full my-5">
          {isPending ? "Loading..." : "Read More"}
        </button>
      </div>
    </>
  );
}
