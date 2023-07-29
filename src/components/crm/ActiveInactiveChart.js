import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ActiveInactiveChart = ({active, inactive}) => {
    const chartRef = useRef(null);
    let myChart = null;

    useEffect(() => {
        if (chartRef && chartRef.current) {
            // Ensure the previous chart instance is destroyed
            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(chartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Active Customers', 'Inactive Customers',],
                    datasets: [
                        {
                            data: [active.length, inactive.length],
                            backgroundColor: ['#FF6384', '#36A2EB'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        }

        // Clean up the chart when the component unmounts
        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, []);

    return <canvas ref={chartRef} width="200" height="200" />;
};

export default ActiveInactiveChart;