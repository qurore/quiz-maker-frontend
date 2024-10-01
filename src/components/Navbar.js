import { Link } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiFileListLine } from 'react-icons/ri';

function Navbar() {
  return (
    <nav className="border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Quiz Maker</Link>
        <div className="flex items-center space-x-4">
          <Link to="/review" className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none flex items-center">
            <RiFileListLine className="h-6 w-6" />
            <span className="ml-1 mr-2">Review</span>
          </Link>
          <button className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none flex items-center">
            <FiSettings className="h-6 w-6" />
            <IoMdArrowDropdown className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;