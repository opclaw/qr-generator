'use client'

import { useState, useEffect, useCallback } from 'react'

export default function Home() {
  const [text, setText] = useState('https://example.com')
  const [qrUrl, setQrUrl] = useState('')
  const [size, setSize] = useState(256)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (!text.trim()) {
      setQrUrl('')
      setError('')
      return
    }

    setLoading(true)
    setImageLoaded(false)
    setError('')
    
    const encoded = encodeURIComponent(text)
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}`
    setQrUrl(url)
  }, [text, size])

  const handleImageLoad = () => {
    setLoading(false)
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setLoading(false)
    setError('Failed to generate QR code. Please try again.')
  }

  const downloadQR = useCallback(() => {
    if (!qrUrl || !imageLoaded) return
    
    fetch(qrUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `qr-code-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
      .catch(() => {
        setError('Failed to download QR code')
      })
  }, [qrUrl, imageLoaded])

  const strength = text.length 
    ? text.length < 50 ? 'Low' : text.length < 150 ? 'Medium' : 'High'
    : 'None'
  
  const strengthColor = strength === 'High' ? 'text-red-600' : strength === 'Medium' ? 'text-yellow-600' : 'text-green-600'

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg" aria-hidden="true">📱</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">QR Generator</h1>
                <p className="text-sm text-slate-500">Create QR codes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200" aria-labelledby="hero-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-3xl shadow-xl mb-6" aria-hidden="true">📱</div>
            <h2 id="hero-heading" className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">QR Code Generator</h2>
            <p className="text-lg md:text-xl text-slate-600">Create QR codes for URLs, text, WiFi, and more.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full" role="main">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <label htmlFor="qr-content" className="block text-sm font-medium text-slate-700 mb-2">
              Content
            </label>
            <input
              id="qr-content"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 outline-none transition-all"
              aria-describedby="content-help"
            />
            <div id="content-help" className="mt-2 flex justify-between text-sm">
              <span className="text-slate-500">{ text.length } characters</span>
              <span className={strengthColor}>
                Complexity: {strength}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="qr-size" className="block text-sm font-medium text-slate-700 mb-2">
              Size: {size}x{size}px
            </label>
            <input
              id="qr-size"
              type="range"
              min="128"
              max="512"
              step="64"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-fuchsia-600"
              aria-valuemin={128}
              aria-valuemax={512}
              aria-valuenow={size}
              aria-label="QR code size"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>128px</span>
              <span>512px</span>
            </div>
          </div>

          {error && (
            <div 
              role="alert" 
              aria-live="polite"
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
            >
              <span aria-hidden="true">⚠️ </span>{error}
            </div>
          )}

          {qrUrl && (
            <div className="text-center">
              <div 
                className="inline-block p-4 bg-white rounded-xl border border-slate-200 shadow-lg mb-4 relative"
                role="img"
                aria-label={imageLoaded ? `QR code for: ${text}` : 'Generating QR code...'}
              >
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                    <div 
                      className="w-8 h-8 border-4 border-fuchsia-200 border-t-fuchsia-600 rounded-full animate-spin"
                      role="status"
                      aria-label="Loading"
                    />
                  </div>
                )}
                <img 
                  src={qrUrl} 
                  alt={`QR code containing: ${text}`}
                  className="max-w-full"
                  width={size}
                  height={size}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />
              </div>
              
              <button 
                onClick={downloadQR} 
                disabled={!imageLoaded}
                className="inline-flex items-center gap-2 px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
                aria-label="Download QR code as PNG image"
              >
                <span aria-hidden="true">💾</span> 
                {imageLoaded ? 'Download QR Code' : 'Generating...'}
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
