import ResultCard from "./ResultCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ResultGrid({ items }) {
  if (!items.length) {
    return <div className="mt-3 text-muted">No results yet. Try a search.</div>;
  }

  return (
    <Row className="g-3 mt-3">
      {items.map((item) => {
        const key = item.collectionId ?? item.trackId ?? item.artistId;
        return (
          <Col key={key} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ResultCard item={item} />
          </Col>
        );
      })}
    </Row>
  );
}
