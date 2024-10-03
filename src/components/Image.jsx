// global context hook
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import {
  FaHeart,
  FaRegHeart,
  FaCloudDownloadAlt,
  FaTrashAlt,
} from "react-icons/fa";
export default function Image({ image, added, downloaded }) {
  const { likedImages, downloadImages, dispatch } = useGlobalContext();
  const { links, urls, alt_description, user } = image;

  const addLikedImage = (image, e) => {
    e.preventDefault();
    const alreadyAdded = likedImages.some((img) => {
      return img.id == image.id;
    });

    if (!alreadyAdded) {
      dispatch({ type: "LIKE", payload: image });
    } else {
      dispatch({ type: "UNLIKE", payload: image.id });
    }
  };

  const downloadImage = (image, e) => {
    e.preventDefault();
    const alreadyAdded = downloadImages.some((img) => {
      return img.id == image.id;
    });

    if (!alreadyAdded) {
      dispatch({ type: "DOWNLOAD", payload: image });
      window.open(links.download + "&force=true", "_blank");
    } else {
      dispatch({ type: "REMOVE", payload: image.id });
    }
  };

  return (
    <Link to={`/imageInfo/${image.id}`}>
      <div className="relative group">
        {!added && (
          <span
            onClick={(e) => {
              addLikedImage(image, e);
            }}
            className="absolute invisible opacity-0  w-7 h-7 group-hover:opacity-100 group-hover:visible transition-all duration-300 border cursor-pointer rounded-full flex justify-center items-center right-2 top-2">
            <FaRegHeart className="text-white" />
          </span>
        )}
        {added && (
          <span
            onClick={(e) => {
              addLikedImage(image, e);
            }}
            className="absolute bg-white invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 w-7 h-7  border cursor-pointer rounded-full flex justify-center items-center right-2 top-2">
            <FaHeart className="text-red-600" />
          </span>
        )}
        <img
          src={urls.regular}
          alt={alt_description}
          className="w-full rounded-md"
        />
        <span className="absolute gap-x-2 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 w-7 h-7  border rounded-full flex items-center left-2 bottom-2">
          <img
            className="rounded-full border w-full object-cover"
            src={user.profile_image.large}
            alt=""
          />
          <p className="text-white text-xs">{user.name}</p>
        </span>
        <span
          onClick={(e) => downloadImage(image, e)}
          className="absolute bg-white invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 w-7 h-7  border cursor-pointer rounded-full flex justify-center items-center right-2 bottom-2">
          <FaCloudDownloadAlt />
        </span>

        {downloaded && (
          <span
            onClick={(e) => downloadImage(image, e)}
            className="absolute bg-white invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 w-7 h-7  border cursor-pointer rounded-full flex justify-center items-center left-2 top-2">
            <FaTrashAlt />
          </span>
        )}
      </div>
    </Link>
  );
}
