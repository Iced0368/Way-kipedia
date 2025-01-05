import { useWikiStore } from "../stores";
import "./PageRoutes.css"

const PageRoutes = () => {
    const { titleStack, revertTo } = useWikiStore();
    return (
        <div className="route-container">
            지나온 문서들 :&nbsp;&nbsp;
            {
                titleStack.map((title) => (
                    <div 
                        className="route-block"
                        onClick={() => revertTo(title)}
                    >
                        {title}
                    </div>
                ))
            }
        </div>
    );
}

export default PageRoutes;