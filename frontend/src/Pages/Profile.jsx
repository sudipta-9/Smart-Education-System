import React, { useEffect, useState } from "react";
import {
  FaPencilAlt,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaTrashAlt,
  FaPlus  ,
} from "react-icons/fa";

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track editing mode
  const [editableFields, setEditableFields] = useState({
    name: "",
    bio: "",
    address: "",
    college: "",
  });
  const [newSkill, setNewSkill] = useState(""); // Track new skill to be added
  const [isEditingSkills, setIsEditingSkills] = useState(false); // Track skill editing mode

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
        setEditableFields({
          name: data?.data.name || "",
          bio: data?.data.bio || "",
          address: data?.data.address || "",
          college: data?.data.college || "",
        });
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

  const handleSkillAdd = () => {
    if (newSkill.trim() !== "") {
      setData({
        ...data,
        skills: [...data.skills, newSkill],
      });
      setNewSkill("");
      setIsEditingSkills(false);
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result); // Set the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditableFields({
      ...editableFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    // Simulate saving to API and updating the state
    setData({
      ...data,
      name: editableFields.name,
      bio: editableFields.bio,
      address: editableFields.address,
      college: editableFields.college,
    });
    setIsEditing(false);
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
              <img
                src={uploadedPhoto || data.photo || "https://via.placeholder.com/250"}
                alt="Profile"
                className="profile-img"
              />
              <div className="photo-actions">
                <label htmlFor="photo-upload" className="photo-upload-label">
                  <FaPlus  className="upload-icon" />
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="profile-details">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editableFields.name}
                  onChange={handleChange}
                  className="form-control mb-2"
                />
              ) : (
                <div className="name">{data.name}</div>
              )}

              <div className="contact-info">
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href={data.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href={`mailto:${data.email}`}>
                  <FaEnvelope />
                </a>
                <a href={`tel:${data.phone}`}>
                  <FaPhone />
                </a>
              </div>

              {isEditing ? (
                <textarea
                  name="bio"
                  value={editableFields.bio}
                  onChange={handleChange}
                  className="form-control mb-2"
                />
              ) : (
                <div className="bio fw-bold">Bio: {data.bio || "No bio available"}</div>
              )}

              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={editableFields.address}
                  onChange={handleChange}
                  className="form-control mb-2"
                />
              ) : (
                <div className="address">Address: {data.address}</div>
              )}

              {isEditing ? (
                <input
                  type="text"
                  name="college"
                  value={editableFields.college}
                  onChange={handleChange}
                  className="form-control mb-2"
                />
              ) : (
                <div className="college">College: {data.college}</div>
              )}

              <button
                className="btn btn-primary mt-3"
                onClick={isEditing ? handleSaveChanges : handleEditToggle}
              >
                {isEditing ? "Save Changes" : "Edit"}
              </button>

              <div className="skills-section">
                <div className="skills">
                  {data.skills && data.skills.length > 0 ? (
                    data.skills.map((skill, index) => (
                      <div className="skill" key={index}>
                        {skill}
                        <FaTrashAlt
                          className="delete-icon"
                          onClick={() => handleSkillDelete(skill)}
                        />
                      </div>
                    ))
                  ) : (
                    <div>No skills available</div>
                  )}
                </div>
                {isEditingSkills ? (
                  <div className="add-skill">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="form-control mb-2"
                      placeholder="Enter new skill"
                    />
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleSkillAdd}
                    >
                      Add Skill
                    </button>
                  </div>
                ) : (
                  <FaPencilAlt
                    className="edit-skills"
                    onClick={() => setIsEditingSkills(true)}
                  />
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
