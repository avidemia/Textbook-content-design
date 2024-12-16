"use client";
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Radical, Atom, BarChart3, Cog, Moon, Sun } from 'lucide-react';
import { getPreviouslyCachedImageOrNull } from 'next/dist/server/image-optimizer';

const books = {
  Mathematics: [
    { 
      title: "A Quick Review of Precalculus", 
      author: "Kamyar M. Davoudi",
      description: "Quick review of essential concepts needed for calculus",
      difficulty: "Intermediate",
      color: "bg-blue-500",
      imageWidth: 640,
      imageHeight: 360,
      imageUrl: "https://adaptivebooks.org/books/PreCalculus1png-1701064457277.png"
    },
    { 
      title: "Calculus Made Easy", 
      author: "Silvanus P. Thompson, Kamyar M. Davoudi",
      description: "A simplified approach to calculus fundamentals",
      difficulty: "Beginner",
      color: "bg-blue-600",
      imageWidth: 640,
      imageHeight: 360,
      imageUrl: "https://adaptivebooks.org/books/CMEjpg-1720646705431.jpg"
      
    }
  ],
  Physics: [
    { 
      title: "Puzzles to Unravel the Universe", 
      author: "C. Vafa",
      description: "Explore physics concepts through engaging puzzles",
      difficulty: "Advanced",
      color: "bg-purple-500",
      imageWidth: 640,
      imageHeight: 360,
      imageUrl: "https://adaptivebooks.org/books/PuzzlesCoverpng-1724829997641.png"
    }
  ],
  Statistics: [
    { 
      title: "Probability Theory and Its Applications", 
      author: "Emanuel Parzen",
      description: "Comprehensive guide to modern probability theory",
      difficulty: "Advanced",
      color: "bg-green-500",
      imageWidth: 640,
      imageHeight: 360,
      imageUrl: "https://adaptivebooks.org/books/ParzenProbabilitypng-1723673311009.png"
    }
  ],
  Engineering: [
    { 
      title: "Statics", 
      author: "George W. Housner, Donald E. Hudson",
      description: "Fundamental principles of engineering statics",
      difficulty: "Intermediate",
      color: "bg-orange-500",
      imageWidth: 640,
      imageHeight: 360,
      imageUrl: "https://adaptivebooks.org/books/StaticsHousnerHudsonpng-1724256137605.png"
    }
  ]
};

const AVAILABLE_CATEGORIES = ['All', ...Object.keys(books)];

const categoryConfig = {
  Mathematics: {
    icon: Radical,
    color: "bg-blue-500",
    lightColor: "bg-blue-100"
  },
  Physics: {
    icon: Atom,
    color: "bg-purple-500",
    lightColor: "bg-purple-100"
  },
  Statistics: {
    icon: BarChart3,
    color: "bg-green-500",
    lightColor: "bg-green-100"
  },
  Engineering: {
    icon: Cog,
    color: "bg-orange-500",
    lightColor: "bg-orange-100"
  }
};

const DifficultyBadge = ({ level }) => {
  const colors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level]}`}>
      {level}
    </span>
  );
};

const ModernBookCatalogDark = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredBooks = Object.entries(books).reduce((acc, [category, categoryBooks]) => {
    if (activeCategory === 'All' || activeCategory === category) {
      const filtered = categoryBooks.filter(book => 
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      );
      return [...acc, ...filtered.map(book => ({ ...book, category }))];
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-[#171923] text-white">
      {/* Header Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Library</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {AVAILABLE_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category !== 'All' && categoryConfig[category] && (
                  <span className="inline-flex items-center">
                    {React.createElement(categoryConfig[category].icon, { 
                      className: "w-4 h-4 mr-2" 
                    })}
                    {category}
                  </span>
                )}
                {category === 'All' && 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => {
            const categoryData = categoryConfig[book.category];
            const Icon = categoryData?.icon || BookOpen;

            return (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all duration-200 group">
                {/* Category Icon Badge */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur p-2 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  {/* Book Cover Image */}
                  <div className="relative aspect-video overflow-hidden bg-gray-900">
                    <img
                      src={book.imageUrl || `/api/placeholder/${book.imageWidth}/${book.imageHeight}`}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `/api/placeholder/${book.imageWidth}/${book.imageHeight}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <DifficultyBadge level={book.difficulty} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Book Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-400 mb-2 text-sm">
                    {book.author}
                  </p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {book.description}
                  </p>
                  
                  <div className="flex justify-end">
                    <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModernBookCatalogDark;