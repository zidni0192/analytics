import { useCallback, useState } from "react"
import { instance } from "../../commons/instance"
import * as XLSX from 'xlsx';
import dayjs from "dayjs";
const useAnalyticAction = () => {
    const [loading, setLoading] = useState()
    const [analytics, setAnalytics] = useState()
    const [dateRange, setDateRange] = useState([null, null]);
    const getAnalytics = useCallback(() => {
        if (loading) return
        setLoading(true)
        let dates = [];
        if (dateRange[0]) {
            const date = new Date(dateRange[0]);

            while (date <= dateRange[1]) {
                dates.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }

            Promise.all(dates?.map((item) => new Promise((resolve, reject) => {
                instance.get('/analytic/click', { params: { listing_date: dayjs(item)?.format('YYYY-MM-DD') } }).then(({ data }) => {
                    resolve({ data, date: dayjs(item)?.format('DD-MM-YYYY') })
                })
            }))).then((result) => {
                let temp = []
                const indexes = {}
                result.forEach((item) => {
                    item?.data?.forEach((item2) => {
                        let index = indexes[item2.scope]
                        if (!index && index !== 0) {
                            indexes[item2.scope] = temp.length
                            index = temp.length
                        }
                        if (!temp[index]) temp[index] = { item: item2.scope, total: 0 }
                        temp[index][item.date] = item2.count || 0
                        temp[index]["total"] += item2.count || 0
                    })
                })
                setAnalytics(temp)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            return instance.get('/analytic/click').then(({ data }) => {
                const date = dayjs()?.format('DD-MM-YYYY')
                setAnalytics(data?.map(item => ({ item: item.scope, total: item.count, [date]: item.count })))
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [loading, dateRange])

    const exportAnalytics = useCallback(() => {
        const date = !dateRange[0] ? dayjs()?.format('DD-MM-YYYY') : `${dayjs(dateRange[0])?.format('DD-MM-YYYY')}~${dayjs(dateRange[1])?.format('DD-MM-YYYY')}`
        const worksheet = XLSX.utils.json_to_sheet(analytics);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `Analytics ${date}.xlsx`);
    }, [analytics])

    return { getAnalytics, loading, setLoading, dateRange, setDateRange, analytics, exportAnalytics }
}

export default useAnalyticAction