import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Form, Button } from 'react-bootstrap';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [resume, setResume] = useState(null);
  const [useResumeSearch, setUseResumeSearch] = useState(false);
  const [resumeSkills, setResumeSkills] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/jobs');
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setJobs(data.data);
        } else {
          console.error('Unexpected response structure:', data);
          setJobs([]);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleResumeSubmit = async () => {
    if (!resume) {
      alert('Please upload a resume first.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const response = await fetch('http://localhost:4000/api/v1/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setJobs(result.data); // Assuming the API returns matching jobs
        setResumeSkills(result.skills); // Assuming the API returns extracted skills
        alert('Resume uploaded successfully!');
      } else {
        alert('Failed to upload resume.');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  const filteredJobs = useResumeSearch
    ? jobs
    : jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <>
      <header className="py-5 bg-dark text-white text-center">
        <Container>
          <h1>Job Recommendation System</h1>
          <p>Discover job opportunities that align with your skill level and career aspirations.</p>
        </Container>
      </header>

      <Container className="my-5">
        {/* Toggle between Search and Resume Upload */}
        <div className="toggle-section mb-4 d-flex justify-content-center">
          <Button
            variant={!useResumeSearch ? 'primary' : 'outline-primary'}
            onClick={() => setUseResumeSearch(false)}
          >
            Search by Title or Company
          </Button>
          <Button
            variant={useResumeSearch ? 'primary' : 'outline-primary'}
            onClick={() => setUseResumeSearch(true)}
            className="mx-3"
          >
            Upload Resume for Recommendations
          </Button>
        </div>

        {/* Conditional Render based on selected option */}
        {!useResumeSearch ? (
          <div className="search-bar mb-4">
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Search for jobs by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </div>
        ) : (
          <div className="resume-upload mb-4">
            <Form.Group controlId="resumeUpload">
              <Form.Label>Upload your resume (PDF only):</Form.Label>
              <div className="resume-upload-box">
                <Form.Control type="file" accept=".pdf" onChange={handleResumeUpload} />
                <Button variant="primary" onClick={handleResumeSubmit} disabled={!resume} className="upload-btn">
                  Upload Resume
                </Button>
              </div>
              {resumeSkills.length > 0 && (
                <div className="resume-skills mt-3">
                  <strong>Detected Skills:</strong> {resumeSkills.join(', ')}
                </div>
              )}
            </Form.Group>
          </div>
        )}

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
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
