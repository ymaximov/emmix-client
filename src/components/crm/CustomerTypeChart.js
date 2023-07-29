import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {setFilteredResults, setFilterName} from "../../redux/slices/filteredResultsSlice";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const CustomerTypeChart = ({ commercial, government, education, individual, setShowFilteredResultsModal }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const chartRef = useRef(null);
    let myChart = null;

    // Function to merge data from different sources into a single dataset
    const mergeData = (commercial, government, education, individual) => {
        return {
            labels: ['Commercial', 'Government', 'Education', 'Individual'],
            datasets: [
                {
                    label: 'Sectors',
                    data: [commercial.length, government.length, education.length, individual.length],
                    backgroundColor: '#36A2EB',
                },
            ],
        };
    };

    const chartData = mergeData(commercial, government, education, individual);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            // Ensure the previous chart instance is destroyed
            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(chartRef.current, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            // Bar clicked, do something with the clicked bar
                            const clickedBarIndex = elements[0].index;
                            const clickedBarLabel = myChart.data.labels[clickedBarIndex];
                            const clickedBarValue = myChart.data.datasets[0].data[clickedBarIndex];
                            if(clickedBarLabel == 'Commercial') {
                                dispatch(setFilteredResults(commercial))
                                dispatch(setFilterName('Customers From Commercial Sector'))
                                setShowFilteredResultsModal(true)
                            }
                            if(clickedBarLabel == 'Government') {
                                dispatch(setFilteredResults(government))
                                dispatch(setFilterName('Customers From Governmental Sector'))
                                setShowFilteredResultsModal(true)
                            }
                            if(clickedBarLabel == 'Education') {
                                dispatch(setFilteredResults(education))
                                dispatch(setFilterName('Customers From Educational Sector'))
                                setShowFilteredResultsModal(true)
                            }
                            if(clickedBarLabel == 'Individual') {
                                dispatch(setFilteredResults(individual))
                                dispatch(setFilterName('Individual/Non-Commercial Customers'))
                                setShowFilteredResultsModal(true)
                            }
                            console.log('Clicked bar:', clickedBarLabel, 'Value:', clickedBarValue);
                        }
                    },
                },
            });
        }

        // Clean up the chart when the component unmounts
        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [commercial, government, education, individual]);

    return <canvas ref={chartRef} className="chart-canvas" />;
};

export default CustomerTypeChart;
