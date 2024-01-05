import { useCallback, useState } from "react"
import { instance } from "../../commons/instance"

const useLoginAction = () => {
    const [loading, setLoading] = useState()

    const login = useCallback((data) => {
        if (loading) return
        setLoading(true)
        const requestPayload = {
            "username": data.username,
            "password": data.password,
        }
        return instance.post('/login', requestPayload, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }).finally(() => {
            setLoading(false)
        })
    }, [loading])

    const logout = useCallback(async () => {
        return instance.post('/user/logout/all', { headers: { "Content-Type": "application/x-www-form-urlencoded" } }).then((res) => {
            if (res.data) {
                localStorage.removeItem('token')
                window.location.reload()
            }
        })
    }, [])

    return { login, loading, setLoading, logout }
}

export default useLoginAction