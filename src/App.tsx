// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Jobs from './pages/Jobs';
import Learning from './pages/Learning';
import Community from './pages/Community';
import BikeSharing from './pages/BikeSharing';
import News from './pages/News';
import Chat from './pages/Chat';
import ContentSharing from './pages/ContentSharing';
import TodoList from './pages/TodoList';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Signup from './pages/Signup';
import Content from './pages/Content';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/jobs" element={<Jobs />} />
              <Route path='/signup' element={<Signup />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/community" element={<Community />} />
              <Route path="/bike-sharing" element={<BikeSharing />} />
              <Route path="/news" element={<News />} />
              <Route path="/content" element={<ContentSharing />} /> {/* Route to display posts */}
              <Route path="/post" element={<Content></Content>}></Route>
              <Route path="/todo" element={<TodoList />} />
            </Routes>
          </main>
          <Footer />
          {/* Chat Button */}
          <Chat />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
