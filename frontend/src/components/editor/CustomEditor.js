import React, { useRef, useState, useMemo } from 'react';
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignRight, FaUndo, FaRedo } from 'react-icons/fa';
import './Editor.css';

function CustomEditor() {
  const editorRef = useRef(null);
  const [activeActions, setActiveActions] = useState([]);

  const handleAction = (action) => {
    editorRef.current.focus();
    document.execCommand(action, false, null);

    // Update the active actions state
    if (!activeActions.includes(action)) {
      setActiveActions([...activeActions, action]);
    } else {
      setActiveActions(activeActions.filter(item => item !== action));
    }
  };

  const isActionActive = (action) => activeActions.includes(action);

  const memoizedButtons = useMemo(() => (
    <div className="toolbar">
      <button
        className={isActionActive('bold') ? 'active-action' : ''}
        onClick={() => handleAction('bold')}
      >
        <FaBold />
      </button>
      <button
        className={isActionActive('italic') ? 'active-action' : ''}
        onClick={() => handleAction('italic')}
      >
        <FaItalic />
      </button>
      <button
        className={isActionActive('underline') ? 'active-action' : ''}
        onClick={() => handleAction('underline')}
      >
        <FaUnderline />
      </button>
      <button
        className={isActionActive('justifyleft') ? 'active-action' : ''}
        onClick={() => handleAction('justifyleft')}
      >
        <FaAlignLeft />
      </button>
      <button
        className={isActionActive('justifyright') ? 'active-action' : ''}
        onClick={() => handleAction('justifyright')}
      >
        <FaAlignRight />
      </button>
      <button onClick={() => handleAction('undo')}>
        <FaUndo />
      </button>
      <button onClick={() => handleAction('redo')}>
        <FaRedo />
      </button>
    </div>
  ), [activeActions]);

  return (
    <div className="text-editor">
      {memoizedButtons}
      <div
        ref={editorRef}
        contentEditable={true}
        className="editor"
      />
    </div>
  );
}

export default CustomEditor;
