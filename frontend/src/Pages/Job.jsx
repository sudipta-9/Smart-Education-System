import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

const Job = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://api.example.com/jobs');
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <header className="py-5 bg-dark text-white text-center">
      <Container>
        <h1>Job Recommendation System</h1>
        <p>Discover job opportunities that align with your skill level and career aspirations.</p>
      </Container>
    </header>
  );
};

export default Job;
