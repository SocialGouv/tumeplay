import React from 'react';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chronoLogo from "../assets/pictures/Apps-Colissimo.jpeg"
import mondialRelay from "../assets/pictures/mondial-relay.jpeg"

const Table = ({dataToDisplay, handleSpecificSelection, handleSelectAll}) => {

  const titlesToDisplay = dataToDisplay.headers.map((item,index) => {
    return(
      <th key={index} className="tmp-table-th">
        {item.name}
      </th>
    )
  })

  const formatDisplay = (item, fieldName) => {
    if (fieldName === "created_at" || fieldName === "date_sent") {
      item = new Date(item).toLocaleDateString()
    }
    if (fieldName === "delivery") {
      return(
        <div className="flex align-middle justify-around">
          <img className="w-10 h-10" src={item === 'home' ? chronoLogo : mondialRelay} alt="logo transporteur" />
          <p className="my-auto">{item === 'home' ? "Colissimo" : "Mondial Relay"}</p>
        </div>
      )
    }
    if (fieldName === "sent") {
      return(
        <>{item ? <FontAwesomeIcon icon={faPaperPlane} color="green" /> : <FontAwesomeIcon icon={faTimes} color='red' /> }</>
      )
    }
    return item
  }

  const Rows = dataToDisplay.items.map((item) => {
    return(
      <tr className="text-center">
        <td>
         <input type='checkbox' id={item.id} value={item.selected} checked={item.selected} onChange={(e) => {handleSpecificSelection(e)}} />
      </td>
        {dataToDisplay.headers.map(h => {
          return(
            <td className="tmp-table-td">
              {formatDisplay(item[h.fieldName], h.fieldName)}
            </td>  )
        })}
      </tr>
    )
  })


  return (
     <div className="tmp-table-container shadow-md rounded-xl flex flex-col">
          <table className="tmp-table-ext items-center w-full ">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-white border-solid py-3 text-sm uppercase whitespace-nowrap font-semibold text-center text-white bg-lightBlue-700">
                  <input type='checkbox' id="all" onClick={(e) =>{handleSelectAll(e)}}/>
                </th>
                {titlesToDisplay}
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.items.length > 0 ?
              Rows :
              <></>
              }
            </tbody>
          </table>
          {dataToDisplay.items.length > 0 ?
            <></>
            :
            <div className="text-center py-4 text-lightBlue-800">
              Aucune donnée à afficher
            </div>
          }
      </div>
  )
}

export default Table;
