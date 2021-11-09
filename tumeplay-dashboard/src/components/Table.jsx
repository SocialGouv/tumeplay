import React from 'react';
import { faPaperPlane, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chronoLogo from "../assets/pictures/colissimo.png"
import mondialRelay from "../assets/pictures/mondial-relay.png"

const Table = ({dataToDisplay, handleSpecificSelection, handleSelectAll, title, checked, search}) => {

  const titlesToDisplay = dataToDisplay.headers.map((item,index) => {
    return(
      <th key={index} className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-80">
        {item.name}
      </th>
    )
  })

  const formatDisplay = (item, fieldName) => {
    if (fieldName === "created_at" || fieldName === "date_sent" || fieldName === "date_received") {
      item = new Date(item).toLocaleDateString()
    }
    if (fieldName === "delivery") {
      return(
        <div className="flex items-center">
          <img className="h-6" src={item === 'home' || item === 'referent' ? chronoLogo : mondialRelay} alt="logo transporteur" />
        </div>
      )
    }
    if (fieldName === 'sent' || fieldName === 'received') {
      return (
				item ?
					<>
						<FontAwesomeIcon icon={faPaperPlane} color="green" />
						<span className="ml-2">{fieldName === 'sent' && 'Commande traitée'}{fieldName === 'received' && 'Distribuée'}</span>
					</>
					:
					<>
						<FontAwesomeIcon icon={faTimes} color='red' />
						<span className="ml-2">{fieldName === 'sent' && 'Commande non traitée'}{fieldName === 'received' && 'Non distribuée'}</span>
					</>
			)
    }
    return item
  }

  const Rows = dataToDisplay.items.map((item) => {
    return(
      <tr key={item.id}>
        <td className="text-center">
         <input type='checkbox' id={item.id} value={item.selected} checked={item.selected} onChange={(e) => {handleSpecificSelection(e)}} />
      	</td>
        {dataToDisplay.headers.map((h, i) => {
          return(
            <td key={i} className="tmp-table-td">
              {formatDisplay(item[h.fieldName], h.fieldName)}
            </td>  )
        })}
      </tr>
    )
  })

	const horizontalScroll = (event) => {
		const delta = Math.max(-1, Math.min(1, (event.nativeEvent.wheelDelta || -event.nativeEvent.detail)))
		event.currentTarget.scrollLeft -= (delta * 100)
	}

  return (
		<div className="tmp-table-container shadow-md flex flex-col bg-white">
			<div className="flex flex-wrap justify-between items-center pl-8">
				<h3 class="font-semibold text-lg text-blueGray-700">{title}</h3>
				{
					search && (
						<div className="pr-8">
							<div className="relative">
								<input 	type="text" placeholder="Recherche..."
												onChange={(e) => search(e.target.value)}
												className="border-0 px-3 pr-9 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								/>
								<FontAwesomeIcon icon={faSearch} color="lightGray" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
							</div>
						</div>
					)
				}
			</div>
			<div className="overflow-x-scroll" onWheel={horizontalScroll}>
				<table className="tmp-table-ext items-center w-full ">
					<thead>
						<tr>
							<th className="w-20 px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-80">
								<input type='checkbox' id="all" checked={checked} onClick={(e) =>{handleSelectAll(e)}}/>
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
			</div>
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
