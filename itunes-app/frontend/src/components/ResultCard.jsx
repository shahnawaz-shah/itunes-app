import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import dayjs from "dayjs"; //for easier date manipulation
import { useFavourites } from "../context/FavouritesContext";
import { Button } from "react-bootstrap";

const getId = (it) => it?.collectionId ?? it?.trackId ?? it?.artistId;

export default function ResultCard({ item }) {
  const { toggle, isFav } = useFavourites();

  const title =
    item.albumName ?? item.collectionName ?? item.trackName ?? "Untitled";
  const subtitle = item.artistName ?? item.collectionArtistName ?? "";
  const image = item.artworkUrl || item.artworkUrl100 || item.artworkUrl160;
  const year = item.releaseDate ? dayjs(item.releaseDate).year() : null;
  const id = getId(item);
  const fav = isFav(id);

  return (
    <Card className="p-1 shadow rounded w-75 mx-auto">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <small className="text-muted">{subtitle}</small>
        <Card.Text>
          {year && (
            <Badge className="bg-secondary align-self-start mt-2">{year}</Badge>
          )}
        </Card.Text>
        <Button
          type="button"
          className={`mt-auto ${fav ? "outline-danger" : "outline-primary"}`}
          onClick={() => toggle(item)}
        >
          {fav ? "Remove favourite" : "Add to favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
