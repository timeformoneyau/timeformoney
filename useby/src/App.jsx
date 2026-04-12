import { useState, useRef } from 'react'
import Tesseract from 'tesseract.js'
import './App.css'

function App() {
  const [imageSrc, setImageSrc] = useState(null)
  const [ocrText, setOcrText] = useState(null)
  const [status, setStatus] = useState('idle') // idle | processing | done | error
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef(null)

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setImageSrc(url)
    setOcrText(null)
    setStatus('processing')
    setProgress(0)

    Tesseract.recognize(file, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(Math.round(m.progress * 100))
        }
      },
    })
      .then((result) => {
        setOcrText(result.data.text)
        setStatus('done')
      })
      .catch(() => {
        setStatus('error')
      })

    // Reset the input so the same photo can be retaken
    e.target.value = ''
  }

  function handleScanClick() {
    fileInputRef.current.click()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>UseBy</h1>
        <p>Scan food packaging to read expiry dates</p>
      </header>

      <main className="app-main">
        {/* Hidden file input — triggers camera on mobile */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <button
          className="scan-button"
          onClick={handleScanClick}
          disabled={status === 'processing'}
        >
          {status === 'processing' ? 'Scanning…' : 'Scan Item'}
        </button>

        {imageSrc && (
          <div className="image-section">
            <h2>Photo</h2>
            <img src={imageSrc} alt="Captured item" className="captured-image" />
          </div>
        )}

        {status === 'processing' && (
          <div className="status-section">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="status-text">Running OCR… {progress}%</p>
          </div>
        )}

        {status === 'done' && ocrText !== null && (
          <div className="ocr-section">
            <h2>Extracted Text</h2>
            <pre className="ocr-text">{ocrText.trim() || '(no text found)'}</pre>
          </div>
        )}

        {status === 'error' && (
          <div className="ocr-section">
            <p className="error-text">OCR failed. Try another photo.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
