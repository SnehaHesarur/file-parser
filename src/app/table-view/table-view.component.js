import React from 'react';
import TableRowView from './table-row-view/table-row-view.component'
import './table-view.component.scss'

function TableView(props) {
  const { fileContents, filters } = props

  return (
    <div className="table-wrapper">
      {
        fileContents && Number(filters.lines) >= 1 &&
          fileContents.slice(0, filters.lines).map((line, index) => {
            return <TableRowView key={index} rowInfo={filters.delimiter ? line.split(filters.delimiter) : [line]} index={index} />
          })
      }
    </div>
  );
}

export default TableView;
