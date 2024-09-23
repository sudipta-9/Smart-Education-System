import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const HomeLayout = () => {
    return (
        <>
            <Header />
            <div className="d-flex flex-column min-vh-100">
                <div className="flex-grow-1">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default HomeLayout;
