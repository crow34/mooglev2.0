import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';

interface Props {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    }`}>
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6 md:gap-12">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-blue-500">M</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
            <span className="text-gray-200 text-sm md:text-base ml-1">movies</span>
          </h1>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search titles..."
              className="w-32 md:w-64 bg-black/50 text-white px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </form>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-white cursor-pointer hover:text-gray-300" />
          <User className="w-5 h-5 md:w-6 md:h-6 text-white cursor-pointer hover:text-gray-300" />
        </div>
      </div>
    </nav>
  );
}