import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CustomerTypeChart = ({commercial, government, education, individual}) => {
    const chartRef = useRef(null);
    let myChart = null;

    useEffect(() => {
        if (chartRef && chartRef.current) {
            // Ensure the previous chart instance is destroyed
            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Commercial', 'Government', 'Education', 'Individual'],
                    datasets: [
                        {
                            label: 'Sectors',
                            data: [commercial.length, government.length, education.length, individual.length],
                            backgroundColor: '#36A2EB',
                        },
                        // Add more datasets if needed
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Set to false to allow the chart to scale freely
                    scales: {
                        x: {
                            beginAtZero: true, // Start the scale at 0
                        },
                        y: {
                            beginAtZero: true, // Start the scale at 0
                        },
                    },
                    // You can add other options here to customize the appearance of the chart
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

    return <canvas ref={chartRef} className="chart-canvas" />;
};

export default CustomerTypeChart;
