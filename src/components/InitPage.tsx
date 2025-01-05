import "./InitPage.css"

import { useState } from "react";
import { useWikiStore } from "../stores";
import { useNavigate } from "react-router-dom";

const InitPage = () => {
    const [searchValue, setSearchValue] = useState("")
    const { movePage } = useWikiStore();
    const navigate = useNavigate();

    const handleSearch = (value: string) => setSearchValue(value);
    const handleNavigate = () => {
        movePage(searchValue);
        navigate("/nav");
    }

    return (
        <div className="init-page-container">
            <div className="search-bar">
                <input 
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => {if (e.key == "Enter") handleNavigate();}}
                    value={searchValue}
                    placeholder="이동할 문서 제목을 입력하세요."
                >
                </input>
                <button onClick={handleNavigate}>이동</button>
            </div>
        </div>
    )
}

export default InitPage;