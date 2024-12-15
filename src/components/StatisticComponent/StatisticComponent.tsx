import { RecommendedDish } from '@/types/recommendedDish';
import { ChartData, ChartDataset,  Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend, } from 'chart.js';
import React from 'react'

  ChartJS.register(ArcElement, Tooltip, Legend);
import { Doughnut } from 'react-chartjs-2';
const StatisticComponent = ({data}: {data: RecommendedDish}) => {
  const colors = ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB', '#9966FF', '#FF6384', '#A52A2A', '#A9A9A9']
  const datasets: ChartDataset<"doughnut", number[]>[] = []
  const chartItems = []
  const labels: string[] = [];
  
  for( let [key, value] of Object.entries(data)){
    if(key !== "RecipeId" && typeof value == "number"){
        chartItems.push(value)
        labels.push(key);
  }
}
 datasets.push({
    data: chartItems,
    backgroundColor: colors,
    label: 'Ingredients'
  })

  const chartData: ChartData<"doughnut", number[], unknown> = {
    labels,
    datasets
  }
  return (
    <Doughnut data={chartData}/>
  )
}

export default StatisticComponent