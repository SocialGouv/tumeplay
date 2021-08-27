import React from 'react'

const TableRow = (props) => {
  const { items } = props;

  const linesToDisplay = items.map((item) => {
    return(
      <tr key={item.id} className="text-center">
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-bold flex items-center">{item.id}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">{new Date(item.created_at).toLocaleDateString()}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">{item.delivery === 'home' ? "Colissimo" : "Mondial Relay"}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">{item.sent}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"></td>
      </tr>
    )
  })

  return(
    linesToDisplay
  )
}

export default TableRow;
