import './App.css'
import ColorInput from './components/inputs/ColorInput'

function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>ColorSmith — Color Input</h1>
      <p>Enter a color below or pick from screen:</p>
      <ColorInput />
    </div>
  )
}

export default App
