import React from 'react'
import { Bar } from 'react-chartjs-2'

const SchoolPerformance = ({ data, options }) => {
    return (
        <Bar data={data} options={options} />
    )
}

export default SchoolPerformance
