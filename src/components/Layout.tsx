import "./Layout.css"

import { Outlet, useNavigate } from "react-router-dom";
import { useWikiStore } from "../stores";

const Layout = () => {
    const { initStore } = useWikiStore();
    const navigate = useNavigate();

    return (
        <div className="layout-container">
            <header 
                className="layout-header"
                onClick={() => {
                    initStore();
                    navigate("/");
                }}
            >
                WAYKIPEDIA
            </header>
            <div></div>

            <Outlet/>
            
            <div></div>
            <footer className="layout-footer">
                iced0368@github.io
            </footer>
        </div>
    )
}

export default Layout;