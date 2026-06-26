import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Upload from './pages/Upload'
import ResultList from './pages/ResultList'
import ResultListB from './pages/ResultListB'
import ValidityDetail from './pages/ValidityDetail'
import StyleDetail from './pages/StyleDetail'
import CombinedDetail from './pages/CombinedDetail'
import CombinedDetailC from './pages/CombinedDetailC'
import CitationList from './pages/CitationList'
import CitationUpload from './pages/CitationUpload'
import CitationResult from './pages/CitationResult'
import './App.css'

export default function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`app-wrap${collapsed ? ' collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <main className="app-main">
        <Routes>
          {/* A안 */}
          <Route path="/" element={<ResultList />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/list" element={<ResultList />} />
          <Route path="/validity/:id" element={<ValidityDetail />} />
          <Route path="/style/:id" element={<StyleDetail />} />
          {/* B안 */}
          <Route path="/b/list" element={<ResultListB />} />
          <Route path="/b/detail/:id" element={<CombinedDetail />} />
          {/* C안 */}
          <Route path="/c/list" element={<ResultListB />} />
          <Route path="/c/detail/:id" element={<CombinedDetailC />} />
          {/* 참고문헌 유효성 검증 */}
          <Route path="/citation" element={<CitationList />} />
          <Route path="/citation/upload" element={<CitationUpload />} />
          <Route path="/citation/result/:id" element={<CitationResult />} />
        </Routes>
      </main>
    </div>
  )
}
