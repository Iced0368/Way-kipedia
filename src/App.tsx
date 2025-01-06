import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { EntryPage, InitPage, Layout, WikiPage } from './components'

function App() {
  return (
    <div className="App-container">
      <BrowserRouter basename="/Way-kipedia/">
        <Routes>
          <Route element={<Layout />}>
            <Route path="" element={<InitPage/>}></Route>
            <Route path="entry/" element={<EntryPage/>}></Route>
            <Route path="nav/*" element={<WikiPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
