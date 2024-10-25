import React, { useState, useEffect } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaPlusCircle,
} from "react-icons/fa";

const skillQuestions = {
  beginner: [
    { question: "What is a variable in Python?", id: 1 },
    { question: "How do you declare a function in Python?", id: 2 },
  ],
  intermediate: [
    { question: "Explain list comprehensions in Python.", id: 1 },
    { question: "What are decorators in Python?", id: 2 },
  ],
  advanced: [
    { question: "What is metaprogramming in Python?", id: 1 },
    { question: "Explain the GIL in Python and its impact.", id: 2 },
  ],
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: "beginner" });
  const [examQuestions, setExamQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/profile?uId=66f559deba4d59b7d3a8d81d")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data.data);
        setUpdatedProfile(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleEditClick = () => setEditing(true);
  const handleSaveClick = () => {
    setProfile(updatedProfile);
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedProfile((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    setNewSkill({ name: "", level: "beginner" });
    setExamQuestions(skillQuestions["beginner"]);
    setShowSkillModal(true);
  };

  const handleSkillSubmit = () => {
    if (newSkill.name) {
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setShowSkillModal(false);
      setNewSkill({ name: "", level: "beginner" });
    }
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prevSkill) => ({ ...prevSkill, [name]: value }));
    setExamQuestions(skillQuestions[value]);
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error loading profile: {error}</div>;
  }

  return (
    <div className="profile-section">
      <div className="profile-image-container">
        <img
          src={updatedProfile.image || "default-avatar.png"}
          alt="Profile"
          className="profile-image"
        />
        <label className="upload-icon">
          <FaPlusCircle />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      <div className="profile-details">
        {editing ? (
          <>
            <h2>Edit Profile</h2>
            <input
              type="text"
              name="name"
              value={updatedProfile.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="email"
              value={updatedProfile.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="phone"
              value={updatedProfile.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              required
            />
            <input
              type="text"
              name="school"
              value={updatedProfile.school}
              onChange={handleInputChange}
              placeholder="School"
              required
            />
            <input
              type="text"
              name="college"
              value={updatedProfile.college}
              onChange={handleInputChange}
              placeholder="College"
              required
            />
            <textarea
              name="bio"
              value={updatedProfile.bio}
              onChange={handleInputChange}
              placeholder="Bio"
              rows="3"
              required
            />
            <button onClick={handleSaveClick}>Save Changes</button>
          </>
        ) : (
          <>
            <h2>{updatedProfile.name}</h2>
            <p>
              <FaEnvelope /> {updatedProfile.email}
            </p>
            <p>
              <FaPhone /> {updatedProfile.phone}
            </p>
            <p>
              <FaLinkedin /> {updatedProfile.linkedin}
            </p>
            <p>
              <FaGithub /> {updatedProfile.github}
            </p>
            <p>
              <strong>School:</strong> {updatedProfile.school}
            </p>
            <p>
              <strong>College:</strong> {updatedProfile.college}
            </p>
            <p>
              <strong>Bio:</strong> {updatedProfile.bio}
            </p>
            <button onClick={handleEditClick}>
              <FaEdit /> Edit Profile
            </button>
          </>
        )}
      </div>

      <div className="skills-section">
        <h2>Skills</h2>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>
              {skill.name} ({skill.level})
            </li>
          ))}
        </ul>
        <button onClick={handleAddSkill}>Add Skill</button>

        {showSkillModal && (
          <div className="skill-modal">
            <h3>Add a Skill</h3>
            <input
              type="text"
              name="name"
              value={newSkill.name}
              onChange={handleSkillChange}
              placeholder="Skill Name"
              required
            />
            <select
              name="level"
              value={newSkill.level}
              onChange={handleSkillChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <button onClick={handleSkillSubmit}>Add Skill</button>
            <button onClick={() => setShowSkillModal(false)}>Close</button>
            <h4>Exam Questions</h4>
            <ul>
              {examQuestions.map((question) => (
                <li key={question.id}>{question.question}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
