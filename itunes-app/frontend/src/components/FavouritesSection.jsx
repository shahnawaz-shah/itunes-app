import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useFavourites } from "../context/FavouritesContext.jsx";

// helpers to return consistent api data for UI

/** return a stable id from various iTunes entities (album/track/artist). */
const getId = (it) => it?.collectionId ?? it?.trackId ?? it?.artistId;
const getImg = (it) =>
  it?.artworkUrl || it?.artworkUrl100 || it?.artworkUrl60 || "";
const getTitle = (it) =>
  it?.albumName ?? it?.collectionName ?? it?.trackName ?? "Untitled";
const getSubtitle = (it) => it?.artistName ?? it?.collectionArtistName ?? "";

export default function FavouritesSection() {
  // get favourites array and the toggle handler from context
  const { favs, toggle } = useFavourites();

  return (
    <div className="mt-4">
      {/* header row: title + live count badge */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h2 className="h6 mb-0">Favourites</h2>
        <Badge bg="secondary">{favs.length}</Badge>
      </div>

      {/* empty state; rendered when no favourites yet */}
      {favs.length === 0 ? (
        <div className="text-muted">
          No favourites yet. Add some from the results.
        </div>
      ) : (
        // non-empty: render a list
        <ListGroup variant="flush">
          {favs.map((it) => {
            //  normalise fields for consistent rendering
            const id = getId(it);
            const img = getImg(it);
            const title = getTitle(it);
            const subtitle = getSubtitle(it);

            return (
              <ListGroup.Item
                key={id}
                className="d-flex align-items-center gap-2"
              >
                {/* artwork or a  emoji fallback if missing */}
                {img ? (
                  <img
                    src={img}
                    alt={title}
                    width={48}
                    height={48}
                    className="rounded object-fit-cover"
                  />
                ) : (
                  <div
                    style={{ width: 48, height: 48 }}
                    className="bg-light rounded d-flex align-items-center justify-content-center"
                  >
                    🎵
                  </div>
                )}

                <div className="me-auto">
                  <div className="fw-semibold">{title}</div>
                  <small className="text-muted">{subtitle}</small>
                </div>

                {/* remove button */}
                <Button
                  type="button"
                  size="sm"
                  variant="outline-danger"
                  onClick={() => toggle(it)}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
}
