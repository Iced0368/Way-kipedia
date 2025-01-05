import './WikiPage.css'

import QuestionCircle from '../assets/question-circle.svg?react'
import { useRef, useState } from "react"
import { useQuery } from 'react-query';

import { useWikiStore } from '../stores';

import ExpandableBox from './ExpandableBox';
import LoadingModal from './modals/LoadingModal';
import DocNotFoundModal from './modals/DocNotFoundModal';
import PageRoutes from './PageRoutes';
import { getDocData } from '../api/apis';


const WikiPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const { title, movePage, moveToPrev } = useWikiStore();
    const [filterValue, setFilterValue] = useState("");
    const [notFoundVisible, setNotFoundVisible] = useState(false);

    const { data, isFetching } = useQuery(
        ['wiki', title],
        () => getDocData(title), 
        {
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 10,
            keepPreviousData: true,
            enabled: title.length > 0,
            retry: 0,
            onError: () => {
                moveToPrev();
                setNotFoundVisible(true);
                setTimeout(() => setNotFoundVisible(false), 1500)
            },
        }
    );

    const touched       = data?.touched ?? "";
    const docTitle      = data?.title ?? "";
    const description   = data?.description ?? "";
    const redirect      = data?.redirect ?? "";
    const imageURL      = data?.imageURL ?? null;
    const intro         = data?.intro ?? "";
    const links         = data?.links ?? [];

    const handleMovePage = (dest: string) => {
        movePage(dest);
        setFilterValue("");
        if (pageRef.current)
            pageRef.current.scrollTo(0, 0);
    }

    return (
        <div className="wiki-page" ref={pageRef}>
            <PageRoutes/>
            {/* TITLE */}
            <div className="page-title doc-divider">
                <h1>
                    <div className="special-character">⁝☰</div> {docTitle}
                    {description ? <span>{description}</span> : <></>}
                </h1>
                <div className="touched">마지막 수정 : {touched}</div>
                {redirect ? <div className="redirect">({redirect}에서 넘어옴)</div> : <></>}
            </div>

            {/* CONTENT */}
            <div>
                <ExpandableBox maxHeight={500}>
                    <div className={`img-container ${imageURL === null ? "null" : ""}`}>
                        <label className="img-label">이미지</label>
                        <div className="img-border">
                            <img src={(imageURL ?? "")} decoding="async"></img>
                        </div> 
                    </div>
                    {intro!.split('\n').map((val, i)=>
                        <p className="intro-text" key={i}>&nbsp;{val}</p>
                    )}
                </ExpandableBox>
            </div>

            {/* LINKS */}
            <h2 className="doc-divider sticky">
                <div className="special-character">∽</div>
                &nbsp;{title} - 연결된 문서
            </h2>
            <div className="links-container">
            {
                links!.filter(val => val.toLowerCase().includes(filterValue.toLowerCase()))
                    .map((value, i) => 
                        <div 
                            onClick={() => handleMovePage(value)}
                            key={i}
                        >
                            {value}
                        </div>
                )
            }
            </div>

            {/* FILTER */}
            <div className="filter-container doc-divider">
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

            {isFetching ? <LoadingModal/> : <></>}
            {notFoundVisible ? <DocNotFoundModal/> : <></>}
        </div>
    )
}

export default WikiPage;