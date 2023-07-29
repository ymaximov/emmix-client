import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ActiveInactiveChart = ({active, inactive}) => {
    const chartRef = useRef(null);
    let myChart = null;

    const combinedData = {
        labels: [],
        datasets: [
            {
                label: 'Data Set 1',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const mergeData = (sourceData) => {
        sourceData.forEach((item) => {
            combinedData.labels.push(item.label);
            combinedData.datasets[0].data.push(item.value);
        });
    };

    mergeData(active);
    mergeData(inactive);


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
                            backgroundColor: ['#36A2EB', '#FF6384'],
                            hoverBackgroundColor: ['#36A2EB', '#36A2EB'],
                        },
                    ],
                },
                options: {
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            // Bar clicked, do something with the clicked bar
                            const clickedBarIndex = elements[0].index;
                            const clickedBarLabel = combinedData.labels[clickedBarIndex];
                            const clickedBarValue = combinedData.datasets[0].data[clickedBarIndex];
                            console.log('Clicked bar:', clickedBarLabel, 'Value:', clickedBarValue);
                        }
                    },
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