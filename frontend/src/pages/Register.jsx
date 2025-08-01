import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../components/Logo';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isStrongPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isValidEmail) {
      toast.warning('Please enter a valid email address');
      return;
    }

    if (!isStrongPassword) {
      toast.info(
        'Password must be at least 8 characters long and include one number and one special character'
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.warning('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        toast.success('Registered successfully!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white px-4 overflow-hidden">
      <div className="absolute top-6 left-6 z-50">
        <Logo />
      </div>

      <div className="flex items-center justify-center min-h-screen z-10 relative">
        <div className="w-full max-w-md bg-white dark:bg-gray-900/80 backdrop-blur-lg border border-white/30 dark:border-gray-700 rounded-2xl shadow-2xl p-8 transition-all duration-500">
          <h2 className="text-4xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            REGISTER
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-3 mb-4 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 mb-4 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 mb-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              8-Digit Password include one number and one special character.
            </p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-3 mb-6 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Please re-enter your password to confirm.
            </p>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full flex items-center justify-center bg-white dark:bg-gray-100 text-gray-700 border dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-200 py-2 rounded-lg shadow-sm transition"
          >
            <img src="/google_logo.svg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>

          <p className="mt-4 text-center text-xs dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-500 hover:underline dark:text-indigo-400">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}