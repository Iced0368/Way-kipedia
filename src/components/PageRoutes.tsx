import { useNavigate } from "react-router-dom";
import { useWikiStore } from "../stores";
import "./PageRoutes.css"

const PageRoutes = () => {
    const { titleStack, revertTo } = useWikiStore();
    const navigate = useNavigate();

    return (
        <div className="route-container">
            지나온 문서들 :&nbsp;&nbsp;
            {
                titleStack.map((title, i) => (
                    <span 
                        key={`${title}/${i}`}
                        className="route-block"
                        onClick={() => {
                            revertTo(title);
                            navigate(`/nav/title=${title}`, {state: {title: title}})
                        }}
                    >
                        {title}
                    </span>
                ))
            }
        </div>
    );
}

export default PageRoutes;