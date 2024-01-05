import React, { useEffect, useState } from 'react'
import useAnalyticAction from './hooks/useAnalyticAction'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs';
import useLoginAction from '../Login/hooks/useLoginAction';


export default function Analytic() {
    const { getAnalytics, dateRange, setDateRange, analytics, exportAnalytics } = useAnalyticAction()
    const { logout } = useLoginAction()
    const [startDate, endDate] = dateRange;
    useEffect(() => {
        if (!dateRange?.some(item => !item) || !dateRange?.every(item => item)) {
            getAnalytics()
        }
    }, [dateRange])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1>Laporan Analytics</h1>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button onClick={logout}>Logout</button>
                    <button onClick={exportAnalytics}>Export Laporan</button>
                </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <span>Filter</span>
                <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    isClearable
                />
            </div>
            <table border="true" style={{ overflow: 'auto' }}>
                {analytics?.map((item, index) => {
                    return (
                        <>
                            {!index ? (
                                <tr>
                                    {Object.keys(item).map(key => {
                                        if (key === 'scope') return (<th>ITEM</th>)
                                        else if (key === 'count') return (<th>{dayjs().format('DD-MM-YYYY')}</th>)
                                        return <th>{key}</th>
                                    })}
                                </tr>
                            ) : null}
                            <tr>
                                {Object.keys(item).map(key => {
                                    return <td>{item[key]}</td>
                                })}
                            </tr>
                        </>
                    )
                })}
            </table>
        </div>
    )
}
