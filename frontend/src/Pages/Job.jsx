import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const Job = () => {
  const [jobs, setJobs] = useState([]); // Ensure initial state is an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/jobs');
        const data = await response.json();
        
        // Check if the data and data.data exist and is an array
        if (data && Array.isArray(data.data)) {
          setJobs(data.data);
        } else {
          console.error('Unexpected response structure:', data);
          setJobs([]); // Set jobs to empty array if structure is unexpected
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]); // Ensure jobs is reset in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <header className="py-5 bg-dark text-white text-center">
        <Container>
          <h1>Job Recommendation System</h1>
          <p>Discover job opportunities that align with your skill level and career aspirations.</p>
        </Container>
      </header>
      <Container className="my-5">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <Col md={4} key={job.id} className="mb-4">
                  <Card className="job-card">
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                      <Card.Text>
                        <strong>Location:</strong> {job.location}
                        <br />
                        <strong>Seniority Level:</strong> {job.seniorityLevel}
                        <br />
                        <strong>Employment Type:</strong> {job.employmentType}
                        <br />
                        <strong>Salary:</strong> {job.salary || 'Not specified'}
                        <br />
                        <strong>Posted on:</strong> {new Date(job.date).toLocaleDateString()}
                      </Card.Text>
                      <Card.Link href={job.postUrl} target="_blank">View Job</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No job recommendations available at the moment.</p>
            )}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Job;
