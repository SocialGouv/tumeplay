import React, {useState, useEffect, useContext} from 'react'
import AppContext from '../../AppContext';
import Table from '../../components/Table';
import OrdersAPI from '../../services/api/orders';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "react-pagination-js";
import Dropdown from "react-dropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from "react-csv";


const Bilan = () => {

  // 1. Retrieve les orders traitées par jour sent===true et date_sent === currentDate OK
  // 2. Mettre en place un date picker OK
  // 3. Update la table en fonction de la date selectionnée OK
  // 4. Bouton pour générer un CSV ou PDF à la volée

  const [dailyOrders, setDailyOrders] = useState([])
  const [numberPerPage,setNumberPerPage] = useState(5)
  const [tmpSelected, setTmpSelected] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [pageItems, setPageItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const dropdownOptions = ['5', '10', '50', '100', {value: dailyOrders.length, label: 'Tout'}]


  const {token} = useContext(AppContext)

  const retriveOrdersByDate = async (params) => {
    const res = await OrdersAPI.getOrders(token, params)
    let tmpOrders = res.data;
    tmpOrders.map(o => {
      o.selected = false
    })
    setDailyOrders([...tmpOrders])
  }

  useEffect(() => {
    retriveOrdersByDate(`&date_sent=${(currentDate.toISOString().split('T', 1).toString())}`)
  },[currentDate])

  const handleSpecificSelection = (e) => {
    let order  = dailyOrders.find(o => o.id === parseInt(e.target.id))
    if(e.target.checked) {
      order.selected = e.target.checked
      tmpSelected.push(order)
      setTmpSelected([...tmpSelected])
    } else {
      order.selected = false
      let array = tmpSelected.filter(item => item.id !== order.id);
      setTmpSelected([...array])
    }
  }

  const handleSelectAll = (e) => {
    if(e.target.checked) {
      dailyOrders.forEach(order => order.selected = e.target.checked)
      setTmpSelected([...dailyOrders])
    } else {
       dailyOrders.forEach(order => order.selected = e.target.checked)
      setTmpSelected([])
    }
  }

  const onPageChange = (event) => {
    setCurrentPage(event)
  }

  const handleChangeNumPerPage = (e) => {
    setTmpSelected([])
    setNumberPerPage(parseInt(e.value))
  }

  useEffect(() => {
    const offset = (currentPage - 1) * numberPerPage;
    let tmpFiltered = dailyOrders.slice(offset, offset + numberPerPage)
    console.log('tmpFiltered', tmpFiltered)
    setPageItems([...tmpFiltered])
    setTmpSelected([])
  }, [dailyOrders, currentPage, numberPerPage])

  const boxpath = 'content[0]'

  const dataToDisplay = {
    headers: [
     {name: "Date", fieldName: 'date_sent'},
     {name: "Id", fieldName: 'id' },
     {name: "Box", fieldName: boxpath},
     {name: "Transporteur", fieldName: 'delivery'}
    ],
    items: pageItems
  }


  return(
    <div className="container mt-10 mx-auto relative">
      <div className="my-3">
        <DatePicker className="tmp-date-picker"
                    selected={currentDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setCurrentDate(date)}
                    showPopperArrow={false}
        />
      </div>
       <div className="tmp-dropdown-container" >
        <Dropdown className='tmp-dropdown' menuClassName="tmp-dropdown-menu" options={dropdownOptions} onChange={(e) => handleChangeNumPerPage(e)} value={numberPerPage.toString()} />
      </div>
      <Table dataToDisplay={dataToDisplay}
             handleSpecificSelection={handleSpecificSelection}
             handleSelectAll={handleSelectAll}
       />
       <div className="tmp-pagination-container">
        <Pagination
          currentPage={currentPage}
          totalSize={dailyOrders.length}
          sizePerPage={numberPerPage}
          numberOfPagesNextToActivePage={3}
          changeCurrentPage={(event) => onPageChange(event)}
          theme="border-bottom"
        />
      </div>
      {tmpSelected.length > 0 ?
        <CSVLink data={tmpSelected} className="w-1/5 my-5 flex justify-self-center justify-around bg-lightBlue-700 p-2 rounded-md shadow-md">
          <FontAwesomeIcon icon={faFileExcel} color='white' size="lg" className='mr-2 mt-1'/>
          <p className="text-white my-1">Exporter en CSV</p>
        </CSVLink>
        :
        <></>
      }

    </div>
  )
}

export default Bilan;
