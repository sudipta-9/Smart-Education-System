import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaTrashAlt } from "react-icons/fa";
import { Card } from "react-bootstrap";

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user data from API
    fetch("http://localhost:4000/api/v1/profile?uId=66f559deba4d59b7d3a8d81d")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data?.data); 
        setError("");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(`Error: ${error.message}`);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSkillDelete = (skill) => {
    setData({
      ...data,
      skills: data.skills.filter((s) => s !== skill),
    });
  };

  return (
    <div className="profile-section">
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : (
        data && (
          <div className="profile-card">
            <div className="profile-photo">
              <img src={data.photo || "https://via.placeholder.com/250"} alt="Profile" />
              <FaPencilAlt className="edit-icon" />
            </div>
            <div className="profile-details">
              <div className="name">{data.name}</div>
              <div className="contact-info">
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href={data.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                <a href={`mailto:${data.email}`}><FaEnvelope /></a>
                <a href={`tel:${data.phone}`}><FaPhone /></a>
              </div>
              <div className="bio">{data.bio}</div>
              <div className="college">College: {data.college}</div>

              <div className="skills-section">
                <div className="skills">
                  {data.skills && data.skills.length > 0 ? (
                    data.skills.map((skill, index) => (
                      <div className="skill" key={index}>
                        {skill}
                        <FaTrashAlt className="delete-icon" onClick={() => handleSkillDelete(skill)} />
                      </div>
                    ))
                  ) : (
                    <div>No skills available</div>
                  )}
                </div>
                <FaPencilAlt className="edit-skills" />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
