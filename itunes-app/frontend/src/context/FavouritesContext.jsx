import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

// create context for the favourites
const FavContext = createContext();

// helper to return consistent identifier from data
const getId = (it) => it?.collectionId ?? it?.trackId ?? it?.artistId;

export function FavouritesProvider({ children }) {
  const [favs, setFavs] = useState([]);

  // check if an item or id is currently favourited
  const isFav = useCallback(
    (idOrItem) => {
      const id = typeof idOrItem === "object" ? getId(idOrItem) : idOrItem;
      return favs.some((x) => getId(x) === id);
    },
    [favs]
  );

  // toggle a favourite - if faved, remove. if not, add
  const toggle = useCallback((item) => {
    const id = getId(item);

    if (id == null) return; //no stable id, ignore

    setFavs((current) =>
      current.some((x) => getId(x) === id)
        ? current.filter((x) => getId(x) !== id)
        : [...current, item]
    );
  }, []);

  // remove a fav by item or id
  const remove = useCallback((idOrItem) => {
    const id = typeof idOrItem === "object" ? getId(idOrItem) : idOrItem;
    setFavs((current) => current.filter((x) => getId(x) !== id));
  }, []);

  // use of useMemo to keep context of favs to avoid re-renders
  const value = useMemo(
    () => ({ favs, isFav, toggle, remove }),
    [favs, isFav, toggle, remove]
  );

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export const useFavourites = () => useContext(FavContext);
