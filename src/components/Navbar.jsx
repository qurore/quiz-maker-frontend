import { Link } from 'react-router-dom';
import { FiSettings, FiSearch } from 'react-icons/fi';
import { RiFileListLine } from 'react-icons/ri';
import { useState, useRef, useEffect } from 'react';
import SettingsPanel from './SettingsPanel';

function Navbar() {
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const settingsRef = useRef(null);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.open(`/search?word=${encodeURIComponent(searchTerm.trim())}`, '_blank');
      setSearchTerm('');
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [settingsRef]);

  return (
    <nav className="border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Quiz Maker</Link>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search technical term..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FiSearch className="h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <Link to="/review" className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none flex items-center mr-4">
            <RiFileListLine className="h-6 w-6" />
            <span className="ml-1">Review</span>
          </Link>
          <div className="relative" ref={settingsRef}>
            <button 
              onClick={toggleSettings}
              className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none flex items-center"
            >
              <FiSettings className="h-6 w-6" />
            </button>
            {showSettings && (
              <SettingsPanel darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;