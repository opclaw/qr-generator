'use client'

import { useState, useEffect, useCallback } from 'react'

export default function Home() {
  const [text, setText] = useState('https://example.com')
  const [qrUrl, setQrUrl] = useState('')
  const [size, setSize] = useState(256)

  useEffect(() => {
    if (text) {
      const encoded = encodeURIComponent(text)
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}`)
    }
  }, [text, size])

  const downloadQR = useCallback(() => {
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = 'qr-code.png'
    link.click()
  }, [qrUrl])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">📱</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">QR Generator</h1>
                <p className="text-sm text-slate-500">Create QR codes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-3xl shadow-xl mb-6">📱</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">QR Code Generator</h2>
            <p className="text-lg md:text-xl text-slate-600">Create QR codes for URLs, text, WiFi, and more.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text..."
              className="input"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Size: {size}x{size}</label>
            <input
              type="range"
              min="128"
              max="512"
              step="64"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {qrUrl && (
            <div className="text-center">
              <div className="inline-block p-4 bg-white rounded-xl border border-slate-200 shadow-lg mb-4">
                <img src={qrUrl} alt="QR Code" className="max-w-full" />
              </div>
              <button onClick={downloadQR} className="btn-primary bg-fuchsia-600 hover:bg-fuchsia-700">
                💾 Download QR Code
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
