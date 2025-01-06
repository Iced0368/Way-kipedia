import "./InitPage.css"

import { Page } from "wikipedia";
import { useEffect, useState } from "react";
import { useConfigStore, useWikiStore } from "../stores";
import { useNavigate } from "react-router-dom";
import { generateQuestions } from "../util";

import RightArrow from "../assets/right-arrow.svg?react";
import { ScrollableBox } from "./frags";
import { LoadingBar } from "./frags";

type WikiGoal = {
    start: Page,
    end: Page
};

const InitPage = () => {
    const [searchValue, setSearchValue] = useState("")
    const [goalCandidates, setGoalCandidates] = useState<WikiGoal[]>([]);
    const [progress, setProgress] = useState<number | undefined>(undefined);

    const { initStore } = useWikiStore();
    const { movePage, setWikiGoal } = useWikiStore();
    const { lang, generateDepth, generateBatch } = useConfigStore();

    const navigate = useNavigate();

    const handleNavigate = (dest: string) => {
        movePage(dest);
        navigate(`/nav/title=${dest}&lang=${lang}`, {state: {title: dest, lang: lang}});
    }
    useEffect(() => {
        initStore(); 
        setProgress(0);
    }, [navigate]);

    return (
        <div className="init-page-container">
            <div className="gen-box">
                <h1>새로운 문제를 생성하세요!</h1>
                <button
                    onClick={async () => {
                        setProgress(0);
                        console.time();
                        const questions = await generateQuestions(
                            generateDepth!, generateBatch!, Number(new Date()), lang!,
                            () => setProgress(prev => prev!+1)
                        );

                        console.timeEnd();

                        setGoalCandidates(
                            questions.map(question => ({
                                start: question.startPage,
                                end: question.endPage
                            }))
                        );
                        setProgress(undefined);
                        
                        console.log(questions);
                    }}
                >
                    생성하기
                </button>
            </div>

            {progress === undefined ?
                <ScrollableBox height="300px">
                    {
                        goalCandidates.map((goal, index) => (
                            <div 
                                key={index}
                                className="goal-container"
                                onClick={async () => {
                                    const startPage = goalCandidates[index].start;
                                    const endPage = goalCandidates[index].end;
                                    
                                    await setWikiGoal(startPage, endPage);
                                    handleNavigate(startPage.title);
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
                <div className="lb-container">
                    <p>생성 대기중</p>
                    <LoadingBar progress={(progress / (generateDepth! * generateBatch!)) * 100}></LoadingBar>
                </div>
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