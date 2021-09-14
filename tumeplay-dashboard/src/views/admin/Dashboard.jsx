import React, {useState, useEffect, useContext} from 'react'
import Table from '../../components/Table'
import OrdersAPI from '../../services/api/orders'
import AppContext from '../../AppContext';
import { useHistory } from 'react-router'
import getAllBoxes from "../../services/api/boxes.js";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPrint } from '@fortawesome/free-solid-svg-icons';
import Dropdown from "react-dropdown";
import Switch from 'react-switch'


const Dashboard = () => {

  const history = useHistory();

  const context = useContext(AppContext)
  const token = context.token
  const [viewAll, setViewAll] = useState(false)
  const [boxes, setBoxes] = useState([])
  const [fullOrders, setFullOrders] = useState([])
  const [filteredorders, setFilteredOrders] = useState([])
  const [pageItems, setPageItems] = useState([])
  const [openTab, setOpenTab] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [numberPerPage, setNumberPerPage] = useState(10)
  const [tmpSelectedItems, setTmpSelectedItems] = useState([])

  const retrieveBoxes = async () => {
    let response = await getAllBoxes(token)
    setBoxes(response.data)
  }

  const handleChangeBox = (num) => {
    const tmpFilterOrders =  fullOrders.filter(order => {
        return(order.content[0].box.number === num)
    })
    setFilteredOrders(tmpFilterOrders)
  }

  const retrieveOrders = async (params) => {
    let response = await OrdersAPI.getOrders(token, params)
    let orders = response.data
    orders.map(order => {
      order.selected = false
    })
    setFullOrders(orders)
  }

  const handleChangeTab = (event, box_number) => {
    event.preventDefault()
    setOpenTab(box_number)
    history.push(`/orders/box/${box_number}`)
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
    let order = filteredorders.find(order => order.id === parseInt(e.target.id))
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
      item.date_sent = new Date().getTime()
      return item
    })
    await OrdersAPI.setOrdersToSent(token, ordersToSend)
  }

  const displayAllOrders = () => {
    setViewAll(!viewAll)
  }

  useEffect(() => {
    if (viewAll === true) {
      retrieveOrders(' ')
    } else {
      retrieveOrders('&sent_ne=true')
    }
  }, [viewAll])

  const handleChangeNumPerPage = (e) => {
    setTmpSelectedItems([])
    setNumberPerPage(parseInt(e.value))
  }

  useEffect(() => {
    retrieveBoxes()
    retrieveOrders('&sent_ne=true')
    setOpenTab(1)
   }, [])


  useEffect(() => {
    handleChangeBox(openTab)
  }, [fullOrders, openTab])

  const onPageChange = (event) => {
    setCurrentPage(event)
  }

  useEffect(() => {
    const offset = (currentPage - 1) * numberPerPage;
    let tmpFiltered = filteredorders.slice(offset, offset + numberPerPage)
    setPageItems([...tmpFiltered])
    setTmpSelectedItems([])
  }, [filteredorders, currentPage, numberPerPage])

  const renderTabs = boxes.map((box) => {
    return(
      <div key={box.id} className="flex flex-wrap">
        <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <button cursor='pointer' className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === box.number
                    ? "text-white bg-lightBlue-600"
                    : "text-lightBlue-600 bg-white")
                }
                onClick={(event) => handleChangeTab(event, box.number)}
                >
                  {box.title}
                </button>
              </li>
            </ul>
        </div>
      </div>
    )
  })

  const tabletitles = ["ID", "Date", "Transporteur", "Statut Traitement"]
  const dropdownOptions = ['5', '10', '50', '100', {value: filteredorders.length, label: 'Tout'}]

  return(
     <div className="container mt-10 px-4 mx-auto relative">
        <div className="tmp-tabs-container">
          {renderTabs}
        </div>
        <div className="tmp-top-buttons-container">
          <button className="tmp-top-buttons" disabled={tmpSelectedItems.length === 0} onClick={(e) => {handlePrintClick(e)}}>
            <FontAwesomeIcon icon={faPrint} color="white" />
          </button>
            <button className="tmp-top-buttons" disabled={tmpSelectedItems.length === 0} onClick={(e) => {handleSendClick(e)}}>
            <FontAwesomeIcon icon={faPaperPlane} color="white" />
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
        <Table items={pageItems}
               titles={tabletitles}
               numberPerPage={numberPerPage}
               handleSpecificSelection={handleSpecificSelection}
               handleSelectAll={handleSelectAll}  />
        <div className="tmp-bottom-buttons-container">
          <button className="tmp-bottom-buttons" disabled={tmpSelectedItems.length === 0} onClick={(e) => {handlePrintClick(e)}}>
            <FontAwesomeIcon icon={faPrint} color="white" />
          </button>
            <button className="tmp-bottom-buttons" disabled={tmpSelectedItems.length === 0} onClick={(e) => {handleSendClick(e)}}>
            <FontAwesomeIcon icon={faPaperPlane} color="white" />
          </button>
        </div>
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
  )
}

export default Dashboard
