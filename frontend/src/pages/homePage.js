import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()
  return (
    <div>
        <h1>ANASAYFA</h1>
        <button onClick={() =>navigate('/developer')}>Developer</button>
        <button onClick={() =>navigate('/investor')}>Investor</button>
    </div>

  )
}

export default HomePage