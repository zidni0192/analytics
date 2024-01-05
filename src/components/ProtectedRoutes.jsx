import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function ProtectedRoutes() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/user/login', { replace: true })
        }
    }, [navigate])
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}
