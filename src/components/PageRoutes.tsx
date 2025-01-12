import { useNavigate } from "react-router-dom";
import { useWikiStore } from "../stores";
import "./PageRoutes.css"

const PageRoutes = () => {
    const { titleStack, revertTo } = useWikiStore();
    const navigate = useNavigate();

    return (
        <div className="route-container"
            onClick={(e) => {
                const target = e.target;
                if (target instanceof HTMLSpanElement 
                    && target.className === "route-block"
                    && target.textContent !== null
                ) {
                    const title = target.textContent;
                    revertTo(title);
                    navigate(`/nav/title=${title}`, {state: {title: title}})
                }
            }}
        >
            지나온 문서들 :&nbsp;&nbsp;
            {
                titleStack.map((title, i) => (
                    <span 
                        key={`${title}/${i}`}
                        className="route-block"
                    >
                        {title}
                    </span>
                ))
            }
        </div>
    );
}

export default PageRoutes;