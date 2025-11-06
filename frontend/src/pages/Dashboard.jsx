import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ChartCard from '../components/ChartCard'


export default function Dashboard(){
const [stats, setStats] = useState(null)


useEffect(()=>{
// Example: fetch summary or recent predictions from backend
// axios.get('/api/predict/history', { headers: { Authorization: 'Bearer ' + token }})
}, [])


const handleFileUpload = async (file) => {
// parse CSV in client or send to backend for batch prediction
}


return (
<div className='min-h-screen p-6 bg-slate-900 text-white'>
<h1 className='text-3xl mb-6'>Fraud Detection Dashboard</h1>
<div className='grid grid-cols-3 gap-4'>
<ChartCard title='Fraud Rate' />
<ChartCard title='Recent Predictions' />
<ChartCard title='Model Confidence' />
</div>
</div>
)
}