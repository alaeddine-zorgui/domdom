import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster, ToastProvider } from './components/ui/Toaster';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
          <Toaster />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;