import ColorInputs from './features/color-picker/ColorInputs';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles'; // Import GlobalStyles

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyles /> {/* Render GlobalStyles */}
      <h1>Colour Picker</h1>
      <ColorInputs />
    </AppContainer>
  );
}

export default App;
