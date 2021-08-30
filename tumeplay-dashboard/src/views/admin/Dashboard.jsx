import React, {useState, useEffect, useContext} from 'react'
import Table from '../../components/Table'
import OrdersAPI from '../../services/api/orders'
import AppContext from '../../AppContext';
import { useHistory } from 'react-router'
import getAllBoxes from "../../services/api/boxes.js";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";


const Dashboard = () => {

  const history = useHistory();

  const context = useContext(AppContext)
  const token = context.token
  const [boxes, setBoxes] = useState([])
  const [fullOrders, setFullOrders] = useState([])
  const [countOrders, setCountOrders] = useState(1)
  const [filteredorders, setFilteredOrders] = useState([])
  const [openTab, setOpenTab] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [numberPerPage, setNumberPerPage] = useState(5)


  const retrieveBoxes = async () => {
    let response = await getAllBoxes(token)
    setBoxes(response.data)
  }

  const handleChangeBox = (num) => {
    const tmpFilterOrders =  fullOrders.filter(order => {
        return(order.content[0].box.number === num)
    })
    setFilteredOrders(tmpFilterOrders)
    setCountOrders(tmpFilterOrders.length)
  }

  const retrieveOrders = async () => {
    let response = await OrdersAPI.getOrders(token)
    setFullOrders(response.data)
    // response = await OrdersAPI.countOrders(token)
    // setCountOrders(response.data)
  }

  const handleChangeTab = (event, box_number) => {
    event.preventDefault()
    setOpenTab(box_number)
    history.push(`/orders/box/${box_number}`)
  }

  useEffect(() => {
    retrieveBoxes()
    retrieveOrders()
    setOpenTab(1)
   }, [])


  useEffect(() => {
    handleChangeBox(openTab)
  }, [fullOrders, openTab])

  const onPageChange = (event) => {
    const offset = (currentPage - 1) * filteredorders.length;
    let tmpFiltered = filteredorders.slice(offset, offset + numberPerPage)
    setCurrentPage(event)
    setFilteredOrders(tmpFiltered)
  }
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

  const tabletitles = ["ID", "Date", "Transporteur", "Statut impression", "Statut Envoi"]

  return(
     <div className="container mt-10 px-4 mx-auto relative">
        <div className="w-full flex justify-around mb-12 px-4">
          {renderTabs}
        </div>
        <Table items={filteredorders} titles={tabletitles} numberPerPage={numberPerPage}  />
        <div className="absolute text-lg my-2 right-14">
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
