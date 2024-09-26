import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, ListGroup } from 'react-bootstrap';

const Course = () => {
    const [courseName, setCourseName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResults([]);

        try {
            const response = await fetch(`http://127.0.0.1:5000/recommend?course_name=${courseName}&difficulty=${difficulty}`);
            const data = await response.json();
            setLoading(false);

            if (data.recommended_courses && data.recommended_courses.length > 0) {
                setResults(data.recommended_courses);
            } else {
                setResults([{ course_title: 'No courses found', organization: '', difficulty: '', url: '#' }]);
            }
        } catch (error) {
            setLoading(false);
            setResults([{ course_title: 'Error fetching recommendations', organization: '', difficulty: '', url: '#' }]);
        }
    };

    return (
        <div className="course-recommendation">
            <header className="py-5 bg-dark text-white text-center">
                <Container>
                    <h1>Course Recommendation System</h1>
                    <p>Find the best courses tailored for your learning level and goals.</p>
                </Container>
            </header>

            <main>
                <section className="search-section py-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <h2 className="text-center mb-4">Find Your Course</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter course name"
                                                value={courseName}
                                                onChange={(e) => setCourseName(e.target.value)}
                                                required
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <Form.Control
                                                as="select"
                                                value={difficulty}
                                                onChange={(e) => setDifficulty(e.target.value)}
                                            >
                                                <option value="">Select difficulty (optional)</option>
                                                <option value="beginner">Beginner</option>
                                                <option value="intermediate">Intermediate</option>
                                                <option value="advanced">Advanced</option>
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="submit" variant="success" block>
                                                Search
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>

                                {loading && (
                                    <div className="text-center mt-3">
                                        <Spinner animation="border" variant="success" />
                                        <p>Searching...</p>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="results-section py-5 bg-white">
                    <Container>
                        <h2 className="text-center mb-4">Recommended Courses</h2>
                        <ListGroup>
                            {results.map((course, index) => (
                                <ListGroup.Item key={index}>
                                    <strong>{course.course_title}</strong> - {course.organization} ({course.difficulty})<br />
                                    URL: <a href={course.url} target="_blank" rel="noopener noreferrer">{course.url}</a>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Container>
                </section>
            </main>
        </div>
    );
};

export default Course;
