import { createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();

// const dataFromLocalStorage = () => {
//   try {
//     const storedData = localStorage.getItem("my-splash-data");
//     return storedData
//       ? JSON.parse(storedData)
//       : { likedImages: [], downloadImages: [] };
//   } catch (error) {
//     console.error("Error parsing localStorage data:", error);
//     return { likedImages: [], downloadImages: [] }; // Standart qiymat qaytaramiz
//   }
// };

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LIKE":
      return {
        ...state,
        likedImages: [...state.likedImages, payload],
      };
    case "UNLIKE":
      return {
        ...state,
        likedImages: state.likedImages.filter((image) => image.id !== payload),
      };
    case "DOWNLOAD":
      return {
        ...state,
        downloadImages: [...state.downloadImages, payload],
      };
    case "REMOVE":
      return {
        ...state,
        downloadImages: state.downloadImages.filter(
          (image) => image.id !== payload,
        ),
      };
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "AUTH_STATE":
      return {
        ...state,
        authReady: true,
      };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: null,
    authReady: false,
    likedImages: [],
    downloadImages: [],
  });

  useEffect(() => {
    localStorage.setItem("my-splash-data", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
