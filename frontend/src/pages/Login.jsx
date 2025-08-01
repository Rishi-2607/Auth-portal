import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../components/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get('token');

    if (tokenFromURL) {
      localStorage.setItem('token', tokenFromURL);
      toast.success('Logged in successfully!');
      window.history.replaceState({}, '', '/dashboard');
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        toast.success('Logged in successfully!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Something went wrong');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white px-4 overflow-hidden">
      <div className="absolute top-6 left-6 z-50">
        <Logo />
      </div>

      <div className="flex items-center justify-center min-h-screen z-10 relative">
        <div className="w-full max-w-md bg-white dark:bg-gray-900/80 backdrop-blur-lg border border-white/30 dark:border-gray-700 rounded-2xl shadow-2xl p-8 transition-all duration-500">
          <h2 className="text-4xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            LOGIN
          </h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 mb-4 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 mb-6 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              Log In
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full flex items-center justify-center bg-white dark:bg-gray-100 text-gray-700 border dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-200 py-2 rounded-lg shadow-sm transition"
          >
            <img src="/google_logo.svg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>

          <button
            onClick={handleGitHubLogin}
            className="mt-2 w-full flex items-center justify-center bg-gray-900 text-white border border-gray-800 hover:bg-gray-800 py-2 rounded-lg shadow-sm transition"
          >
            <img src="/github_logo.svg" alt="GitHub" className="w-5 h-5 mr-2" />
            Continue with GitHub
          </button>

          <p className="mt-4 text-center text-sm dark:text-gray-300">
            Don’t have an account?{' '}
            <Link to="/register" className="text-indigo-500 hover:underline dark:text-indigo-400">
              Register Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}