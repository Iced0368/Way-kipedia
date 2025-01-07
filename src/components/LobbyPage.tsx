import "./LobbyPage.css"

import { Page } from "wikipedia";
import { useEffect, useState } from "react";
import { useConfigStore, useModalStore, useWikiStore } from "../stores";
import { useNavigate } from "react-router-dom";
import { generateQuestions } from "../util";

import RightArrow from "../assets/right-arrow.svg?react";
import { ScrollableBox } from "./frags";

type WikiGoal = {
    start: Page,
    end: Page
};

const UNINITIATED = -1;
const COMPLETED = -2;


const InitPage = () => {
    const [searchValue, setSearchValue] = useState("")
    const [goalCandidates, setGoalCandidates] = useState<WikiGoal[]>([]);
    const [progress, setProgress] = useState<number>(UNINITIATED);

    const { movePage, setWikiGoal, initStore } = useWikiStore();
    const { lang, generateDepth, generateBatch } = useConfigStore();
    const { setLoadingVisible } = useModalStore();

    const navigate = useNavigate();

    const handleNavigate = (dest: string) => {
        movePage(dest);
        navigate("/nav", {replace: true});
    }

    const handleEnter = () => {
        navigate("/entry", {replace: true});
    }

    useEffect(() => {
        initStore(); 
        setProgress(UNINITIATED);
        setLoadingVisible(false);
    }, [navigate]);

    const progressPercentage = Math.max(Math.round(progress / (generateDepth! * generateBatch!) * 100), 0);

    return (
        <div className="init-page-container">
            <div className="gen-box">
                <h1>새로운 문제를 생성하세요!</h1>

                <button
                    className={`loading-button ${progress < 0 ? "active" : "inactive"}`}
                    onClick={async () => {
                        if (progress >= 0) return;
                        setProgress(0);
                        console.time();
                        const today = new Date();
                        const seed = Number(today);//400 * today.getFullYear() + (40 * today.getMonth() + today.getDay());

                        const questions = await generateQuestions(
                            generateDepth!, generateBatch!, seed, lang!,
                            () => setProgress(prev => prev!+1)
                        );

                        console.timeEnd();

                        setGoalCandidates(
                            questions.filter(item => item !== null).map(question => ({
                                start: question.startPage,
                                end: question.endPage
                            }))
                        );
                        setProgress(COMPLETED);
                        
                        console.log(questions);
                    }}
                >
                    <div
                        className="loading-bar-progress"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                    <div className="loading-bar-text">
                        {progress < 0 ? "생성하기" : `생성 중...${progressPercentage}%`}
                    </div>
                </button>
            </div>

            {progress === COMPLETED ?
                <ScrollableBox height="35vh">
                    {
                        goalCandidates.map((goal, index) => (
                            <div 
                                key={index}
                                className="goal-container"
                                onClick={async () => {
                                    const startPage = goalCandidates[index].start;
                                    const endPage = goalCandidates[index].end;
                                    
                                    await setWikiGoal(startPage, endPage);
                                    handleEnter();
                                }}
                            >
                                <div className="goal-box">
                                    <h2>{goal.start.title}</h2>
                                </div>
                                <RightArrow/>
                                <div className="goal-box">
                                    <h2>{goal.end.title}</h2>
                                </div>
                            </div>
                        ))
                    }
                </ScrollableBox>
                : 
                <></>
            }

            
            <div className="search-bar">
                <div>또는 직접 제목을 입력해 이동해보세요</div>
                <input 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => { if(e.key == "Enter") handleNavigate(searchValue)}}
                    placeholder="문서 제목을 입력하세요"
                />
                <button onClick={()=>handleNavigate(searchValue)}>이동</button>
            </div>
        </div>
    )
}

export default InitPage;