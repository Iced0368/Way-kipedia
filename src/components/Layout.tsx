import { useModalStore } from "../stores";
import "./Layout.css"

import { Outlet, useNavigate } from "react-router-dom";
import LoadingModal from "./modals/LoadingModal";
import DocNotFoundModal from "./modals/DocNotFoundModal";

const Layout = () => {
    const { loadingVisible, notFoundVisible } = useModalStore();
    const navigate = useNavigate();

    return (
        <div className="layout-container">
            <header 
                className="layout-header"
                onClick={() => { navigate("/", { replace: true }); }}
            >
                WAYKIPEDIA
            </header>
            <aside></aside>

            <Outlet/>

            {loadingVisible ? <LoadingModal/> : <></>}
            {notFoundVisible ? <DocNotFoundModal/> : <></>}
            
            <aside></aside>
            <footer className="layout-footer">
                iced0368@github.io
            </footer>
        </div>
    )
}

export default Layout;