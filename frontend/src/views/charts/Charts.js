import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'

const Charts = () => {
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [prevdata, setprevData] = useState([])

  useEffect(() => {
    const fetchPerformanceData = async () => {
      const userId = localStorage.getItem('userId') // Retrieve userId from localStorage
      if (!userId) {
        console.error('User ID not found in localStorage')
        return
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/user-performance/${userId}`)
        const performanceData = response.data
        console.log('Performance Data:', performanceData)
        if (Array.isArray(performanceData)) {
          const chartLabels = performanceData.map((item) => item.metric)
          const chartData = performanceData.map((item) => item.score)
          const chartprevData = performanceData.map((item) => item.prevscore)
          setLabels(chartLabels)
          setData(chartData)
          setprevData(chartprevData)
        } else {
          console.error('performance data is missing or not an array')
        }
      } catch (error) {
        console.error('Error fetching performance data:', error)
      }
    }
    fetchPerformanceData()
  }, [])

  return (
    <CRow>
      <CCol xs={12}></CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Bar Chart</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: labels,
                datasets: [
                  {
                    label: labels,
                    backgroundColor: '#f87979',
                    data: data,
                  },
                ],
              }}
              labels="mertics"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Line Chart</CCardHeader>
          <CCardBody>
            <CChartLine
              data={{
                labels: labels,
                datasets: [
                  {
                    label: 'last test',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: prevdata,
                  },
                  {
                    label: 'Current test',
                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                    borderColor: 'rgba(151, 187, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                    pointBorderColor: '#fff',
                    data: data,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Doughnut Chart</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={{
                labels: labels,
                datasets: [
                  {
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                    data: data,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Pie Chart</CCardHeader>
          <CCardBody>
            <CChartPie
              data={{
                labels: labels,
                datasets: [
                  {
                    data: data,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Polar Area Chart</CCardHeader>
          <CCardBody>
            <CChartPolarArea
              data={{
                labels: labels,
                datasets: [
                  {
                    data: data,
                    backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Radar Chart</CCardHeader>
          <CCardBody>
            <CChartRadar
              data={{
                labels: [
                  'Aptitude',
                  'Programming',
                  'Communication',
                  'Designing',
                  'Coding',
                  'Vocabulary',
                  'reasoning',
                ],
                datasets: [
                  {
                    label: 'prev test',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                    data: prevdata,
                  },
                  {
                    label: 'current test',
                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                    borderColor: 'rgba(151, 187, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                    pointBorderColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151, 187, 205, 1)',
                    data: data,
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
