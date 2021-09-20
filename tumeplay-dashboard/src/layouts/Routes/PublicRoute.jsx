import React, {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import AppContext from "../../AppContext";
import RoutesWithLayout from "../RoutesWithLayout";
import ROLES from '../../lib/config';

const PublicRoute = (props) => {
    const context = useContext(AppContext)
    const { role, isAuthenticated } = context
    if (role && isAuthenticated) return <Redirect from="*" to={ROLES[role].redirectPath} />
    return (
        <RoutesWithLayout {...props}/>
    )
}

export default PublicRoute;
