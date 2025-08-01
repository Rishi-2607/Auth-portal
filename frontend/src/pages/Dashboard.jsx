import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowWelcome(false);
      setShowQuote(true);
    }, 3000); // Show quote after 3s

    const timer2 = setTimeout(() => {
      setShowQuote(false);
    }, 6000); // Hide quote after 6s total

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get('token');

    if (tokenFromURL) {
      localStorage.setItem('token', tokenFromURL);
      window.history.replaceState({}, '', '/dashboard');
    }

    const token = localStorage.getItem('token');

    if (!token) {
      toast.warning('Please log in to access the dashboard');
      navigate('/login');
      return;
    }

    async function fetchData() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const res = await fetch(`${apiUrl}/api/userinfo`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format');
        }

        const data = await res.json();

        if (res.ok) {
          setUserData(data);
          setTimeout(() => setShowWelcome(false), 3000);
        } else {
          toast.error(data.message || 'Failed to fetch user data');
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        toast.error('Something went wrong while loading the dashboard');
      }
    }

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out');
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white px-4 overflow-hidden">
      <div className="absolute top-6 left-6 z-50 text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 select-none">
        Auth<span className="text-gray-800 dark:text-white">Portal</span>
      </div>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black to-gray-600 text-white z-40"
          >
            <div className="text-center">
              <h1 className="text-6xl font-extrabold mb-4">
                WELCOME, {userData?.name || 'Leader'} !
              </h1>
              <p className="text-xl">Your command center is loading...</p>
            </div>
          </motion.div>
        )}

        {showQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black to-purple-600 text-white z-40"
          >
            <div className="text-center px-4">
              <h1 className="text-xl italic">
                “There is no gate, no lock, no bolt that you can set upon the freedom of my mind.”
                <br />— <span className="font-semibold">Virginia Woolf</span>
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center min-h-screen z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showWelcome || showQuote ? 0 : 1, y: showWelcome || showQuote ? 50 : 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-white dark:bg-gray-900/80 backdrop-blur-lg border border-white/30 dark:border-gray-700 rounded-2xl shadow-2xl p-8 z-30 transition-all duration-500"
        >
          <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400 text-center">
            Command Center
          </h2>

          <div className="text-lg text-gray-700 dark:text-gray-200 text-center mb-6">
            <b>Welcome back, {userData?.name || 'Leader'} - Young Leader !</b>
          </div>

          <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded shadow-inner">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              📩 Email : {userData?.email || 'Not available'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              📅 Date Joined : {userData?.createdAt
                ? new Date(userData.createdAt).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
}