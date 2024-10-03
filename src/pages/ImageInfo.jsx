// id
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function ImageInfo() {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/photos/${id}?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }`,
  );
  // Error yoki loading holatlarini ko'rsatish
  if (isPending)
    return (
      <div className="flex h-full items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <>
      {data && (
        <div className="my-5 flex h-full gap-5">
          <img
            className="mb-10 rounded-md"
            src={data.urls.small}
            alt={data.alt_description || "Image"}
          />
          <div>
            <p>Photographer: {data.user.name}</p>
            <p>Likes: {data.likes}</p>
            <p>Description: {data.description || "No description available"}</p>
          </div>
        </div>
      )}
    </>
  );
}
