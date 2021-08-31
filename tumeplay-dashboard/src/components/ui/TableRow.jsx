import React from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chronoLogo from "../../assets/pictures/Apps-Colissimo.jpeg"
import mondialRelay from "../../assets/pictures/mondial-relay.jpeg"

const TableRow = (props) => {
  const { items } = props;

  const linesToDisplay = items.map((item) => {
    item.printed = false;
    item.selected = false;
    return(
      <tr key={item.id} className="text-center">
        <td>
          <input type='checkbox' value={item.isSelected} />
        </td>
        <td className="tmp-table-td">{item.id}</td>
        <td className="tmp-table-td">{new Date(item.created_at).toLocaleDateString()}</td>
        <td className="tmp-table-td">
          <div className="flex align-middle justify-around">
            <img className="w-10 h-10" src={item.delivery === 'home' ? chronoLogo : mondialRelay} alt="logo transporteur" />
            <p className="my-auto">{item.delivery === 'home' ? "Colissimo" : "Mondial Relay"}</p>
          </div>
          </td>
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
