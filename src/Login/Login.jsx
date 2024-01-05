import React, { useCallback } from 'react'
import { App } from 'antd'
import { useForm } from 'react-hook-form'
import useLoginAction from './hooks/useLoginAction'
import { useNavigate, Link } from 'react-router-dom'
export default function Register() {
    const { notification } = App.useApp()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true })
    const { login } = useLoginAction()
    const onSubmit = useCallback((data) => {
        login(data).then((res) => {
            if (res?.data) {
                localStorage.setItem('token', res.data?.access_token)
                notification.success({
                    "message": "Login success",
                    placement: 'topRight'
                })
                setTimeout(() => {
                    navigate('/')
                }, 5000)
            } else {
                notification.error({
                    "message": res?.response?.data?.detail?.code,
                    placement: 'topRight'
                })
            }
        }).catch(({ response, message }) => {
            const res = response?.detail?.code
            if (res) {
                message = res?.msg
            }
            notification.error({
                "message": message,
                placement: 'topRight'
            })
            console.log(message)
        })
    }, [login, notification, navigate])
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form style={{ width: "300px", maxWidth: "100vw", gap: '10px', display: 'flex', flexDirection: 'column', padding: 10 }} onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <input style={{ padding: '12px 8px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '1px 1px 2px #ddd' }} type='email' {...register('username', { required: "Please Enter Email" })} placeholder="Email" />
                <input style={{ padding: '12px 8px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '1px 1px 2px #ddd' }} type='password' {...register('password', { required: "Please Enter Password" })} placeholder="Password" />
                <button style={{ backgroundColor: '#000', color: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #000' }} type='submit'>
                    Login
                </button>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to='/user/register'>
                        Register
                    </Link>
                </div>
            </form>
        </div>
    )
}
