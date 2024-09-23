import React from 'react';
import aman from '../assets/aman.jpg';
import sampad from '../assets/sampad.jpg';
import sudipta from '../assets/sudipta.jpg';
import tushar from '../assets/tushar.jpg';
import rajesh from '../assets/rajesh.jpg';
import sneha from '../assets/sneha.jpg';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";


const teamMembers = [
    {
        name: 'Aman Kumar Shaw',
        role: 'Team Leader',
        image: aman,
        linkedin: 'https://www.linkedin.com/in/aman-kumar-shaw-b4337a322/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    },
    {
        name: 'Sampad Kar',
        role: 'ML Enthusiasm, PPt Maker',
        image: sampad,
        linkedin: 'https://www.linkedin.com/in/sampad-kar-ab374a24b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    },
    {
        name: 'Sudipta Kumar Das',
        role: 'Full Stack Developer',
        image: sudipta,
        linkedin: 'https://www.linkedin.com/in/sudipta-kumar-das-672743276/'
    },
    {
        name: 'Tushar Parvej',
        role: 'ML Enthusiasm, PPt Speaker',
        image: tushar,
        linkedin: 'https://www.linkedin.com/in/debjeetghosh/'
    },
    {
        name: 'Rajesh Maity',
        role: 'Frontend Developer',
        image: rajesh,
        linkedin: 'https://www.linkedin.com/in/rajesh-maity-865aab24b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    },
    {
        name: 'Sneha Chowdhury',
        role: 'PPt Speaker',
        image: sneha,
        linkedin: '#'
    }
];

const About = () => {
    return (
        <div>
            <header className="header">
                <h1>About Us</h1>
            </header>

            <section className="about-us container mt-5 mb-5 p-4">
                <h2>Our Mission</h2>
                <p>Our mission is to provide individuals with the tools, resources, and guidance necessary to take charge of their career paths and achieve their professional goals. Our goal is to help users develop and refine the skills that are essential for career advancement, ensuring they are well-prepared for the evolving job market.</p>

                <h2>Our Vision</h2>
                <p>To be the leading platform that revolutionizes career development and education by providing innovative tools and personalized support that help individuals achieve their professional dreams. To create a world where every individual has access to top-quality education and career resources, enabling them to reach their full potential regardless of their background or location.</p>

                <h2>Our Team</h2>
                <div className="row">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="team-member">
                                <img src={member.image} alt={member.name} className="img-fluid" />
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">LinkedIn</a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="card-body">
                        </div>
            </section>
        </div>
    );
};

export default About;
