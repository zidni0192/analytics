import { useCallback, useState } from "react"
import { instance } from "../../commons/instance"

const useRegisterAction = () => {
    const [loading, setLoading] = useState()

    const uploadPhoto = useCallback((data) => (
        instance.post('/user/photo/upload', data
        )), [])

    const register = useCallback(async (data) => {
        if (loading) return
        setLoading(true)
        const uploadData = new FormData()
        uploadData.append('file', data?.file)
        return uploadPhoto(uploadData).then(({ data: photo }) => {
            const requestPayload = {
                "email": data.email,
                "name": data.name,
                "phone": data.phone,
                "password": data.password,
                "age": data.age,
                "photos": [
                    photo
                ]
            }
            return instance.post('/user', requestPayload)
        }).finally(() => {
            setLoading(false)
        })
    }, [uploadPhoto, loading])

    return { register, loading, setLoading }
}

export default useRegisterAction