import { useState } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './App.css'
import data from './assets/data.json'

const Balance = () => {
  return (
    <header className="balance_section">
      <div className="balance_amount">
        <p>My balance</p>
        <p>$921.48</p>
      </div>
      <svg width="40" height="48" viewBox="0 0 72 50" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill="#382314" cx="48" cy="24" r="24"/><circle stroke="#FFF" stroke-width="2" cx="24" cy="24" r="23"/></g></svg>
    </header>
  )
}

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div>
        {payload.map((ele, index) => (
          <>
            <p>{`$${ele.value}`}</p>
          </>
        ))}
      </div>
    )
  }
  return null;
}

const Chart = ({ todayDate }) => {

  /* I tied the days on the chart to the todayDate integer
  This is because of the order that the days are presented in
  the chart. It starts at 6, since the week starts on Sunday and
  goes back to 0 (first index in the chart) when Monday starts. */
  const daysOfWeekNum = [6, 0, 1, 2, 3, 4, 5];

  return (
    <main className="chart_section">
      <h1>Spending - Last 7 days</h1>
      <ResponsiveContainer width="100%" height={275}>
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={7} fontSize="12px" />
          <Tooltip cursor={false} content={<CustomToolTip />} wrapperStyle={{ padding: "1rem", background: "hsl(25, 47%, 15%)", borderRadius: "8px", color: "hsl(33, 100%, 98%)", fontWeight: "bold", fontSize: "1.2rem"}} position={{ y: -10 }} offset={-30} />
          <Bar dataKey="amount" fill="hsl(10, 79%, 65%)" radius={4}>
            {
              data.map((entry, index) => {
                return (
                  <Cell key={`cell-${index}`} fill={ daysOfWeekNum[todayDate] === index ? "hsl(10, 79%, 65%)" : "hsl(186, 34%, 60%)" } />
                )
              })
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="total_container">
        <div className="current_month_total">
          <p>Total this month</p>
          <p>$478.33</p>
        </div>
        <div className="previous_month_difference">
          <p>+2.4%</p>
          <p>from last month</p>
        </div>
      </div>
    </main>
  )
}

function App() {
  const [day, getDay] = useState(new Date().getDay());

  return (
    <div className="container">
      <Balance />
      <Chart todayDate={day} />
    </div>
  )
}

export default App
