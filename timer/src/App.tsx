import { useState, useRef, useEffect } from 'react'
import { useSound } from 'use-sound'
import sound from '/sounds/bell.mp3'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')
  const timerRef = useRef<number | null>(null)
  const [play] = useSound(sound)

  const onClickStart = () => {
    if (timerRef.current !== null) {
      return
    }
    timerRef.current = window.setInterval(() => {
      setCount(count => count - 1)
    }, 1000)
  }

  const onClickStop = () => {
    window.clearInterval(timerRef.current!)
    timerRef.current = null
  }

  const onClickReset = () => {
    window.clearInterval(timerRef.current!)
    timerRef.current = null
    setCount(Number(value))
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    setValue(e.target.value)
    if (isNaN(value)) {
      setMessage('数字を入力してください')
      return
    }
    if (value < 0) {
      setMessage('0以上の数字を入力してください')
      return
    }
    setMessage('')
    setCount(value)
  }

  useEffect(() => {
    if (count === 0 && timerRef.current !== null) {
      window.clearInterval(timerRef.current!)
      timerRef.current = null
      play()
    }
  }, [count])

  const num = count / Number(value) * 100

  return (
    <div className="timer">
      <div className="counter" style={{background: `linear-gradient(180deg, #FFFFFF 0 ${num}%, #315a8c 0% 100%)`}}>
        <input type="text" value={timerRef.current !== null ? count : value} onChange={onChangeInput} />
      </div>
      <div className="button_area">
        <button onClick={onClickStart}>Start</button>
        <button onClick={onClickStop}>Stop</button>
        <button onClick={onClickReset}>Reset</button>
      </div>
      <div className="message_area">
        <p>{message}</p>
      </div>
    </div>
  )
}

export default App
