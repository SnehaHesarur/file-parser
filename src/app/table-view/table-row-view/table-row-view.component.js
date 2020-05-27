import React, { useState, useEffect } from 'react';
import './table-row-view.component.scss';

function TableRowView(props) {
  const { rowInfo } = props
  const [rowItems, setRowItems] = useState([])

  useEffect(() => {
    if (rowInfo) {
      const data = rowInfo || []
      let length = data.length
      while (length < 4) {
        data.push('')
        length++
      }
      setRowItems(data)
    }
  }, [rowInfo])

  return (
    <div className="table-row-wrapper">
      {rowItems.map((item, index) => {
        return (
          <div key={index} className='row-item'>{item}</div>
        )
      })}
    </div>
  );
}

export default TableRowView;
