import React from 'react'

export default function Editor({ textConfig, onTextChange }) {
  return (
    <textarea
      id="myTextArea"            
      name="textareaName"        
      rows={textConfig?.rows || 4}                   
      cols={textConfig?.rows || 50}                  
      placeholder="Enter text"   
      maxLength={200}            
      minLength={10}             
      onChange={(e) => {onTextChange(e)}}
      value={textConfig.value}
    />
  )
}
