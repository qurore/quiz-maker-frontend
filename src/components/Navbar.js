import { Link } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiFileListLine } from 'react-icons/ri';
import { useState, useRef, useEffect } from 'react';
import SettingsPanel from './SettingsPanel';

function Navbar() {
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const settingsRef = useRef(null);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
        <div className="flex items-center space-x-4">
          <Link to="/review" className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none flex items-center">
            <RiFileListLine className="h-6 w-6" />
            <span className="ml-1">Review</span>
            <IoMdArrowDropdown className="h-4 w-4 ml-1 mr-2" />
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