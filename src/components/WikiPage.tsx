import './WikiPage.css'
import QuestionCircle from '../assets/question-circle.svg?react'
import { useRef, useState } from "react"
import { useWikiStore } from '../stores';
import ExpandableBox from './ExpandableBox';
import LoadingModal from './LoadingModal';


const WikiPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const { title, description, intro, imageURL, links, redirect, isLoading, locatePage } = useWikiStore();
    const [filterValue, setFilterValue] = useState("");

    return (
        <div className="wiki-page" ref={pageRef}>
            {/* TITLE */}
            <div className="page-title">
                <h1>{title}</h1>
                {description ? <span>{description}</span> : <></>}
                {redirect ? <p>{redirect}에서 넘어옴</p> : <></>}
            </div>

            {/* CONTENT */}
            <div>
                <ExpandableBox maxHeight={300}>
                    <div className="intro-container row-flex">
                        <div className="page-intro">
                            <div className="paragraphs">
                                {intro!.split('\n').map((val, i)=>
                                    <p className="intro-text" key={i}>{val}</p>
                                )}
                            </div>
                        </div>
                        { imageURL !== null ? 
                            <div className="img-container">
                                <label className="img-label">이미지</label>
                                <div className="img-border">
                                    <img src={imageURL}></img>
                                </div> 
                            </div>
                            :
                            <></>
                        }
                    </div>
                </ExpandableBox>
            </div>

            {/* FILTER */}
            <div className="filter-container">
                <div className="filter-label-container">
                    <label className="filter-label">링크 필터</label>
                    <QuestionCircle />
                    <span>입력한 텍스트를 포함한 링크만 나타납니다.</span>
                </div>
                <input 
                    className="filter-input"
                    placeholder="필터 입력"
                    value={filterValue}
                    onChange={(e)=>setFilterValue(e.target.value)}
                >
                </input>
            </div>

            {/* LINKS */}
            <div className="links-container">
            {
                links!.filter(val => val.toLowerCase().includes(filterValue.toLowerCase()))
                    .map((value, i) => 
                        <div 
                            onClick={() => {
                                locatePage(value);
                                setFilterValue("");
                                if (pageRef.current)
                                    pageRef.current.scrollTo(0, 0);
                            }}
                            key={i}
                        >
                            {value}
                        </div>
                )
            }
            </div>

            {isLoading ? <LoadingModal/> : <></>}
        </div>
    )
}

export default WikiPage;