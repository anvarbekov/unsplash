import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "./Image";
import { useGlobalContext } from "../hooks/useGlobalContext";

export default function ImageContainer({ images }) {
  const { likedImages } = useGlobalContext();
  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {images.map((image) => {
            return (
              <Image
                key={image.id}
                image={image}
                added={likedImages.some((img) => {
                  return img.id == image.id;
                })}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
