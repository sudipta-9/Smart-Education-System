import React, { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { FaImage, FaVideo } from "react-icons/fa";

const Post = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setVideo(null);
    setShowImageModal(false);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideo(URL.createObjectURL(file));
    setImage(null);
    setShowVideoModal(false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const isUploadVisible = description && (image || video);

  const handleSubmit = () => {
    if (!isUploadVisible) return;
    setPosts((prevPosts) => [...prevPosts, { description, image, video }]);
    setDescription("");
    setImage(null);
    setVideo(null);
  };

  return (
    <>
      {/* Header */}
      <header className="py-5 bg-dark text-white text-center header">
        <Container>
          <h1>Create Your Post</h1>
          <p>Share your videos, images, and thoughts with others!</p>
        </Container>
      </header>

      {/* Post Section */}
      <Container className="post-section mt-5">
        {/* Description input */}
        <div className="input-group">
          <textarea
            placeholder="Write a description..."
            value={description}
            onChange={handleDescriptionChange}
            className="form-control mb-3"
            rows="4"
          />
        </div>

        {/* Image and Video Icons */}
        <div className="d-flex justify-content-around mb-3">
          <FaImage
            size={40}
            onClick={() => setShowImageModal(true)}
            title="Upload Image"
          />
          <FaVideo
            size={40}
            onClick={() => setShowVideoModal(true)}
            title="Upload Video"
          />
        </div>

        {/* Conditional Upload button */}
        {isUploadVisible && (
          <Button onClick={handleSubmit} className="btn btn-primary">
            Upload Post
          </Button>
        )}

        {/* Render Uploaded Posts */}
        <div className="uploaded-posts mt-5">
          {posts.map((post, index) => (
            <div key={index} className="post-container">
              <h5>Description:</h5>
              <p>{post.description}</p>

              {post.image && (
                <div>
                  <h6>Uploaded Image:</h6>
                  <img src={post.image} alt="uploaded" />
                </div>
              )}

              {post.video && (
                <div>
                  <h6>Uploaded Video:</h6>
                  <video controls>
                    <source src={post.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>

      {/* Image Upload Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} className="custom-modal">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Video Upload Modal */}
      <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)} className="custom-modal">
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVideoModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
