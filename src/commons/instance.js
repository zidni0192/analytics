import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`

    return config
})

instance.interceptors.response.use((res) => res, (error) => {
    if (error?.response?.status === 401 && localStorage.getItem('token')) {
        sessionStorage.setItem('previous_url', window.location.href)
        localStorage.removeItem('token')
        window.location.href = "/user/login"
    }
    return error
})