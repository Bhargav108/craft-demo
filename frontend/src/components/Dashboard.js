import React from 'react'
import { Link } from 'react-router-dom'

import '../App.css'

export default function Dashboard() {
  return(
    <div className='container'>
      <div className='dashboard-container'>
        <h2 className='dashboard-header'>Create Awesome ideas</h2>
        <p className='dashboard-title'>Create ideas with rich text editors and have the ability to delete, update and also intuitively update referenced ideas in content</p>
        <Link to='/idea'>
          <button className='btn-secondary'>Explore Ideas</button>
        </Link>
      </div>

      <div className='dashboard-container'>
        <h2 className='dashboard-header'>Playground</h2>
        <p className='dashboard-title'>Checkout different text editors.</p>
        <Link to='/playground'>
          <button className='btn-secondary'>Explore Playground</button>
        </Link>
      </div>
    </div>
  )
}
