import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PublicBoatsPage from './pages/PublicBoatsPage';
import HostPage from './pages/HostPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import CreateBoatPage from './pages/CreateBoatPage';
import MyBoatsPage from './pages/MyBoatsPage';
import EditBoatPage from './pages/EditBoatPage';
import BoatDetailsPage from './pages/BoatDetailsPage';
import MyBookingsPage from './pages/MyBookingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<PublicBoatsPage />} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/boat/:index" element={<BoatDetailsPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />

        <Route path="/boats/create" element={
          <PrivateRoute>
            <CreateBoatPage />
          </PrivateRoute>
        } />

        <Route path="/myboats" element={
          <PrivateRoute>
            <MyBoatsPage />
          </PrivateRoute>
        } />

        <Route path="/boats/edit/:id" element={
          <PrivateRoute>
            <EditBoatPage />
          </PrivateRoute>
        } />

        <Route path="/mybookings" element={
          <PrivateRoute>
            <MyBookingsPage />
          </PrivateRoute>
        } />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
