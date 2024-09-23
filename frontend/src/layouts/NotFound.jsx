import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="d-flex">
                    <div className="item-center">
                        <h1>404</h1>
                        <p>This Page is not found</p>
                        <button className="btn btn-sm btn-primary" onClick={() => navigate(-1)}>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
