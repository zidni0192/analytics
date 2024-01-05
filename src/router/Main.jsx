import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const ProtectedRoutes = lazy(() => import('../components/ProtectedRoutes'))
const UnprotectedRoutes = lazy(() => import('../components/UnprotectedRoutes'))
const Register = lazy(() => import('../Register'))
const Login = lazy(() => import('../Login'))
const Analytic = lazy(() => import('../Analytic'))

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Suspense><ProtectedRoutes /></Suspense>}>
                    <Route path="" element={<Suspense><Analytic /></Suspense>}></Route>
                </Route>
                <Route path='/user' element={<Suspense><UnprotectedRoutes /></Suspense>}>
                    <Route path='login' element={<Suspense><Login /></Suspense>} />
                    <Route path='register' element={<Suspense><Register /></Suspense>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
