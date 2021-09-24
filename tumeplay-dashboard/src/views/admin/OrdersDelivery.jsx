import React, {useState, useEffect, useContext} from 'react'
import Table from '../../components/Table'
import OrdersAPI from '../../services/api/orders'
import AppContext from '../../AppContext';
import { useHistory } from 'react-router'
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Dropdown from "react-dropdown";
import getAllBoxes from "../../services/api/boxes.js";



const OrdersLogistics = () => {
  const context = useContext(AppContext)
  const token = context.token

  const [filteredorders, setFilteredOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [numberPerPage, setNumberPerPage] = useState(50)
  const [pageItems, setPageItems] = useState([])
  const [orders, setOrders] = useState([])
  const [tmpSelectedItems, setTmpSelectedItems] = useState([])
  const [boxes, setBoxes] = useState([])

  const dataToDisplay = {
    headers: [
     {name: "ID", fieldName: 'id'},
     {name: "Date", fieldName: 'created_at' },
     {name: "Prénom", fieldName: 'first_name' },
     {name: "Transporteur", fieldName: 'delivery'},
     {name: "Statut Traitement", fieldName: 'sent'}
    ],
    items: pageItems
  }

  const dropdownOptions = ['5', '10', '50', '100', {value: orders.length, label: 'Tout'}]

  const retrieveOrders = async (params) => {
    let response = await OrdersAPI.getDeliveryOrders(token, params)
    let orders = response.data
    orders.map(order => {
      order.selected = false
    })
    setOrders(orders)
  }

  const retrieveBoxes = async () => {
    let response = await getAllBoxes(token)
    setBoxes(response.data)
  }

  const handleChangeNumPerPage = (e) => {
    setTmpSelectedItems([])
    setNumberPerPage(parseInt(e.value))
  }

  const handleSelectAll = (e) => {
    if(e.target.checked) {
      filteredorders.forEach(order => order.selected = e.target.checked)
      setTmpSelectedItems([...filteredorders])
    } else {
       filteredorders.forEach(order => order.selected = e.target.checked)
      setTmpSelectedItems([])
    }
  }

  const handleSpecificSelection = (e) => {
    let order = orders.find(order => order.id === parseInt(e.target.id))
    if(e.target.checked) {
      order.selected = e.target.checked
      tmpSelectedItems.push(order)
      setTmpSelectedItems([...tmpSelectedItems])
    } else {
      order.selected = false
      let array = tmpSelectedItems.filter(item => item.id !== order.id);
      setTmpSelectedItems([...array])
    }
  }

  const onPageChange = (event) => {
    setCurrentPage(event)
  }

  useEffect(() => {
    retrieveBoxes()
    retrieveOrders('&sent_ne=true')
   }, [])
	
	return(
		<>
			<div className="px-4 relative">
				<div className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
					Vos commandes
				</div>
				<div className="tmp-table-option">
					<div className="tmp-dropdown-container" >
						<Dropdown className='tmp-dropdown' menuClassName="tmp-dropdown-menu" options={dropdownOptions} onChange={(e) => handleChangeNumPerPage(e)} value={numberPerPage.toString()} />
					</div>
				</div>
				<Table  dataToDisplay={dataToDisplay}
								handleSpecificSelection={handleSpecificSelection}
								handleSelectAll={handleSelectAll}
								title="Les commandes à traiter"  />
				<div className="tmp-pagination-container">
					<Pagination
						currentPage={currentPage}
						totalSize={filteredorders.length}
						sizePerPage={numberPerPage}
						numberOfPagesNextToActivePage={3}
						changeCurrentPage={(event) => onPageChange(event)}
						theme="border-bottom"
					/>
				</div>
			</div>
		</>
		)
}

export default OrdersLogistics
