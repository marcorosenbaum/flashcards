<template>
  <line-chart id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import useUserStore from '@/stores/users.js'
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Learning progress',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true
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

        while (currentDate <= endDate) {
          const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`
          datesArray.push(formattedDate)
          currentDate.setDate(currentDate.getDate() + 1)
        }

        return datesArray
      }

      const startDate = new Date(cardsDates[0])
      const endDate = new Date()
      this.chartData.labels = getDatesArray(startDate, endDate)

      let dataPoint = 0
      this.chartData.labels.forEach((date) => {
        cards.forEach((card) => {
          const newTimestamp = new Date(card.timestamp)

          const formattedTimestamp = `${newTimestamp.getDate()}.${newTimestamp.getMonth() + 1}.${newTimestamp.getFullYear()}`

          if (formattedTimestamp == date) {
            if (card.cardId > dataPoint) {
              dataPoint = card.cardId
            }
          }
        })
        this.chartData.datasets[0].data.push(dataPoint)
      })
    }
  },

  created() {
    if (this.store.cards.length > 0) {
      this.setChartData(this.store.cards)
    }
  }
}
</script>
