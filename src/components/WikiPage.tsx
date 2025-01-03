import './WikiPage.css'
import QuestionCircle from '../assets/question-circle.svg?react'

import { useEffect, useRef, useState } from "react"
import { useConfigStore, useWikiStore } from "../stores";
import wiki from "wikipedia"


const WikiPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const { title, setTitle } = useWikiStore();
    const { lang } = useConfigStore();

    const [isLoading, setIsLoading] = useState(false);

    const [docTitle, setDocTitle] = useState(title);
    const [description, setDescription] = useState("");
    const [intro, setIntro] = useState('');
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [links, setLinks] = useState<string[]>([]);

    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        let [summaryLoaded, introLoaded] = [false, false];
        setIsLoading(true);
        setDocTitle(title);

        wiki.setLang(lang);
        wiki.page(title)
            .then(page => {
                setDocTitle(page.title); 
                page.summary().then(summary => {
                    setDescription(summary.description || "");
                    setImageURL(summary.thumbnail ? summary.thumbnail.source : null);
                    
                    summaryLoaded = true;
                    setIsLoading(!introLoaded);
                })
                page.intro()
                    .then(res => {
                        setIntro(res)
                        introLoaded = true;
                        setIsLoading(!summaryLoaded);
                    })
                    .catch(error => console.error(error));

                page.links()
                    .then(res => setLinks(res))
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }, [title]);

    return (
        <div className="wiki-page" ref={pageRef}>
            <div className="page-title">
                <h1>{docTitle}</h1>
                {description ? <span>{description}</span> : <></>}
            </div>

            { isLoading ? 
                <div className="loading-container">
                    <div className='loading'></div> 
                    <span>Loading...</span>
                </div>
                :
                <div className={`page-intro ${imageURL === null ? 'extended' : ''}`}>
                    <div className="paragraphs">
                        {intro.split('\n').map((val, i)=>
                            <p className="intro-text" key={i}>{val}</p>
                        )}
                    </div>
                </div>
            }
            { !isLoading && imageURL !== null ? 
                <label className="img-label">이미지</label> : <></>
            }
            { !isLoading && imageURL !== null ?    
                <div className="img-container">
                    <img src={imageURL}></img>
                </div> 
                :
                <></>
            }

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

            <div className="links-container">
            {
                links.filter(val => val.toLowerCase().includes(filterValue.toLowerCase()))
                    .map((value, i) => 
                        <div onClick={() => {
                            setTitle(value)
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
        </div>
    )
}

export default WikiPage;