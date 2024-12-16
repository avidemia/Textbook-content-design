"use client";
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Radical, Atom, BarChart3, Cog, Moon, Sun } from 'lucide-react';

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
    color: "bg-blue-500 dark:bg-blue-600",
    lightColor: "bg-blue-100 dark:bg-blue-900/50"
  },
  Physics: {
    icon: Atom,
    color: "bg-purple-500 dark:bg-purple-600",
    lightColor: "bg-purple-100 dark:bg-purple-900/50"
  },
  Statistics: {
    icon: BarChart3,
    color: "bg-green-500 dark:bg-green-600",
    lightColor: "bg-green-100 dark:bg-purple-900/50"
  },
  Engineering: {
    icon: Cog,
    color: "bg-orange-500 dark:bg-orange-600",
    lightColor: "bg-orange-100 dark:bg-purple-900/50"
  }
};

const DifficultyBadge = ({ level }) => {
  const colors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level]}`}>
      {level}
    </span>
  );
};

const ModernBookCatalog = () => {
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 pb-32 pt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white">Adaptive Books Library</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
            </button>
          </div>
          <p className="text-lg md:text-xl text-white/90">Discover our collection of educational resources</p>
        </div>
      </div>

      {/* Search and Filters Container */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 mb-8">
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search books..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap">
          {AVAILABLE_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white dark:bg-blue-500' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'
              }`}
            >
              {category !== 'All' && categoryConfig[category] && (
                <span className="inline-flex items-center">
                  {React.createElement(categoryConfig[category].icon, { 
                    className: "w-5 h-5 mr-2" 
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
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book, index) => {
            const categoryData = categoryConfig[book.category];
            const Icon = categoryData?.icon || BookOpen;

            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                {/* Category Icon Badge */}
                <div className="relative">
                  <div className={`absolute top-2 left-2 z-10 ${categoryData?.lightColor || 'bg-gray-100'} p-3 rounded-lg`}>
                    <Icon className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                  </div>
                  
                  {/* Book Cover Image */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                        src={book.imageUrl || `/api/placeholder/${book.imageWidth}/${book.imageHeight}`}
                        alt={`Cover of ${book.title}`}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `/api/placeholder/${book.imageWidth}/${book.imageHeight}`;
                        }}
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-6 left-6 right-6">
                        <DifficultyBadge level={book.difficulty} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Book Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 dark:text-white">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 text-base">
                    {book.author}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-base mb-6 line-clamp-2">
                    {book.description}
                  </p>
                  
                  <div className="flex justify-end">
                    <button className="px-6 py-2.5 text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
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

export default ModernBookCatalog;