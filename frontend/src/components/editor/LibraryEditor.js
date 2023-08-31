import { useCallback, useEffect, useState } from "react"
import { useQuill } from 'react-quilljs';
import "quill/dist/quill.snow.css"

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function LibraryEditor({ content = "", updateContent }) {
  const { quill, quillRef, Quill } = useQuill({
    theme: "snow",
    modules: { toolbar: TOOLBAR_OPTIONS },
  });

  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = content
      quill.on('text-change', (delta, oldContents) => {
        console.log('text', quill.getText());
        updateContent(quill.root.innerHTML)
      });
    }
  }, [quill, Quill]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};