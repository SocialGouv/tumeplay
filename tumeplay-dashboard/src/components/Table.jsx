import React, {useEffect, useState} from 'react';
import TableRow from './ui/TableRow';

const Table = ({items, titles, numberPerPage, handleSelection}) => {

  const titlesToDisplay = titles.map((title,index) => {
    return(
      <th key={index} className="tmp-table-th">
        {title}
      </th>
    )
  })

  return (
     <div className="tmp-table-container shadow-md rounded-xl">
          <table className="tmp-table-ext items-center w-full ">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-white border-solid py-3 text-sm uppercase whitespace-nowrap font-semibold text-center text-white bg-lightBlue-700">
                  <input type='checkbox' />
                </th>
                {titlesToDisplay}
              </tr>
            </thead>
            <tbody>
              <TableRow items={items} numberPerPage={numberPerPage} handleSelection={handleSelection} />
            </tbody>
          </table>
      </div>
  )
}

export default Table;
