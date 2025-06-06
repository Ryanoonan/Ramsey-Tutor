import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import LandingPage from './components/LandingPage';
import SandboxMode from './components/sandbox/SandboxMode';
import LearnMode from './components/learn/LearnMode';
import LearnMenu from './components/learn/LearnMenu';
import './App.css';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sandbox" element={<SandboxMode />} />
            <Route path="/learnmenu" element={<LearnMenu />} />
            <Route path="/learn" element={<LearnMode />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
