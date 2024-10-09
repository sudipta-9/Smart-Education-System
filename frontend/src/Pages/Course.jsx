import React, { useEffect, useState } from "react";
import { Form, InputGroup, Container, ListGroup, Modal, Button } from "react-bootstrap";

const Course = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("DEFAULT");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        setError("Error: " + error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter courses based on search term and selected level
  const filteredCourses = data?.data?.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = level === "DEFAULT" || course.level === level;
    return matchesSearch && matchesLevel;
  });

  // Handle course click
  const handleCourseClick = (courseLevel) => {
    if (courseLevel === "INTERMEDIATE") {
      setModalMessage("You need to finish the basic course.");
      setShowModal(true);
    } else if (courseLevel === "ADVANCED") {
      setModalMessage("You need to finish the basic and intermediate courses.");
      setShowModal(true);
    } else if (courseLevel === "MIXED") {
      setModalMessage("Mixed-level courses are available for all learners.");
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="py-5 bg-dark text-white text-center header">
        <Container>
          <h1>Course Recommendation System</h1>
          <p>Find the best courses tailored for your learning level and goals.</p>
        </Container>
      </header>

      {/* Search Section */}
      <Container className="my-4 search-section">
        <InputGroup className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search Course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Form.Select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="ms-2"
          >
            <option value="DEFAULT">All Levels</option>
            <option value="BASIC">Basic</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
            <option value="MIXED">Mixed</option> {/* Added MIXED option */}
          </Form.Select>
        </InputGroup>
      </Container>

      {/* Loading Spinner */}
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {/* Error Message */}
      {error && <div>{error}</div>}

      {/* Courses List */}
      {!error && data?.data && (
        <Container>
          <ListGroup>
            {filteredCourses.map((course, index) => (
              <ListGroup.Item key={index} className="course-card" onClick={() => handleCourseClick(course.level)}>
                <h5>{course.title || "N/A"}</h5>
                <p>Level: {course.level || "N/A"}</p>
                <p>
                  Skills:{" "}
                  {course.skills.length > 0
                    ? course.skills.join(", ")
                    : "No specific skills listed"}
                </p>
                <a href={course.url} target="_blank" rel="noopener noreferrer">
                  Course Link
                </a>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      )}

      {/* Modal for warnings */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Access Restricted</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Course;
