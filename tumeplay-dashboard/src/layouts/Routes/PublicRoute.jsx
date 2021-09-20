import React, {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import AppContext from "../../AppContext";
import RoutesWithLayout from "../RoutesWithLayout";

const PublicRoute = (props) => {
    const context = useContext(AppContext)
    const { role, isAuthenticated } = context
    if (role && isAuthenticated) return <Redirect to='/orders/box/1' />
    return (
        <RoutesWithLayout {...props}/>
    )
}

export default PublicRoute;
