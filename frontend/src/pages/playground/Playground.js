import React, { useState } from 'react'
import LibraryEditor from '../../components/editor/LibraryEditor'
import CustomEditor from '../../components/editor/CustomEditor'

function Playground() {
  const [ content, setContent ] = useState('')

  const updateContent = (content) => {
    setContent(previousContent => content)
  }
  
  return (
    <div className='plaground-wrapper'>
        <div>
          <h2>Custom text Editor</h2>
          <CustomEditor />
        </div>
        <div>
          <h2>Quill text Editor</h2>
          <LibraryEditor content={content} updateContent={updateContent}/>
        </div>

    </div>
  )
}


export default Playground
