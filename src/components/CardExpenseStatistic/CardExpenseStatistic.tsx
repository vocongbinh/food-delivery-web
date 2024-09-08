import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';

// Kích hoạt module 3D
Highcharts3D(Highcharts);

interface CardExpenseStatisticProps { }

const CardExpenseStatistic: FC<CardExpenseStatisticProps> = () => {
  const chartOptions = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 14,


      },
    },
    title: {
      text: 'Bank Shares',
      align: 'left',
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        depth: 200,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
        slicedOffset: 10 // Khoảng cách nhô ra khi một phần được chọn
      },
    },
    series: [
      {
        name: 'Bank Shares',
        data: [
          {
            name: 'DBL Bank',
            y: 30,
            sliced: true, selected: true, slicedOffset: 10
          },
          {
            name: 'ABM Bank',
            y: 20,
            sliced: true,slicedOffset: 20


          },
          {
            name: 'BRC Bank',
            y: 20,
            sliced: true, selected: true, slicedOffset: 100

          },
          {
            name: 'MCP Bank',
            y: 30,
            sliced: true, selected: true, slicedOffset: 40

          },
        ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default CardExpenseStatistic;
