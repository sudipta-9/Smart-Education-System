import React, { useState } from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeedBack = () => {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (value) => {
        setRating(value);
    };

    return (
        <section className="feedback" id="feedback">
            <div className="card">
                <header className="header">
                    <h1>Feedback Form</h1>
                </header>
                <div className="card-body">
                    <div className="d-flex align-items-center mb-4">
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="rating-section">
                                <h5>Rate your journey</h5>
                                <div className="form-group star-rating">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <React.Fragment key={value}>
                                            <input
                                                type="radio"
                                                id={`star${value}`}
                                                name="rating"
                                                value={value}
                                                checked={rating === value}
                                                onChange={() => handleRatingChange(value)}
                                                required
                                            />
                                            <label
                                                htmlFor={`star${value}`}
                                                title={`${value} stars`}
                                                style={{ color: value <= rating ? 'gold' : 'gray' }} // Change color based on selected rating
                                            >
                                                &#9733;
                                            </label>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="comments">Comments:</label>
                                <textarea
                                    className="form-control"
                                    id="comments"
                                    rows="3"
                                    placeholder="Enter your comments here"
                                />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedBack;

