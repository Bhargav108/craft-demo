import React from 'react'
import { FcIdea } from 'react-icons/fc';
import { BiSolidTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux';
import { deleteIdea } from '../../features/IdeaSlice';

export default function IdeaCard({idea}) {

  const dispatch = useDispatch()

  const deleteIdeaAction = (e) => {
    e.preventDefault()
    dispatch(deleteIdea(idea._id))
  }

  return (
    <div className='idea-card-wrapper'>
      <div className='idea-card-info-wrapper'>
        <FcIdea size={35} className='idea-card-icon'/>
        <div className='idea-card-detail-wrapper'>
          <h1 className='idea-card-title'>{idea?.title}</h1>
          <p className='idea-card-subtitle'>{idea['sub-title']}</p>
        </div>
      </div>
      <div className='idea-card-button-actions-wrapper'>
        <BiSolidTrash size={18} onClick={(e) => deleteIdeaAction(e) }/>
      </div>
    </div>
  )
}
