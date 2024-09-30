import React, { useEffect, useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap'; 

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = () => {
    const sampleJobs = [
      {
        id: 1,
        title: 'Frontend Developer',
        description: 'Develop user interfaces for web applications.',
        company: 'Tech Company',
      },
      {
        id: 2,
        title: 'Backend Developer',
        description: 'Build and maintain server-side applications.',
        company: 'Web Solutions',
      },
      {
        id: 3,
        title: 'Full Stack Developer',
        description: 'Work on both frontend and backend technologies.',
        company: 'Innovate Inc.',
      },
    ];
    setJobs(sampleJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      <header className="py-5 bg-dark text-white text-center">
        <Container>
          <h1>Job Listings</h1>
          <p>Find the best job opportunities tailored for your skills and goals.</p>
        </Container>
      </header>
      {jobs.map((job) => (
        <Card className="job-card" key={job.id}>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Text>{job.description}</Card.Text>
            <Card.Text>
              <small className="text-muted">{job.company}</small>
            </Card.Text>
            <Button variant="primary">Apply Now</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default JobList;
