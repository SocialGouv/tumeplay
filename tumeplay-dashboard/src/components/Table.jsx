import React from 'react'
import TableRow from './ui/TableRow'


const Table = ({items, color, titles}) => {

  const titlesToDisplay = titles.map(title => {
    return(
      <th className={
        `px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ${color === "blue" ?
          'text-white bg-lightBlue-800 border-lightBlue-700'
          :
          'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
        }`}>
        {title}
      </th>
    )
  })

  return (
     <div className="tmp-table-container">
          <table className="items-center w-full tmp-table-ext">
            <thead>
              <tr>
                {titlesToDisplay}
              </tr>
            </thead>
            <tbody>
              <TableRow items={items} />
            </tbody>
          </table>
      </div>
  )
}

export default Table;
