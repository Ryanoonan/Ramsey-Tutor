import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import LandingPage from './components/LandingPage';
import TheoremPage from './components/learn/TheoremPage';
import LearnMenu from './components/learn/LearnMenu';
import './App.css';
import theme from './theme';
import Background from './components/background/Background';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/learnmenu" element={<LearnMenu />} />
            <Route path="/learn/:slug" element={<TheoremPage />} />
            <Route path="/background" element={<Background />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
