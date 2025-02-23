import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ISalesForMonth } from '../models/dashboard.model';
interface BarChartProps {
    data: ISalesForMonth[];
}

const CustomBarChart: React.FC<BarChartProps> = ({ data }) => {
    return (
        <div>
            <h2>Ventas Mensuales</h2>
            <BarChart
                width={600}
                height={300}
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#123A6D" />
            </BarChart>
        </div>
    );
};

export default CustomBarChart;