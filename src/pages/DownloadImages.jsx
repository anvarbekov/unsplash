// global context hook
import { useGlobalContext } from "../hooks/useGlobalContext";
// react router dom
import { Link } from "react-router-dom";
// components
import ImageContainer from "../components/ImageContainer";

export default function DownloadImages() {
  const { downloadImages } = useGlobalContext();
  if (downloadImages.length == 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center gap-10">
        <h1 className="text-4xl text-center">
          You don't download any images yet!
        </h1>
        <Link to={"/"}>
          <button className="btn btn-primary">Go Home</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="global__container my-5">
      {downloadImages.length > 0 && <ImageContainer images={downloadImages} />}
    </div>
  );
}
