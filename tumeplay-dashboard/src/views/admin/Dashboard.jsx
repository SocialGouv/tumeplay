import React, {useState, useEffect, useContext} from 'react'
import Table from '../../components/Table'
import OrdersAPI from '../../services/api/orders'
import AppContext from '../../AppContext';
import { useHistory } from 'react-router'
import getAllBoxes from "../../services/api/boxes.js";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPrint, faChartBar, faHourglass, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Dropdown from "react-dropdown";
import Switch from 'react-switch'
import ConfirmModal from '../../components/ui/ConfirmModal';
import ReactTooltip from 'react-tooltip';


const Dashboard = () => {

  const history = useHistory();

  const context = useContext(AppContext)
  const token = context.token
  const [viewAll, setViewAll] = useState(false)
  const [boxes, setBoxes] = useState([])
  const [orders, setOrders] = useState([])
  const [openTab, setOpenTab] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState()
  const [numberPerPage, setNumberPerPage] = useState(50)
  const [tmpSelectedItems, setTmpSelectedItems] = useState([])
  const [show, setShow] = useState(false)
	const [kpisData, setKpisData] = useState([
		{
			title: 'Commandes en attente',
			value: '...',
			color: 'green-500',
			icon: faHourglass,
			isPositive: true,
			evolutionValue: '...',
			evolutionWording: 'Depuis hier'
		},
		{
			title: 'Commandes cette semaine',
			value: '...',
			color: 'red-500',
			icon: faChartBar,
			isPositive: true,
			evolutionValue: '...',
			evolutionWording: 'Depuis la semaine dernière'
		},
	])

  const retrieveBoxes = async () => {
    let response = await getAllBoxes(token)
    setBoxes(response.data)
  }

	const retrieveKpisData = async () => {
		let response = await OrdersAPI.countThisWeekOrders(token)
		const thisWeekOrders = response.data;
		response = await OrdersAPI.countLastWeekOrders(token)
		const lastWeekOrders = response.data;
		let evolution = 0
		let evolutionPositive = true
		if (lastWeekOrders < thisWeekOrders) {
			evolution = thisWeekOrders / lastWeekOrders * 100
		} else if (lastWeekOrders > thisWeekOrders) {
			evolution = lastWeekOrders / thisWeekOrders * 100
			evolutionPositive = false
		} else {
			evolution = 0
		}

		response = await OrdersAPI.countPendingOrders(token)
		const pendingOrders = response.data;
		response = await OrdersAPI.countTodayPendingOrders(token)
		const todayPendingOrders = response.data;

		setKpisData([
			{
				title: 'Commandes en attente',
				value: pendingOrders,
				color: 'green-500',
				icon: faHourglass,
				isPositive: true,
				evolutionValue: todayPendingOrders,
				evolutionWording: 'Depuis hier'
			},
			{
				title: 'Commandes cette semaine',
				value: thisWeekOrders,
				color: 'red-500',
				icon: faChartBar,
				isPositive: evolutionPositive,
				evolutionValue: evolution + '%',
				evolutionWording: 'Depuis la semaine dernière'
			},
		])
	}

  const retrieveOrders = async (searchParams) => {
    let response = await OrdersAPI.countOrders(token, searchParams);
    setCount(response.data)
    response = await OrdersAPI.getOrders(token, Object.assign({
      _limit: numberPerPage,
      _start: numberPerPage * (currentPage - 1)
    }, searchParams))
    let orders = response.data
    orders.map(order => {
      order.selected = false
    })
    setOrders(orders)
  }


  const handleChangeTab = (event, box_number) => {
    event.preventDefault()
    setOpenTab(box_number)
    retrieveOrders({sent_ne: true, box_number})
    history.push(`/orders/box/${box_number}`)
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

  const printColissimoSticker = async (items) => {
    const response = await OrdersAPI.printColissimoPDF(token, items)
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = response.data
    a.target= '_blank'
    a.setAttribute("download", 'Colissimo')
    a.click()
    document.body.removeChild(a)
  }

  const printMRStickers = async (items) => {
    const response = await OrdersAPI.printMondialRelayPDF(token, items)
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = response.data
    a.target= '_blank'
    a.setAttribute("download", 'Mondial Relay')
    a.click()
    document.body.removeChild(a)
  }

  const handlePrintClick = (e) => {
    const colissimoItems = tmpSelectedItems.filter(item => item.delivery === "home")
    const mondialRelayItems = tmpSelectedItems.filter(item => item.delivery === "pickup")
    if(colissimoItems.length > 0) {
      const ids = colissimoItems.map((item) => {
        return item.id
      })
      printColissimoSticker(ids)
    }
    if (mondialRelayItems.length > 0) {
      const ids = mondialRelayItems.map((item) => {
        return item.id
      })
        printMRStickers(ids)
    }
  }

  const handleSendClick = async (e) => {
    e.preventDefault()
    let ordersToSend = tmpSelectedItems.map(item => {
      item.sent = true;
      item.date_sent = new Date()
      return item
    })
    const res = await OrdersAPI.setOrdersToSent(token, ordersToSend)
    if (res.status === 200) {
      setShow(true)
    }
  }

  const displayAllOrders = () => {
    setViewAll(!viewAll)
  }

	const getCurentBoxTitle = () => {
		const box = boxes.find((b) => b.number === openTab)
		return box && box.title || ''
	}

  useEffect(() => {
    retrieveOrders(viewAll ? {
      box_number: openTab,
      _sort: 'created_at:DESC',
    } : {
      box_number: openTab,
      sent_ne: true,
      _sort: 'created_at:ASC',
    })
  }, [viewAll])

  const handleChangeNumPerPage = (e) => {
    setTmpSelectedItems([])
    setNumberPerPage(parseInt(e.value))
  }

  useEffect(() => {
		retrieveKpisData()
    retrieveBoxes()
    setOpenTab(1)
   }, [])

  const onPageChange = (event) => {
    setCurrentPage(event)
  }

  useEffect(() => {
    if (openTab)
      retrieveOrders({sent_ne: true, box_number: openTab, _sort: 'created_at:ASC'})
  }, [currentPage, numberPerPage, openTab])

  const renderTabs = () => {
    return(
      <div className="flex flex-wrap">
        <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap mt-4 mb-3 flex-row rounded-xl overflow-hidden"
              role="tablist"
            >
							{
								boxes.map((box) => {
									return (
										<li key={box.id}>
											<button cursor='pointer' className={`text-xs font-bold uppercase px-5 py-3 shadow-lg block leading-normal ${openTab === box.number ? 'bg-indigo-800 text-white' : 'bg-indigo-100 text-blueGray-500'}`}
															onClick={(event) => handleChangeTab(event, box.number)}
											>
												{box.title}
											</button>
										</li>
									)
								})
							}
            </ul>
        </div>
      </div>
    )
	}

	const renderKPIs = () => {
		return(
			<div class="flex flex-wrap -mx-4 mt-4 mb-8">
				{
					kpisData.map((kpi) => {
						return (
							<div class="w-full lg:w-1/4 px-4">
								<div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
									<div class="flex-auto p-4">
											<div class="flex flex-wrap">
												<div class="relative w-full pr-4 max-w-full flex-grow flex-1">
														<h5 class="text-blueGray-400 uppercase font-bold text-xs my-0 mb-2">{kpi.title}</h5>
														<span class="font-semibold text-2xl text-blueGray-700">{kpi.value}</span>
												</div>
												<div class="relative w-auto pl-4 flex-initial">
														<div class={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-${kpi.color}`}>
															<FontAwesomeIcon icon={kpi.icon} color="white" />
														</div>
												</div>
											</div>
											{
												kpi.evolutionWording && (
													<p class="text-sm text-blueGray-400 mt-4 mb-0">
														<span class="text-emerald-500 mr-2">
															<FontAwesomeIcon icon={kpi.isPositive ? faArrowUp : faArrowDown} color={kpi.isPositive ? 'green' : ' red'}/> {kpi.evolutionValue}
														</span>
														<span class="whitespace-nowrap">{kpi.evolutionWording}</span>
													</p>
												)
											}
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}

  const dataToDisplay = {
    headers: [
     {name: "ID", fieldName: 'id'},
     {name: "Date", fieldName: 'created_at' },
     {name: "Prénom", fieldName: 'first_name' },
     {name: "Transporteur", fieldName: 'delivery'},
     {name: "Statut Traitement", fieldName: 'sent'}
    ],
    items: orders
  }

  const dropdownOptions = ['5', '10', '50', '100', {value: orders.length, label: 'Tout'}]

  return(
  <>
    <div className="px-4 relative">
			<ReactTooltip id="print-tooltip" />
			<ReactTooltip id="send-tooltip" />
			<div className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
				Gestion des commandes
			</div>
			<div>
				{renderKPIs()}
			</div>
      <div className={`fixed ${show ? "block" : "hidden"} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50`}
          id="my-modal"
      >
        {show ?
          <ConfirmModal setShow={setShow} />
          :
          <></>
        }
      </div>
      <div className="tmp-tabs-container">
        {renderTabs()}
      </div>
			<div className="tmp-table-option">
				<div className="tmp-top-buttons-container">
					<button className={`tmp-button ${tmpSelectedItems.length === 0 && 'disabled'}`}
									data-for="print-tooltip"
									data-tip={`${tmpSelectedItems.length === 0 ? 'Sélectionnez des commandes afin d\'en imprimer les étiquettes' : ''}`}
									onClick={(e) => {
										if (tmpSelectedItems.length > 0)
											handlePrintClick(e)
									}}>
						<FontAwesomeIcon icon={faPrint} color="white" className="mr-2" /> Imprimer les étiquettes
					</button>
					<button className={`tmp-button ${tmpSelectedItems.length === 0 && 'disabled'}`}
										data-for="send-tooltip"
										data-tip={`${tmpSelectedItems.length === 0 ? 'Sélectionnez des commandes afin de les marquer comme traitées' : ''}`}
										onClick={(e) => {
											if (tmpSelectedItems.length > 0)
												handleSendClick(e)
										}}>
						<FontAwesomeIcon icon={faPaperPlane} color="white" className="mr-2" /> Marquer comme traité
					</button>
				</div>
				<div className='tmp-switch-container'>
					<label className='tmp-switch-label'>
						<p>Voir toutes les commandes</p>
						<Switch className='tmp-switch-input'
										width={35}
										height={16}
										handleDiameter={12}
										checkedIcon={false}
										uncheckedIcon	={false}
										checked={viewAll}
										onChange={displayAllOrders} />
					</label>
				</div>
				<div className="tmp-dropdown-container" >
					<Dropdown className='tmp-dropdown' menuClassName="tmp-dropdown-menu" options={dropdownOptions} onChange={(e) => handleChangeNumPerPage(e)} value={numberPerPage.toString()} />
				</div>
			</div>
      <Table  dataToDisplay={dataToDisplay}
              handleSpecificSelection={handleSpecificSelection}
              handleSelectAll={handleSelectAll}
							title={getCurentBoxTitle()}  />
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

export default Dashboard
