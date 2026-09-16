import StatusBadge from './components/StatusBadge'
import './App.css'

function App() {
  const name = 'Panhasotharith Sok'
  const goal = 'Build real React apps and become a job-ready frontend developer.'
  const isOpenToWork = true

  return (
    <main className="profile">
      <h1>{name}</h1>
      <p className="goal">{goal}</p>
      <StatusBadge isOpenToWork={isOpenToWork} />
      <p className="since">Portfolio started in {new Date().getFullYear()}</p>
    </main>
  )
}

export default App
