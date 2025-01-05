import "./InitPage.css"

import { useWikiStore } from "../stores";
import { useNavigate } from "react-router-dom";
import { generateQuestion } from "../util";

const InitPage = () => {
    //const [searchValue, setSearchValue] = useState("")
    const { movePage, setGoals,
        startPoint, endPoint, 
        startDescription, endDescription,
     } = useWikiStore();
    const navigate = useNavigate();

    const goalExists = startPoint !== null && endPoint !== null;

    //const handleSearch = (value: string) => setSearchValue(value);
    const handleNavigate = (dest: string) => {
        movePage(dest);
        navigate(`/nav/${dest}`);
    }

    return (
        <div className="init-page-container">
            <h1>새로운 문제를 생성하세요!</h1>
            <button
                onClick={async () => {
                    const question = await generateQuestion(10, Number(new Date()));
                    console.log(question);

                    await setGoals(question.startPage, question.endPage);
                    console.log("!")
                }}
            >
                생성하기
            </button>

            {goalExists?
                <>
                <h1 className="goal-container">{startPoint} =&gt; {endPoint}</h1>
                <button onClick={() => handleNavigate(startPoint)}>시작하기</button>
                </>
                : <></>
            }
        </div>
    )
}

export default InitPage;