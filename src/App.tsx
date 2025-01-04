import { useRef, useState } from 'react'
import './App.css'
import WikiPage from './components/WikiPage'
import { useWikiStore } from './stores'

function App() {
  const [searchValue, setSearchValue] = useState("")
  const { locatePage, setLang } = useWikiStore();

  const handleSearch = (value: string) => setSearchValue(value);
  const handleNavigate = () => {
    locatePage(searchValue);
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
        >
        </input>
        <button onClick={handleNavigate}>이동</button>
      </header>

      <WikiPage/>
    </div>
  )
}

export default App
