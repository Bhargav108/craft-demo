import React, { useMemo, useState } from 'react'
import LibraryEditor from '../../components/editor/LibraryEditor';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createIdea } from '../../features/IdeaSlice';

export default function CreateIdea({ title="", subTitle="", content="", isEdit = false}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ideaTitle, setIdeaTitle] = useState(title);
  const [ideaSubtitle, setIdeaSubtitle] = useState(subTitle);
  const [ideaContent, setIdeaContent] = useState(content);

  //functions
  const handleSave = () => {
    console.log('Idea Title:', ideaTitle);
    console.log('Idea Subtitle:', ideaSubtitle);
    console.log('Idea Content:', ideaContent);
    const payload = {
      title: ideaTitle,
      'sub-title': ideaSubtitle,
      content: ideaContent
    }
    dispatch(createIdea(payload))
      .then((data) => {
        console.log('success', data.payload)
        navigate('/idea');
      })
      .catch(error => {
        setIdeaTitle('')
        setIdeaSubtitle('')
        setIdeaContent('')
      })
  };

  const updateContent = (updatedContent) => {
    setIdeaContent(previousContent => updatedContent)
  }

  const editableContent = useMemo(() => (
    <LibraryEditor content={content} updateContent={updateContent} />
  ), [content]);

  return (
    <div className='create-idea-wrapper'>
      <h1 className='create-idea-header'>{isEdit ? 'Edit' : 'Create'} new Idea</h1>
      <label htmlFor="ideaTitle" className='create-idea-label'>Enter Idea Title:</label>
      <input
        type="text"
        id="ideaTitle"
        name="ideaTitle"
        value={ideaTitle}
        onChange={(e) => setIdeaTitle(e.target.value)}
        required
      />

      <label htmlFor="ideaSubtitle" className='create-idea-label'>Enter Subtitle of Idea:</label>
      <input
        type="text"
        id="ideaSubtitle"
        name="ideaSubtitle"
        value={ideaSubtitle}
        onChange={(e) => setIdeaSubtitle(e.target.value)}
        required
      />

      <label htmlFor="ideaContent" className='create-idea-label'>Enter Your Idea:</label>

      {editableContent}

      <button
        className='create-idea-button'
        onClick={() => handleSave()}
      >
        {isEdit ? 'Update' : 'Create'} Idea
      </button>
    </div>
  );
};
