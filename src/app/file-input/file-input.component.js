import React from 'react';
import './file-input.component.scss'

function FileInput(props) {
  const { readFile } = props

  const handleOnDragOver = (e) => {
    e.preventDefault()
    e.target.classList.add('hover')
  }

  const handleDragLeave = (e) => {
    e.target.classList.remove('hover')
  }

  const handleOnDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files[0]) {
      readFile(e.dataTransfer.files[0])
      e.dataTransfer.value = ''
    } 
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      readFile(file)
      e.target.value = ''
    }
  }

  return (
    <div>
      <label
        onDragOver={handleOnDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleOnDrop}
        className='file-upload-input-wrapper input-lable'
        htmlFor='input-file'
      >
        Drop / Click to select files to parse
      </label>
      <input className='input' id='input-file' onChange={handleFileUpload} type="file" required />
    </div>
  );
}

export default FileInput;
