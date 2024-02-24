<template>
  <line-chart
    class="m-4"
    :key="rerenderChart"
    id="my-chart-id"
    :options="chartOptions"
    :data="store.userLoggedIn ? chartData : welcomeChartData"
  />
  <hr />
</template>

<script>
import useUserStore from '@/stores/users.js'

import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Colors,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
} from 'chart.js'

ChartJS.register(
  Filler,
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'DataChart',
  setup() {
    return {
      store: useUserStore()
    }
  },

  components: { LineChart },

  data() {
    return {
      rerenderChart: false,
      chartData: {
        labels: [],
        color: '#d5d5d5',

        datasets: [
          {
            label: 'total cards',
            data: [],
            fill: false,
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5'
          }
        ]
      },
      welcomeChartData: {
        labels: [
          '01.02.24',
          '02.02.24',
          '03.02.24',
          '04.02.24',
          '05.02.24',
          '06.02.24',
          '07.02.24',
          '08.02.24',
          '09.02.24',
          '10.02.24',
          '11.02.24',
          '12.02.24',
          '13.02.24',
          '14.02.24',
          '15.02.24',
          '16.02.24',
          '17.02.24',
          '18.02.24',
          '19.02.24',
          '20.02.24'
        ],
        color: '#d5d5d5',

        datasets: [
          {
            label: 'total cards',
            data: [1, 3, 4, 4, 4, 7, 7, 10, 11, 12, 14, 14, 14, 17, 17, 18, 20, 21, 22, 22],
            fill: false,
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5'
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            ticks: {
              color: '#d5d5d5'
            },
            grid: {
              color: '#404040',
              lineWidth: 0.5
            }
          },
          x: {
            ticks: {
              color: '#d5d5d5'
            },
            grid: {
              color: '#404040',
              lineWidth: 0.5
            }
          }
        },

        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#d5d5d5'
            }
          }
        }
      }
    }
  },
  methods: {
    setChartData(cards) {
      const cardsDates = []
      cards.forEach((card) => {
        cardsDates.push(card.timestamp)
      })
      cardsDates.sort()

      function getDatesArray(startDate, endDate) {
        const datesArray = []
        let currentDate = new Date(startDate)

        // Issue with enddate at some point currentdate is bigger then enddate
        while (currentDate <= endDate) {
          const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`
          datesArray.push(formattedDate)
          currentDate.setDate(currentDate.getDate() + 1)
        }

        return datesArray
      }
      const startDate = new Date(cardsDates[0])
      const endDate = new Date()

      //temporary solution to fix issue with while loop above
      endDate.setDate(endDate.getDate() + 1)

      this.chartData.labels = getDatesArray(startDate, endDate)

      let result = []
      let dataPoint = 0

      this.chartData.labels.forEach((date) => {
        cards.forEach((card) => {
          const newTimestamp = new Date(card.timestamp)
          const formattedTimestamp = `${newTimestamp.getDate()}.${newTimestamp.getMonth() + 1}.${newTimestamp.getFullYear()}`

          if (formattedTimestamp == date) {
            dataPoint++
          }
        })
        result.push(dataPoint)
      })

      return result
    }
  },
  watch: {
    'store.cards': {
      handler() {
        this.chartData.datasets[0].data = this.setChartData(this.store.cards)

        this.rerenderChart = !this.rerenderChart
      },
      deep: true
    }
  },
  created() {
    if (this.store.cards.length > 0) {
      this.chartData.datasets[0].data = this.setChartData(this.store.cards)
    }
  }
}
</script>
