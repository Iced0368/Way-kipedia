import React, { ReactNode } from "react";
import "./ScrollableBox.css";

interface ScrollableBoxProps {
    children?: ReactNode,
    height: string,
}

const ScrollableBox: React.FC<ScrollableBoxProps> = ({children, height}) => {
    return (
        <div className="scrollable-box" style={{height: height}}>
            {children}
        </div>
    )
}

export default ScrollableBox;