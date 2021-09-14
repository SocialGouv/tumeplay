import React, {useState, useEffect, useContext} from 'react'
import AppContext from '../../AppContext';
import Table from '../../components/Table';
import OrdersAPI from '../../services/api/orders';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



const Bilan = () => {

  // 1. Retrieve les orders traitées par jour sent===true et date_sent === currentDate
  // 2. Mettre en place un date picker
  // 3. Update la table en fonction de la date selectionnée
  // 4. Bouton pour générer un CSV ou PDF à la volée

  const [dailyOrders, setDailyOrders] = useState([])
  const [numberPerPage,setNumberPerPage] = useState(5)
  const [currentDate, setCurrentDate] = useState(new Date())
  const {token} = useContext(AppContext)

  console.log(dailyOrders)

  const retriveOrdersByDate = async (params) => {
    const res = await OrdersAPI.getOrders(token, params)
    setDailyOrders([...res.data])
  }

  useEffect(() => {
    retriveOrdersByDate(`&date_sent=${(currentDate.toISOString().split('T', 1).toString())}`)
  },[currentDate])

  const handleSpecificSelection = (e) => {
    console.log(e)
  }

  const handleSelectAll = (e) => {
    console.log(e)
  }

  const boxpath = 'content[0]'

  const dataToDisplay = {
    headers: [
     {name: "Date", fieldName: 'date_sent'},
     {name: "Id", fieldName: 'id' },
     {name: "Box", fieldName: boxpath},
     {name: "Transporteur", fieldName: 'delivery'}
    ],
    items: dailyOrders
  }

  return(
    <div className="container mt-10 px-4 mx-auto relative">
      <div className="my-3">
        <DatePicker selected={currentDate}
                    onChange={(date) => setCurrentDate(date)}
        />
      </div>
      <Table dataToDisplay={dataToDisplay}
             numberPerPage={numberPerPage}
             handleSpecificSelection={handleSpecificSelection}
             handleSelectAll={handleSelectAll} />
    </div>
  )
}

export default Bilan;
