import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to="/"
      className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline"
    >
      Auth<span className="text-gray-800 dark:text-white">Portal</span>
    </Link>
  );
}