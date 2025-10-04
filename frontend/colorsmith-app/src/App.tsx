import './App.css'
import ColorInput from './components/inputs/ColorInput'
import PaletteView from './components/palettes/PaletteView'

function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>ColorSmith — Color Input</h1>
      <p>Enter a color below or pick from screen:</p>
      <div className="main-flex-layout">
        <ColorInput />
        <div className="main-flex-divider" />
        <div className="main-flex-palette">
          <h2 style={{ fontFamily: 'Poppins, system-ui, sans-serif', fontWeight: 600, marginTop: 0 }}>Palettes</h2>
          <PaletteView />
        </div>
      </div>
    </div>
  )
}

export default App
