import React, { useState, useEffect } from 'react'; 
import { FaPencilAlt, FaLinkedin, FaGithub, FaFacebook, FaEnvelope, FaPhone, FaTrashAlt, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState("A short description about yourself...");
  const [address, setAddress] = useState("123 Main St, City, Country");
  const [education, setEducation] = useState("Your education details...");
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('skills');
    return savedSkills ? JSON.parse(savedSkills) : ["React", "JavaScript", "CSS"];
  });
  const [posts, setPosts] = useState([
    { id: 1, image: '', description: 'First community post description...', comments: [] },
  ]);
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem('profilePic') || 'https://via.placeholder.com/150';
  });
  const [newImage, setNewImage] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [userName, setUserName] = useState("John Doe");
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  const addSkill = () => {
    const newSkill = prompt('Enter new skill:');
    if (newSkill) setSkills([...skills, newSkill]);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleEditPost = (id) => {
    const newDescription = prompt('Edit your post description:');
    setPosts(posts.map(post => post.id === id ? { ...post, description: newDescription } : post));
  };

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm("Do you want to delete this post?");
    if (confirmDelete) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      setProfilePic(base64Image);
      localStorage.setItem('profilePic', base64Image);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (newDescription.trim() === '') {
      alert('Please write a description before posting.');
      return;
    }

    const newPost = {
      id: posts.length + 1,
      image: newImage,
      description: newDescription,
      comments: []
    };

    setPosts([...posts, newPost]);
    setNewImage(null);
    setNewDescription('');
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
  };

  return (
    <div className="profile-section container mt-5 p-4 shadow-lg">
      <div className="row">
        <div className="col-md-4 text-center position-relative">
          <div className="photo-section shadow-lg rounded-circle">
            <img
              src={profilePic}
              alt="User"
              className="img-fluid rounded-circle user-photo"
            />
            <div className="photo-edit-icon animate__animated animate__fadeIn">
              <label htmlFor="profilePicUpload">
                <FaPencilAlt style={{ cursor: 'pointer' }} />
              </label>
              <input
                type="file"
                id="profilePicUpload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleProfilePicChange}
              />
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <h2 className="user-name animate__animated animate__fadeInDown">
            {isEditingName ? (
              <>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-control"
                />
                <button className="btn btn-success ml-2" onClick={handleNameSave}>Save</button>
              </>
            ) : (
              <>
                {userName}
                <FaPencilAlt 
                  className="ms-2" 
                  style={{ cursor: 'pointer', fontSize: '20px' }}  
                  onClick={handleNameEdit} 
                />
              </>
            )}
          </h2>
          <div className="contact-icons">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="mailto:user123@example.com"><FaEnvelope /></a>
            <a href="tel:+123456789"><FaPhone /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          </div>

          <div className="about-section mt-4">
            <h5>About {isEditing && <FaPencilAlt className="edit-icon" />}</h5>
            {isEditing ? (
              <textarea 
                className="form-control" 
                value={about} 
                onChange={(e) => setAbout(e.target.value)} 
              />
            ) : (
              <p>{about}</p>
            )}
          </div>

          <div className="address-section mt-4">
            <h5>Home Address</h5>
            {isEditing ? (
              <textarea 
                className="form-control" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
            ) : (
              <p>{address}</p>
            )}
          </div>

          <div className="education-section mt-4">
            <h5>Education {isEditing && <FaPencilAlt className="edit-icon" />}</h5>
            {isEditing ? (
              <textarea 
                className="form-control" 
                value={education} 
                onChange={(e) => setEducation(e.target.value)} 
              />
            ) : (
              <p>{education}</p>
            )}
          </div>

          {!isEditing ? (
            <button className="btn btn-outline-info mt-2 animate__animated animate__pulse" onClick={toggleEdit}><FaPencilAlt /> Edit Info</button>
          ) : (
            <button className="btn btn-success mt-2 animate__animated animate__bounce" onClick={handleSave}>Save Changes</button>
          )}
        </div>
      </div>

      <div className="skills-section mt-4 animate__animated animate__fadeInUp">
        <h5>Skills</h5>
        <ul>
          {skills.map((skill, index) => (
            <li key={index} className="badge badge-info p-2 m-1 d-flex align-items-center justify-content-between">
              <span>{skill}</span>
              <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteSkill(index)}><FaTrashAlt /></button>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary animate__animated animate__lightSpeedInRight" onClick={addSkill}>Add Skill</button>
      </div>

      <div className="community-post-section mt-5 animate__animated animate__fadeInUp">
        <h4>Community Posts</h4>
        {posts.map(post => (
          <div key={post.id} className="card mb-3 shadow-sm animate__animated animate__slideInUp">
            <div className="card-body">
              <div className="post-image mb-3">
                {post.image && <img src={post.image} alt="Post" className="img-fluid" />}
              </div>
              <p>{post.description}</p>
              <button className="btn btn-secondary mr-2 me-2" onClick={() => handleEditPost(post.id)}><FaEdit /> Edit</button>
              <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}><FaTrashAlt /> Delete</button>
            </div>
          </div>
        ))}

        <div className="new-post mt-5">
          <h5>Create New Post</h5>
          <input type="file" className="form-control mb-2" onChange={handleImageChange} />
          <textarea
            className="form-control mb-2"
            rows="3"
            placeholder="Write a description..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
