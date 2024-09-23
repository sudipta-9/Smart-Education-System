import Lottie from "lottie-react";
import welcomeData from "../assets/welcome.json";
import exploreData from "../assets/explore.json";
import whyData from "../assets/why.json";
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Hero = () => {
    const languageData = {
        labels: ['JavaScript', 'Python', 'Java', 'C#', "C++", "TypeScript", 'PHP', "Ruby", "Swift", "Kotlin"],
        datasets: [
            {
                label: 'Market Share (%)',
                data: [25, 20, 15, 12, 8, 6, 6, 4, 4, 2],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const dbmsData = {
        labels: ['MySQL', 'PostgreSQL', "Oracle Database", "Microsoft SQL Server", 'MongoDB', 'SQLite', 'Redis', "MariaDB", "Cassandra", "Elasticsearch"],
        datasets: [
            {
                label: 'Market Share (%)',
                data: [25, 20, 15, 12, 12, 8, 6, 5, 4, 4],
                backgroundColor: 'rgba(255,159,64,0.4)',
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: 1,
            },
        ],
    };

    const cloudData = {
        labels: ['AWS', 'Microsoft Azure', 'Google Cloud', 'IBM Cloud', "Oracle Cloud", "Alibaba Cloud", "Salesforce Cloud", "DigitalOcean", "VMware Cloud", "Tencent Cloud"],
        datasets: [
            {
                label: 'Market Share (%)',
                data: [35, 30, 15, 8, 8, 7, 5, 4, 4, 3],
                backgroundColor: 'rgba(54,162,235,0.4)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
            },
        ],
    };

    const aiData = {
        labels: ['ChatGPT', 'Gemini', 'Microsoft Azure AI', 'IBM Watson', 'Amazon SageMaker', 'Hugging Face', 'DataRobot', 'Salesforce Einstein', 'NVIDIA AI', 'C3.ai'],
        datasets: [
            {
                label: 'Market Share (%)',
                data: [30, 25, 20, 15, 15, 8, 7, 5, 5, 4],
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Market Share (%)',
            },
        },
    };

    return (
        <>
            <section className="hero-section d-flex align-items-center mt-5">
                <div className="container">
                    {/* First Row */}
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 text-center text-lg-start">
                            <h1 className="display-4 heading-animation-1 mb-5" style={{ color: 'blue' }}>
                                Welcome to DEVCON!
                            </h1>
                            <p className="lead paragraph-animation-1 mb-5" style={{ color: 'black' }}>
                                Your journey to success begins here. At DevCon, we empower you to take control of your career and education with the tools and resources you need to thrive. Whether you're looking to upskill, find your dream job, or craft a standout resume, we've got you covered.
                            </p>
                        </div>
                        <div className="col-lg-6 mb-5">
                            <Lottie animationData={welcomeData} />
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 text-center text-lg-start mb-5">
                            <Lottie animationData={exploreData} />
                        </div>
                        <div className="col-lg-6">
                            <h1 className="display-4 heading-animation-2 mb-5" style={{ color: 'blue' }}>
                                Explore Our Platform:
                            </h1>
                            <p className="lead paragraph-animation-2 mb-5" style={{ color: 'black' }}>
                                Dive into a variety of courses designed to enhance your skills and knowledge. Learn at your own pace and stay ahead in your career.
                                Create a professional resume that highlights your strengths and makes you stand out to employers. Our easy-to-use resume builder helps you showcase your achievements and skills effectively.
                                Get personalized career advice, tips, and resources to navigate your career path with confidence.
                            </p>
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 text-center text-lg-start">
                            <h1 className="display-4 heading-animation-2 mb-5" style={{ color: 'blue' }}>
                                Why Choose DEVCON?
                            </h1>
                            <p className="lead paragraph-animation-2 mb-5" style={{ color: 'black' }}>
                                Customized courses to match your interests and career goals.
                                Access to industry experts and mentors to guide you along the way.
                                State-of-the-art tools to create impactful resumes and prepare for interviews.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <Lottie animationData={whyData} />
                        </div>
                    </div>

                    {/* Market Share Rankings Dashboard */}
                    <div className="container mt-6">
                        <h2 className="text-center mb-4">Market Share Rankings Dashboard</h2>
                        {/* Tabs for each category */}
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="languages-tab" data-bs-toggle="tab" href="#languages" role="tab"
                                    aria-controls="languages" aria-selected="true">Programming Languages</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="dbms-tab" data-bs-toggle="tab" href="#dbms" role="tab" aria-controls="dbms"
                                    aria-selected="false">Database Systems</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="cloud-tab" data-bs-toggle="tab" href="#cloud" role="tab"
                                    aria-controls="cloud" aria-selected="false">Cloud Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="ai-tab" data-bs-toggle="tab" href="#ai" role="tab" aria-controls="ai"
                                    aria-selected="false">AI Tools</a>
                            </li>
                        </ul>
                        {/* Tab Content */}
                        <div className="tab-content" id="myTabContent">
                            {/* Programming Languages Tab */}
                            <div className="tab-pane fade show active" id="languages" role="tabpanel" aria-labelledby="languages-tab">
                                <Bar data={languageData} options={options} />
                            </div>
                            {/* Database Systems Tab */}
                            <div className="tab-pane fade" id="dbms" role="tabpanel" aria-labelledby="dbms-tab">
                                <Bar data={dbmsData} options={options} />
                            </div>
                            {/* Cloud Services Tab */}
                            <div className="tab-pane fade" id="cloud" role="tabpanel" aria-labelledby="cloud-tab">
                                <Bar data={cloudData} options={options} />
                            </div>
                            {/* AI Tab */}
                            <div className="tab-pane fade" id="ai" role="tabpanel" aria-labelledby="ai-tab">
                                <Bar data={aiData} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
