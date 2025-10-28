import { useCallback, useState } from "react";
import { apiGet } from "../api";

export function useItunesSearch(
  initial = { term: "", media: "music", limit: 12 }
) {
  // search form state
  const [term, setTerm] = useState(initial.term);
  const [media, setMedia] = useState(initial.media);
  const [limit, setLimit] = useState(initial.limit);
  // result state
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // build url and call api
  const search = useCallback(async () => {
    if (!term.trim()) return;
    setLoading(true);
    setError("");

    try {
      // route to albums endpoint or search if not music
      const path =
        media === "music"
          ? `/api/music/albums?term=${encodeURIComponent(term)}&limit=${limit}`
          : `/api/search?term=${encodeURIComponent(
              term
            )}&media=${encodeURIComponent(media)}&limit=${limit}`;

      // apiGet attaches jwt and then returns data
      const res = await apiGet(path);
      setItems(res.data.data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
      setError("Something went wrong. PLease try again.");
    } finally {
      setLoading(false);
    }
  }, [term, media, limit]);

  return {
    term,
    setTerm,
    media,
    setMedia,
    limit,
    setLimit,
    items,
    loading,
    error,
    search,
  };
}
