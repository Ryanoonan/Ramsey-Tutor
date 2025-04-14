import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import LandingPage from './components/LandingPage';
import SandboxMode from './components/sandbox/SandboxMode';
import LearnMode from './components/learn/LearnMode';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a237e', // Same as --color-node-fill
    },
    secondary: {
      main: '#ffffff', // Same as --color-edge-default
    },
    background: {
      default: '#1a1a1a', // Same as --color-background
      paper: 'var(--color-paper)', // Same as --color-paper
    },
    text: {
      primary: '#ffffff', // Same as --color-text-primary
      secondary: '#e0e0e0', // Same as --color-text-secondary
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--color-paper)',
          backgroundImage: 'none',
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sandbox" element={<SandboxMode />} />
            <Route path="/learn" element={<LearnMode />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
