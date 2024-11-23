import { Link } from 'react-router-dom';

function SettingsPanel() {
  return (
    <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 shadow-md">
      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin</Link>
      <Link to="/user-guide" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User Guide</Link>
    </div>
  );
}

export default SettingsPanel;