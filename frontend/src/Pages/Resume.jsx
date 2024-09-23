import React, { useState } from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Button, Card, Form } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Resume = () => {
    const [resumeData, setResumeData] = useState({
        photo: null,
        name: '',
        designation: '',
        about: '',
        linkedin: '',
        github: '',
        twitter: '',
        phone: '',
        skills: '',
        school: '',
        college: '',
        company: '',
        description: '',
        projects: ''
    });

    const handleInputChange = (e) => {
        const { id, value, type, files } = e.target;
        setResumeData(prevData => ({
            ...prevData,
            [id]: type === 'file' ? files[0] : value
        }));
    };

    const generateResume = () => {
        const reader = new FileReader();

        reader.onload = (e) => {
            document.getElementById('outputPhoto').src = e.target.result;
        };

        if (resumeData.photo) {
            reader.readAsDataURL(resumeData.photo);
        }

        document.getElementById('outputName').innerText = resumeData.name;
        document.getElementById('outputDesignation').innerText = resumeData.designation;
        document.getElementById('outputAbout').innerText = resumeData.about;
        document.getElementById('outputLinkedIn').innerText = resumeData.linkedin;
        document.getElementById('outputLinkedIn').href = resumeData.linkedin;
        document.getElementById('outputGitHub').innerText = resumeData.github;
        document.getElementById('outputGitHub').href = resumeData.github;
        document.getElementById('outputTwitter').innerText = resumeData.twitter;
        document.getElementById('outputTwitter').href = resumeData.twitter;
        document.getElementById('outputPhone').innerText = resumeData.phone;
        document.getElementById('outputSkills').innerText = resumeData.skills.split(',').join(', ');
        document.getElementById('outputSchool').innerText = resumeData.school;
        document.getElementById('outputCollege').innerText = resumeData.college;
        document.getElementById('outputCompany').innerText = resumeData.company;
        document.getElementById('outputdescription').innerText = resumeData.description;
        document.getElementById('outputProjects').innerText = resumeData.projects.split(',').join(', ');

        document.getElementById('resumeOutput').style.display = 'block';
    };

    const downloadPDF = () => {
        const resumeOutput = document.getElementById('resumeOutput');
        document.getElementById("download").style.display="none";
        document.getElementById("reset").style.display="none";
        // Hide buttons during PDF generation
        document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none');

        html2canvas(resumeOutput, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4'
            });

            const imgWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('resume.pdf');

            // Show buttons again after PDF is generated
            document.querySelectorAll('.no-print').forEach(el => el.style.display = 'block');

            document.getElementById("download").style.display="block";
            document.getElementById("reset").style.display="block";
            // Optionally reset form after PDF download

            resetForm();
        });
    };


    const resetForm = () => {
        setResumeData({
            photo: null,
            name: '',
            designation: '',
            about: '',
            linkedin: '',
            github: '',
            twitter: '',
            phone: '',
            skills: '',
            school: '',
            college: '',
            company: '',
            description: '',
            projects: ''
        });

        document.getElementById('photo').value = null;
        document.getElementById('resumeOutput').style.display = 'none';
    };

    return (
        <section id="resume" className="resume">
            <header className="header">
                <h1>Resume Builder</h1>
            </header>
            <div className="container my-5">
                <Form id="resumeForm">
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h4 className="mt-4 text-black">Personal Information</h4>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>Upload Photo</Form.Label>
                                <Form.Control
                                    type="file"
                                    id="photo"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    value={resumeData.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="designation"
                                    placeholder="Enter your designation"
                                    value={resumeData.designation}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>About</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    id="about"
                                    rows="3"
                                    placeholder="Tell us about yourself"
                                    value={resumeData.about}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <h4 className="mt-4 text-black">Contact Information</h4>
                            <Form.Group className="mb-3">
                                <Form.Label>LinkedIn</Form.Label>
                                <Form.Control
                                    type="url"
                                    id="linkedin"
                                    placeholder="LinkedIn profile URL"
                                    value={resumeData.linkedin}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>GitHub</Form.Label>
                                <Form.Control
                                    type="url"
                                    id="github"
                                    placeholder="GitHub profile URL"
                                    value={resumeData.github}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>Twitter</Form.Label>
                                <Form.Control
                                    type="url"
                                    id="twitter"
                                    placeholder="Twitter profile URL"
                                    value={resumeData.twitter}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    value={resumeData.phone}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>Skills (comma-separated)</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="skills"
                                    placeholder="e.g., JavaScript, Python, SQL"
                                    value={resumeData.skills}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <h4 className="mt-4 text-black">Education</h4>
                            <Form.Group className="mb-3">
                                <Form.Label>School Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="school"
                                    placeholder="Enter your school name"
                                    value={resumeData.school}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>College Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="college"
                                    placeholder="Enter your college name"
                                    value={resumeData.college}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>Current Company</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="company"
                                    placeholder="Enter your current company"
                                    value={resumeData.company}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>Description of Company</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    id="description"
                                    placeholder="Enter your company description and details"
                                    value={resumeData.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 text-black">
                                <Form.Label>Projects (comma-separated)</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="projects"
                                    placeholder="e.g., Project A, Project B"
                                    value={resumeData.projects}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Button variant="outline-primary" size="lg" block onClick={generateResume}>
                                Generate Resume
                            </Button>
                        </Card.Body>
                    </Card>
                </Form>
            </div>
            <div className="container my-5" id="resumeOutput" style={{ display: 'none' }}>
                <Card className="p-4 shadow-sm">
                    <Card.Body>
                        <div className="text-center">
                            <img id="outputPhoto" alt="Profile" className="img-thumbnail" style={{ width: '150px', height: '150px' }} />
                        </div>
                        <h2 id="outputName" className="mt-3 text-center"></h2>
                        <h4 id="outputDesignation" className="text-center text-muted"></h4>
                        <p id="outputAbout" className="text-center"></p>
                        <hr />
                        <h5>Contact Information</h5>
                        <p className="contact-info">
                            <FaLinkedin className="mr-2" />
                            <a href="#" id="outputLinkedIn" target="_blank" rel="noopener noreferrer"></a>
                        </p>
                        <p className="contact-info">
                            <FaGithub className="mr-2" />
                            <a href="#" id="outputGitHub" target="_blank" rel="noopener noreferrer"></a>
                        </p>
                        <p className="contact-info">
                            <FaSquareXTwitter className="mr-2" />
                            <a href="#" id="outputTwitter" target="_blank" rel="noopener noreferrer"></a>
                        </p>
                        <p className="contact-info">
                            <BsFillTelephoneFill className="mr-2" />
                            <span id="outputPhone"></span>
                        </p>
                        <hr />
                        <h5>Skills</h5>
                        <p id="outputSkills" className="text-muted"></p>
                        <h5>Education</h5>
                        <p><strong>School:</strong> <span id="outputSchool" className="text-muted"></span></p>
                        <p><strong>College:</strong> <span id="outputCollege" className="text-muted"></span></p>
                        <h5>Experience</h5>
                        <p><strong>Current Company:</strong> <span id="outputCompany" className="text-muted"></span></p>
                        <p><strong>Description of Company:</strong> <span id="outputdescription" className="text-muted"></span></p>
                        <h5>Projects</h5>
                        <p id="outputProjects" className="text-muted"></p>
                        <div className="d-flex justify-content-between mt-4">
                            <Button id="download" variant="primary" onClick={downloadPDF}>
                                Download as PDF
                            </Button>
                            <Button id ="reset"variant="secondary" onClick={resetForm}>
                                Reset Form
                            </Button>

                        </div>
                    </Card.Body>
                </Card>
            </div>
        </section>
    );
};

export default Resume;
