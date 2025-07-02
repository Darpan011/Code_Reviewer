import { useState, useEffect } from 'react'
import prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import Editor from "react-simple-code-editor" 
// import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-javascript'
import './App.css'
import Markdown from 'react-markdown' // For rendering markdown
import rehypeHighlight from 'rehype-highlight' // For syntax highlighting in markdown
import 'highlight.js/styles/github-dark.css' // Import a highlight.js theme
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [code, setcode] = useState(`function sum() {
  return 1 + 1;
}`)

  useEffect(() => {
    prism.highlightAll()
  })

  const [review, setreview] = useState('')

  async function reviewCode(){
    
    const response = await axios.post('http://localhost:3000/api/ai/get-review', { code })
    setreview(response.data)

  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setcode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                border: '1px solid #ddd',
                borderRadius: '4px',
                height: '100%',
                width: '100%',
                color: '#f8f8f2'
              }}
            />
          </div>
          <div 
          onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
            
          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App
