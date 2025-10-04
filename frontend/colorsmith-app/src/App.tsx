import './App.css'
import ColorInput from './components/inputs/ColorInput'
import PaletteView from './components/palettes/PaletteView'

function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>ColorSmith — Color Input</h1>
      <p>Enter a color below or pick from screen:</p>
      <ColorInput />
      <hr style={{ margin: '16px 0' }} />
      <h2>Palettes</h2>
      <PaletteView />
    </div>
  )
}

export default App
