import React from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableRow = (props) => {
  const { items, numberPerPage } = props;

  const linesToDisplay = items.map((item) => {
    item.printed = false;
    return(
      <tr key={item.id} className="text-center">
        <td>
          <input type='checkbox' />
        </td>
        <td className="tmp-table-td">{item.id}</td>
        <td className="tmp-table-td">{new Date(item.created_at).toLocaleDateString()}</td>
        <td className="tmp-table-td">{item.delivery === 'home' ? "Colissimo" : "Mondial Relay"}</td>
        <td className="tmp-table-td">{item.printed ? <FontAwesomeIcon icon={faCheck} color="green" /> : <FontAwesomeIcon icon={faTimes} color='red' /> }</td>
        <td className="tmp-table-td">{item.printed ? <FontAwesomeIcon icon={faCheck} color="green" /> : <FontAwesomeIcon icon={faTimes} color='red' /> }</td>
      </tr>
    )
  })

  return(
    <>
      {linesToDisplay}
    </>
  )
}

export default TableRow;
