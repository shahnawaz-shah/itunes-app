import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const MEDIA = [
  "all",
  "movie",
  "podcast",
  "music",
  "audiobook",
  "short film",
  "tv show",
  "software",
  "ebook",
];

export default function SearchControls({
  term,
  onTerm,
  media,
  onMedia,
  limit,
  onLimit,
  onSearch,
  loading,
}) {
  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <Form className="p-4 shadow rounded mx-auto">
          <Form.Group className="mb-3">
            <Form.Label>Search</Form.Label>
            <Form.Control
              placeholder="Search"
              value={term}
              onChange={(e) => onTerm(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Media type</Form.Label>
            <Form.Select
              value={media}
              onChange={(e) => onMedia(e.target.value)}
            >
              {MEDIA.map((med) => (
                <option key={med} value={med}>
                  {med}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Limit</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={50}
              value={limit}
              onChange={(e) =>
                onLimit(Math.max(1, Math.min(50, +e.target.value || 1)))
              }
            />
          </Form.Group>
          <Button className="primary" onClick={onSearch} disabled={loading}>
            {loading ? "Searching.." : "Search"}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
