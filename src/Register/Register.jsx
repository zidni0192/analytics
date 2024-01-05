import React, { useCallback, useRef } from 'react'
import { App } from 'antd'
import { useForm } from 'react-hook-form'
import useRegisterAction from './hooks/useRegisterAction'
import { useNavigate, Link } from 'react-router-dom'
export default function Register() {
    const { notification } = App.useApp()
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm({ shouldUseNativeValidation: true })
    const { register: regist, loading } = useRegisterAction()
    const refUpload = useRef()
    const onSubmit = useCallback((data) => {
        regist(data).then((res) => {
            if (res.data) {
                notification.success({
                    "message": "Registration success",
                    placement: 'topRight'
                })
                navigate('/user/login')
            } else {
                throw res
            }
        }).catch(({ response, message }) => {
            const res = response?.detail?.[0]
            if (res) {
                message = res?.msg
            }
            notification.error({
                "message": message,
                placement: 'topRight'
            })
            console.log(message)
        })
    }, [regist, notification, navigate])
    const handleButtonUpload = useCallback((event) => {
        refUpload?.current?.click()
        event?.target?.blur()
    }, [refUpload])

    const onChangeUpload = useCallback((event) => {
        setValue('file', event.target.files[0])
        setValue('filename', event.target.files?.[0]?.name)
    }, [setValue])
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form style={{ width: "300px", maxWidth: "100vw", gap: '10px', display: 'flex', flexDirection: 'column', padding: 10 }} onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{ textAlign: 'center' }}>Register</h2>
                <input style={{ padding: '12px 8px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '1px 1px 2px #ddd' }} type='email' {...register('email', { required: "Please Enter Email" })} placeholder="Email" />
                <input style={{ padding: '12px 8px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '1px 1px 2px #ddd' }} type='text' {...register('name', { required: "Please Enter Username" })} placeholder='Username' />
                <input style={{ padding: '12px 8px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '1px 1px 2px #ddd' }} type='password' {...register('password', { required: "Please Enter Password" })} placeholder="Password" />
                <input style={{ padding: '12px 8px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '1px 1px 2px #ddd' }} type='text' {...register('phone', {
                    required: "Please Enter Phone", maxLength: { value: 12, message: "Phone should be less than equal 12" }, pattern: {
                        value: new RegExp('628[0-9]+'),
                        message: "Phone should match pattern '628[0-9]+'"
                    }
                })} min={1} placeholder="Phone" />
                <input style={{ padding: '12px 8px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '1px 1px 2px #ddd' }} type='number' {...register('age', { required: "Please Enter Age", min: { value: 18, message: "Age should be more than equal 18" }, max: { value: 100, message: "Age should be less than 100" } })} placeholder="Age" />
                <input style={{ padding: '12px 8px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '1px 1px 2px #ddd', cursor: "pointer" }} type='text' onClick={handleButtonUpload} {...register('filename', { required: "Please Choose Photo" })} placeholder='Upload Photo' />
                <input style={{ display: 'none' }} type='file' {...register('file')} placeholder='Photo' ref={refUpload} accept="image/*" onChange={onChangeUpload} />
                <button style={{ backgroundColor: '#000', color: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #000' }}>
                    Save
                </button>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to='/user/login'>
                        Login
                    </Link>
                </div>
            </form>
        </div>
    )
}
