import React from 'react';
import { faPaperPlane, faTimes, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chronoLogo from "../../assets/pictures/Apps-Colissimo.jpeg"
import mondialRelay from "../../assets/pictures/mondial-relay.jpeg"

const TableRow = ({ items, handleSelection }) => {

  const linesToDisplay = items.map((item) => {
    item.printed = false;
    item.selected = false;
    return(
      <tr key={item.id} className="text-center">
        <td>
          <input type='checkbox' id={item.id} value={item.selected} onClick={(e) => {handleSelection(e)}} />
        </td>
        <td className="tmp-table-td">{item.id}</td>
        <td className="tmp-table-td">{new Date(item.created_at).toLocaleDateString()}</td>
        <td className="tmp-table-td">
          <div className="flex align-middle justify-around">
            <img className="w-10 h-10" src={item.delivery === 'home' ? chronoLogo : mondialRelay} alt="logo transporteur" />
            <p className="my-auto">{item.delivery === 'home' ? "Colissimo" : "Mondial Relay"}</p>
          </div>
        </td>
        <td className="tmp-table-td">{item.printed ? <FontAwesomeIcon icon={faPrint} color="green" /> : <FontAwesomeIcon icon={faTimes} color='red' /> }</td>
        <td className="tmp-table-td">{item.sent ? <FontAwesomeIcon icon={faPaperPlane} color="green" /> : <FontAwesomeIcon icon={faTimes} color='red' /> }</td>
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
