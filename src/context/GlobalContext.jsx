import { createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();

const dataFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem("my-splash-data");
    return storedData ? JSON.parse(storedData) : { likedImages: [], downloadImages: [] };
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return { likedImages: [], downloadImages: [] }; // Standart qiymat qaytaramiz
  }
};

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
        likedImages: state.likedImages.filter((image) => image.id != payload),
      };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, dataFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("my-splash-data", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
