import React, { useState } from 'react';
import './app.scss';
import TableView from './table-view/table-view.component';

function App() {
  const [fileContents, setFileContents] = useState('')
  const [filterTimer, setFilterTimer] = useState(null)
  const [filter, setFilters] = useState({
    delimiter: ',',
    lines: 2
  })

  const handleOnDragOver = (e) => {
    e.preventDefault()
    e.target.classList.add('hover')
  }

  const handleDragLeave = (e) => {
    e.target.classList.remove('hover')
  }

  const readFile = (file) => {
    const formData = new FormData()
    formData.set('file', file)
    
    fetch('/api/file-upload', {
      method: 'POST',
      body: formData
    })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      setFileContents(res.data.split('\n'))
    })
    .catch(err => console.log(err))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      readFile(file)
    }
  }

  const handleOnDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files[0]) {
      readFile(e.dataTransfer.files[0])
    } 
  }

  const handleFiltersChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (filterTimer) {
      clearTimeout(filterTimer)
    }
    const timer = setTimeout(() => {
      setFilters({...filter, [name]: value})
    }, 600)
    setFilterTimer(timer)
  }

  return (
    <div className="main-container">
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
      <div className='filters-wrapper'>
        <div className='delimiter-wrapper'>
          <div className='label'>Delimiter</div>
          <input onChange={handleFiltersChange} name='delimiter' className='filter-input' defaultValue={filter.delimiter} />
        </div>
        <div className='lines-wrapper'>
          <div className='label'>Lines</div>
          <input onChange={handleFiltersChange} name='lines' className='filter-input' defaultValue={filter.lines} />
        </div>
      </div>
      {
        fileContents && <TableView filters={filter} fileContents={fileContents} />
      }
    </div>
  );
}

export default App;
