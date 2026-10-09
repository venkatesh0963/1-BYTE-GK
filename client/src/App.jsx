import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Challenge from './pages/Challenge';
import Result from './pages/Result';
import SubjectLibrary from './pages/SubjectLibrary';
import SubjectDetails from './pages/SubjectDetails';
import SeriesDetails from './pages/SeriesDetails';
import SubscriptionPlans from './pages/SubscriptionPlans';
import PaymentSuccess from './pages/PaymentSuccess';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import DailyChallengePage from './pages/DailyChallengePage';

// ProtectedRoute checks if user is in localStorage
function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// App.jsx
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Marketing Route */}
        <Route path="/" element={<LandingPage />} />

        {/* User Application Routes (Protected/Sidebar Layout) */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/daily" element={<ProtectedRoute><DailyChallengePage /></ProtectedRoute>} />
              <Route path="/challenge" element={<ProtectedRoute><Challenge /></ProtectedRoute>} />
              <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
              <Route path="/library" element={<ProtectedRoute><SubjectLibrary /></ProtectedRoute>} />
              <Route path="/library/:slug" element={<ProtectedRoute><SubjectDetails /></ProtectedRoute>} />
              <Route path="/series/:id" element={<ProtectedRoute><SeriesDetails /></ProtectedRoute>} />
              <Route path="/subscribe" element={<ProtectedRoute><SubscriptionPlans /></ProtectedRoute>} />
              <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
