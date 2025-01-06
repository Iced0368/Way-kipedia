import "./EntryPage.css";
import { useConfigStore, useWikiStore } from "../stores";
import { useNavigate } from "react-router-dom";

const EntryPage = () => {
    const { 
        startPoint, endPoint, 
        startIntro, endIntro,
        movePage,
    } = useWikiStore();

    const { lang } = useConfigStore();
    const navigate = useNavigate();

    const handleNavigate = (dest: string) => {
        movePage(dest);
        navigate("/nav", {state: {title: dest, lang: lang}, replace: true});
    }

    return (
        <div className="entry-container">
            <div className="gb-container">
                <div>시작 문서</div>
                <div className="entry-goal-box">
                    <h1>{startPoint}</h1>
                    <div>{startIntro}</div>
                </div>
            </div>

            <div className="gb-container">
                <div>도착 문서</div>
                <div className="entry-goal-box">
                    <h1>{endPoint}</h1>
                    <div>{endIntro}</div>
                </div>
            </div>
            <button onClick={() => {handleNavigate(startPoint!)}}>
                시작하기
            </button>
        </div>
    )
}

export default EntryPage;