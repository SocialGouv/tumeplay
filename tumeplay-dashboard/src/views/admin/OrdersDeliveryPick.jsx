import React, {useState, useEffect, useContext} from 'react'
import Table from '../../components/Table'
import OrdersAPI from '../../services/api/orders'
import AppContext from '../../AppContext';
import { useHistory } from 'react-router'
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Dropdown from "react-dropdown";
import ConfirmModal from '../../components/ui/ConfirmModal';
import UserDataModal from '../../components/ui/UserDataModal';
import UpdateOrderContentModal from '../../components/ui/UpdateOrderContentModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPen, faUndo, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import getAllBoxes from "../../services/api/boxes.js";
import ReferentAPI from "../../services/api/referents.js";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const OrdersLogistics = () => {
  const context = useContext(AppContext)
  const {token, user} = context

	const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentOrder, setCurrentOrder] = useState({})
  const [numberPerPage, setNumberPerPage] = useState(50)
  const [pageItems, setPageItems] = useState([])
  const [orders, setOrders] = useState([])
  const [tmpSelectedItems, setTmpSelectedItems] = useState([])
  const [boxes, setBoxes] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [showUserData, setShowUserData] = useState(false)
  const [showUpdateOrderContent, setShowUpdateOrderContent] = useState(false)

  const dataToDisplay = {
    headers: [
     {name: "ID", fieldName: 'id'},
     {name: "Date", fieldName: 'created_at' },
     {name: "Prénom", fieldName: 'first_name' },
     {name: "Box", fieldName: 'box_name' },
     {name: "Référent", fieldName: 'referent_name'},
     {name: "Actions", fieldName: 'actions'}
    ],
    items: pageItems
  }

  const dropdownOptions = ['5', '10', '50', '100', {value: orders.length, label: 'Tout'}]

	const updateOrderReferent = async (order) => {
		order.referent = user.referent;
		await OrdersAPI.update(token, order)
    retrieveOrders({
      referent_ne: user.referent
    });
	}
	
  const retrieveOrders = async (params) => {
    let response = await OrdersAPI.countDeliveryOrders(token, params);
    setCount(response.data)
    
		response = await OrdersAPI.getDeliveryOrders(
			token, 
			Object.assign({
				_limit: numberPerPage,
				_start: numberPerPage * (currentPage - 1)
			}, params)
		)
    let orders = response.data
    orders.map(order => {
      order.selected = false
			order.box_name = order.content[0].__component === 'commandes.box' ? order.content[0].box.title : 'Box sur mesure'
			order.referent_name = order.referent.name
			order.actions = (
				<div className="tmp-table-actions">
					<button onClick={() => {
						confirmAlert({
							title: 'Confirmation',
							message: `Êtes vous sûr de vouloir reprendre la commande ${order.id} ?`,
							buttons: [
								{
									label: 'Oui',
									onClick: () => updateOrderReferent(order)
								},
								{
									label: 'Non'
								}
							]
						});
					}} className="tmp-button">
						<FontAwesomeIcon icon={faUndo} color="white" className="mr-2" /> Récupérer la commande
					</button>
				</div>
			)
    })
    setOrders(orders)
  }

	const retrieveBoxes = async () => {
		let response = await ReferentAPI.findOne(token, {id: user.referent})
		const referent = response.data
		response = await getAllBoxes(token, referent.environnement.slug)
    setBoxes(response.data)
  }

  const handleChangeNumPerPage = (e) => {
    setTmpSelectedItems([])
    setNumberPerPage(parseInt(e.value))
  }

  const handleSelectAll = (e) => {
    if(e.target.checked) {
      orders.forEach(order => order.selected = e.target.checked)
      setTmpSelectedItems([...orders])
    } else {
			orders.forEach(order => order.selected = e.target.checked)
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

	const handleSendClick = async (e) => {
    e.preventDefault()
    let ordersToSend = tmpSelectedItems.map(item => {
      item.received = true;
      item.date_received = new Date()
      return item
    })
    const res = await OrdersAPI.bulkUpdate(token, ordersToSend)
    if (res.status === 200) {
      setShowConfirm(true)
    }
  }

  useEffect(() => {
    retrieveBoxes()
    retrieveOrders({
      referent_ne: user.referent
    })
   }, [])


	useEffect(() => {
		const offset = (currentPage - 1) * numberPerPage;
		let tmpFiltered = orders.slice(offset, offset + numberPerPage)
		setPageItems([...tmpFiltered])
		setTmpSelectedItems([])
  }, [orders, currentPage, numberPerPage])
	
	return(
		<>
			<div className="px-4 relative">
				<div className="text-white text-sm uppercase hidden lg:inline-block font-semibold mb-8">
					Vos commandes
				</div>
				<div className={`fixed ${showConfirm ? "block" : "hidden"} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50`}
				>
					{showConfirm &&
						<ConfirmModal setShow={setShowConfirm} />
					}
				</div>
				<div className={`fixed ${showUserData ? "block" : "hidden"} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50`}
				>
					{
						showUserData  &&
						<UserDataModal closeModal={() => {
							setShowUserData(false)
							retrieveOrders({
								referent_ne: user.referent
							})
						}} boxes={boxes} order={currentOrder} />
					}
				</div>
				<div className={`fixed ${showUpdateOrderContent ? "block" : "hidden"} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50`}
				>
					{
						showUpdateOrderContent  &&
						<UpdateOrderContentModal closeModal={() => {
							setShowUpdateOrderContent(false)
							retrieveOrders({
								referent_ne: user.referent
							})
						}} boxes={boxes} order={currentOrder} />
					}
				</div>
				<Table  dataToDisplay={dataToDisplay}
								handleSpecificSelection={handleSpecificSelection}
								handleSelectAll={handleSelectAll}
								title="Les commandes des autres référents"  />
				<div className="tmp-pagination-container">
					<Pagination
						currentPage={currentPage}
						totalSize={count}
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
