import { useState } from 'react'
import './App.css'
import TaskInput from './components/TaskInput'
import TodoList from './components/TodoList'
import axios from 'axios'
import logo from './assets/Navbar_logo.png'
import LandingPage from './pages/LandingPage'

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateValues = async (task) => {
    setLoading(true);
    setError(null);
    setTodos([]);

    try {
      // Using relative path for production and local proxy
      const response = await axios.post('/api/suggest-todos', { task });
      setTodos(response.data.todos);
    } catch (err) {
      console.error("Error generating todos:", err);
      setError(err.response?.data?.error || err.message || "Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <LandingPage/>
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="TaskPulse Logo" className="navbar-logo" />
          <span className="navbar-title">TaskPulse</span>
        </div>
      </nav>

      <div className="app-container">
        <header className="app-header">
          <h1>Turn Goals into Action</h1>
          <p>AI-powered task breakdown for maximum productivity</p>
        </header>

        <main className="main-content">
          <TaskInput onGenerate={handleGenerateValues} isLoading={loading} />

          {error && <div className="error-message">{error}</div>}

          <TodoList todos={todos} />
        </main>
      </div>
    </div>
  )
}

export default App
