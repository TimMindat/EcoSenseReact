import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Team } from './pages/Team';
import { Features } from './pages/Features';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/features" element={<Features />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;