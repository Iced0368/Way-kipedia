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
            className={`expandable-box ${isOverflowing ? (isExpanded ? "expanded" : "expandable") : ""}`}
            style={{ maxHeight: isExpanded ? "none" : `${maxHeight}px` }}
            onClick={toggleExpand}
        >
            <div className="content" ref={contentRef}>{children}</div>
        </div>
    );
}

export default ExpandableBox;