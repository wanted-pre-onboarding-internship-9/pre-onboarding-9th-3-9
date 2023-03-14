import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import chartServices from './apis/chartService';

function App() {

  const [charts, setCharts] = useState([]);
  let tets: any;

  useEffect(() => {
    chartServices.getChartAX()
      .then((response) => {
        setCharts(response.data.response);
        tets = response.data.response;
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    const bars = Object.values(charts).map((item: any) => item.value_bar);
    const areas = Object.values(charts).map((item: any) => item.value_area);
    const ids = Object.values(charts).map((item: any) => item.id)[0];

    console.log("bars", tets);
    console.log(Object.keys(charts));

  }, [charts])

  const state: any = {
    series: [{
      name: 'bar',
      type: 'column',
      data: Object.values(charts).map((item: any) => item.value_bar)
    }, {
      name: 'area',
      type: 'area',
      data: Object.values(charts).map((item: any) => item.value_area)
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: Object.keys(charts),//["2023-02-01 14:32:00", "2023-02-01 14:32:05", "2023-02-01 14:32:10", "2023-02-01 14:32:20"],
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {
              color: "#008FFB"
            }
          },
          title: {
            text: "bar",
            style: {
              color: "#008FFB"
            },
            rotate: 0,
            offsetX: -10,
            offsetY: -115,
          },
          tooltip: {
            enabled: true
          }
        },
        {
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              color: "#00E396"
            }
          },
          title: {
            text: "area",
            style: {
              color: "#00E396"
            },
            rotate: 0,
            offsetX: 10,
            offsetY: -115,
          }
        }
      ],
      tooltip: {
        shared: true,
        intersect: false,
        x: {
          show: true,
          formatter: function (x: any, { dataPointIndex }: any) {
            if (typeof dataPointIndex !== "undefined")
              return Object.values(charts).map((item: any) => item.id)[dataPointIndex];
          },
        },
        y: {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          }
        },
        onDatasetHover: {
          highlightDataSeries: true,
        },
      }
    }
  }

  type TtooltipX<T> = {
    dataPointIndex: number,
    series: T[],
    seriesIndex: number,
    w?: any
  }


  return (
    <div>
      <StyledBox />
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </div>
    </div>
  );
}


export default App;

const StyledBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: tomato;
`;

