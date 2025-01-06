import React, { useState, useEffect, useRef, ReactNode } from "react";
import "./ExpandableBox.css";

interface ExpandableBoxProps {
    children: ReactNode,
    maxHeight: number,
}

const ExpandableBox: React.FC<ExpandableBoxProps> = ({children, maxHeight}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const expandState = isOverflowing ? (isExpanded ? "expanded" : "expandable") : ""; 

    useEffect(() => {
        const contentElement = contentRef.current;
        setIsExpanded(false);
        if (contentElement) {
            setIsOverflowing(contentElement.scrollHeight > maxHeight);
        }
    }, [children, maxHeight]);

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <div
            className={`expandable-box ${expandState}`}
            style={{ maxHeight: isExpanded ? "none" : `${maxHeight}px` }}
            onClick={expandState === "expandable" ? toggleExpand : undefined}
        >
            <div className="content" ref={contentRef}>{children}</div>
            {isExpanded ? <span onClick={toggleExpand}>접기</span> : <></>}
        </div>
    );
}

export default ExpandableBox;