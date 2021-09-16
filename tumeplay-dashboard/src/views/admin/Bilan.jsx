import React, {useState, useEffect, useContext} from 'react'
import AppContext from '../../AppContext';
import Table from '../../components/Table';
import OrdersAPI from '../../services/api/orders';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from "react-csv";


const Bilan = () => {

  // 1. Retrieve les orders traitées par jour sent===true et date_sent === currentDate OK
  // 2. Mettre en place un date picker OK
  // 3. Update la table en fonction de la date selectionnée OK
  // 4. Bouton pour générer un CSV ou PDF à la volée

  const [dailyOrders, setDailyOrders] = useState([])
  const [tmpSelected, setTmpSelected] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())


  const {token} = useContext(AppContext)

  const retriveOrdersByDate = async (params) => {
    const res = await OrdersAPI.getOrders(token, params)
    let tmpOrders = res.data;
    tmpOrders.map(o => {
      o.selected = false
      o.box_num = o.content[0].box.number
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

  const dataToDisplay = {
    headers: [
     {name: "Date", fieldName: 'date_sent'},
     {name: "Id", fieldName: 'id' },
     {name: "Box", fieldName: "box_num"},
     {name: "Transporteur", fieldName: 'delivery'}
    ],
    items: dailyOrders
  }

  const csvHeaders = [
    {label: "Id", key: 'id'},
    {label: "Date de traitement", key: 'date_sent'},
    {label: "Numéro de boite", key: 'box_num'},
    {label: "Transporteur", key: 'delivery'},
  ]

  const csvData = tmpSelected.map(o => {
    let tmpOrder = {};
    tmpOrder['id'] = o.id;
    tmpOrder['date_sent'] = o.date_sent;
    tmpOrder['box_num'] = o.content[0].box.number;
    tmpOrder['delivery'] = o.delivery === "home" ? "Colissimo" : "Mondial Relay";
    return tmpOrder
  })

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
      <Table dataToDisplay={dataToDisplay}
             handleSpecificSelection={handleSpecificSelection}
             handleSelectAll={handleSelectAll}
       />
      {tmpSelected.length > 0 ?
        <CSVLink data={csvData}
                 headers={csvHeaders}
                 filename={`Export-${new Date().toLocaleDateString()}`}
                 className="tmp-csv-button">
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
