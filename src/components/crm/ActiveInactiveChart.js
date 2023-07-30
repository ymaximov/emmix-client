import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {useSelector, useDispatch} from "react-redux";
import {setFilteredResults, setFilterName, setResultsTotal} from "../../redux/slices/filteredResultsSlice";

const ActiveInactiveChart = ({active, inactive, setShowFilteredResultsModal}) => {
    const dispatch = useDispatch()
    const chartRef = useRef(null);
    let myChart = null;

    const combinedData = {
        labels: ['Active Customers', 'Inactive Customers'],
        datasets: [
            {
                data: [active.length, inactive.length],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };


    useEffect(() => {
        if (chartRef && chartRef.current) {
            // Ensure the previous chart instance is destroyed
            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(chartRef.current, {
                type: 'doughnut',
                data: combinedData,
                options: {
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            // Bar clicked, do something with the clicked bar
                            const clickedBarIndex = elements[0].index;
                            const clickedBarLabel = combinedData.labels[clickedBarIndex];
                            const clickedBarValue = combinedData.datasets[0].data[clickedBarIndex];
                            console.log('Clicked bar:', clickedBarLabel, 'Value:', clickedBarValue);
                            if(clickedBarLabel == 'Active Customers') {
                                dispatch(setFilteredResults(active))
                                dispatch(setFilterName('Active Customers'))
                                dispatch(setResultsTotal(active.length))
                                setShowFilteredResultsModal(true)
                            }
                            if (clickedBarLabel == 'Inactive Customers') {
                                dispatch(setFilteredResults(inactive))
                                dispatch(setFilterName('Inactive Customers'))
                                dispatch(setResultsTotal(inactive.length))
                                setShowFilteredResultsModal(true)
                            }
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
    }, [active, inactive]);

    return <canvas ref={chartRef} width="200" height="200" />;
};

export default ActiveInactiveChart;