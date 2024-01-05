import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function UnprotectedRoutes() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/', { replace: true })
        }
    }, [navigate])
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}
