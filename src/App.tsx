import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { InitPage, Layout, WikiPage } from './components'

function App() {
  return (
    <div className="App-container">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<InitPage/>}></Route>
            <Route path="/nav/*" element={<WikiPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
