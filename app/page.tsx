'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simple QR-like pattern generator (for demo purposes)
  // In production, use a library like qrcode
  const generateQR = () => {
    if (!canvasRef.current || !text) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = size
    canvas.height = size
    
    // Clear canvas
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, size, size)
    
    // Draw random pattern based on text hash
    ctx.fillStyle = 'black'
    const cellSize = Math.floor(size / 25)
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i)
      hash = hash & hash
    }
    
    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        if ((hash + row * col) % 2 === 0) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
        }
      }
    }
    
    // Draw position markers (corners)
    ctx.fillRect(0, 0, 7 * cellSize, 7 * cellSize)
    ctx.fillRect(18 * cellSize, 0, 7 * cellSize, 7 * cellSize)
    ctx.fillRect(0, 18 * cellSize, 7 * cellSize, 7 * cellSize)
    
    ctx.fillStyle = 'white'
    ctx.fillRect(2 * cellSize, 2 * cellSize, 3 * cellSize, 3 * cellSize)
    ctx.fillRect(20 * cellSize, 2 * cellSize, 3 * cellSize, 3 * cellSize)
    ctx.fillRect(2 * cellSize, 20 * cellSize, 3 * cellSize, 3 * cellSize)
  }

  const downloadQR = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  useEffect(() => {
    if (text) generateQR()
  }, [text, size])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📱 QR Code Generator</h1>
      
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL..."
        className={styles.input}
      />

      <div className={styles.sizeControl}>
        <label>Size: {size}x{size}</label>
        <input
          type="range"
          min="128"
          max="512"
          step="64"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
        />
      </div>

      {text && (
        <div className={styles.result}>
          <canvas ref={canvasRef} className={styles.canvas} />
          <button onClick={downloadQR} className={styles.downloadBtn}>
            💾 Download PNG
          </button>
        </div>
      )}
    </div>
  )
}