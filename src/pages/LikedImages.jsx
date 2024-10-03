// global context hook
import { useGlobalContext } from "../hooks/useGlobalContext";
// components
import ImageContainer from "../components/ImageContainer";
import { Link } from "react-router-dom";
export default function LikedImages() {
  const { likedImages } = useGlobalContext();
  if (likedImages.length == 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-10">
        <h1 className="text-4xl text-center">
          You don't choose any images yet!
        </h1>
        <Link to={'/'}><button className="btn btn-primary">Go Home</button></Link>
      </div>
    );
  }
  return (
    <div className="global__container my-5">
      {likedImages.length > 0 && <ImageContainer images={likedImages} />}
    </div>
  );
}
