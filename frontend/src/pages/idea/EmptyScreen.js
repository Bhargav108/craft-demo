import React from 'react'
import { Link } from 'react-router-dom'
import { FcIdea } from 'react-icons/fc';


import './Idea.css';

export default function EmptyScreen() {


  return (
    <div className='empty-screen-wrapper'>
      <FcIdea size={70}/>
      <h1 className='empty-screen-header' >No Ideas yet.</h1>
      <p className='empty-screen-sub-header'>Add Ideas with rich text editor with built-in features like bold, italic enriched editing options.</p>
      <Link  to='/create/idea'>
        <button className='empty-screen-button'>Add Idea</button>
      </Link>
    </div>
  )
}
