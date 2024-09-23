import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <footer className="bg-dark text-light py-4">
                <div className="container">
                    <div className="row">
                        {/* Company Info */}
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <h5>DEVCON</h5>
                            <p>We are dedicated to providing the best service possible. Contact us for more information about our offerings.</p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="/home" className="text-light">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className="text-light">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/job" className="text-light">
                                        Job Section
                                    </a>
                                </li>
                                <li>
                                    <a href="/resume" className="text-light">
                                        Resume Build
                                    </a>
                                </li>
                                <li>
                                    <a href="/course" className="text-light">
                                        Course
                                    </a>
                                </li>
                                <li>
                                    <a href="/feedback" className="text-light">
                                        Feedback
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div className="col-lg-4 col-md-12">
                            <h5>Follow Us</h5>
                            <div>
                                <a href="#" className="text-light me-3">
                                    {/* <FontAwesomeIcon icon={faFacebook} size="2x" /> */}
                                    <FaFacebook />
                                </a>
                                <a href="#" className="text-light me-3">
                                    {/* <FontAwesomeIcon icon={faTwitter} size="2x" /> */}
                                    <FaXTwitter />
                                </a>
                                <a href="#" className="text-light">
                                    {/* <FontAwesomeIcon icon={faInstagram} size="2x" /> */}
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Devcon. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
