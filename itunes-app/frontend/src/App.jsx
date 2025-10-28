import { useMemo } from "react";
import debounce from "lodash.debounce";
import SearchControls from "./components/SearchControls";
import ResultGrid from "./components/ResultGrid";
import { useItunesSearch } from "./hooks/useItunesSearch";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import "./App.css";
import FavouritesSection from "./components/FavouritesSection";

function App() {
  const {
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
  } = useItunesSearch({ term: "", media: "music", limit: 12 });

  // debounce typing-triggered search
  const debouncedSearch = useMemo(() => debounce(search, 400), [search]);

  return (
    <Container className="py-4">
      <h1 className="h4 mb-3">iTunes Finder</h1>
      <SearchControls
        term={term}
        onTerm={(v) => {
          setTerm(v);
          debouncedSearch();
        }}
        media={media}
        onMedia={(v) => {
          setMedia(v);
          debouncedSearch();
        }}
        limit={limit}
        onLimit={(v) => {
          setLimit(v);
          debouncedSearch();
        }}
        onSearch={search}
        loading={loading}
      />
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && <ResultGrid items={items} />}
      {loading && <p className="mt-3">Loading..</p>}
      <FavouritesSection />
    </Container>
  );
}

export default App;
