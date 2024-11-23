import { Link } from 'react-router-dom';

function SettingsPanel({ darkMode, toggleDarkMode }) {
  return (
    <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 shadow-md">
      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin</Link>
      <hr className="my-1 border-gray-200" />
      <div className="px-4 py-2 flex items-center justify-between">
        <span className="text-sm text-gray-700">Dark Mode</span>
        <button
          onClick={toggleDarkMode}
          className={`${
            darkMode ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
        >
          <span
            className={`${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </button>
      </div>
    </div>
  );
}

export default SettingsPanel;