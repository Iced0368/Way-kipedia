import { useRef, useState } from 'react'
import './App.css'
import WikiPage from './components/WikiPage'
import { useConfigStore, useWikiStore } from './stores'

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("")
  const { title, setTitle } = useWikiStore();
  const { lang, setLang } = useConfigStore();

  const handleSearch = (value: string) => setSearchValue(value);
  const handleNavigate = () => {
    console.log(inputRef.current)
    if (inputRef.current)
      inputRef.current.textContent = "";
    setTitle(searchValue);
  }

  return (
    <div className="App-container">
      <header>
        <label>LANGUAGE</label>
        <select onChange={(e)=>setLang(e.target.value)}>
          <option value='ko'>ko</option>
          <option value='en'>en</option>
          <option value='jp'>jp</option>
        </select>

        <input 
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => {if (e.key == "Enter") handleNavigate();}}
          value={searchValue}
          placeholder="이동할 문서 제목을 입력하세요."
          ref={inputRef}
        >
        </input>
        <button onClick={handleNavigate}>이동</button>
      </header>

      <WikiPage/>
    </div>
  )
}

export default App
