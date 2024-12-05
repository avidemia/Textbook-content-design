"use client";
import React, { useState } from 'react';
import { Brain, Bot, Presentation, FileText, X, Send, Menu, Edit, Save, MoreVertical, ChevronRight } from 'lucide-react';


const TextbookInterface = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [activeTab, setActiveTab] = useState('regular');
  const [summaries, setSummaries] = useState([]);
  const [showSummaryAlert, setShowSummaryAlert] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showAuthorMenu, setShowAuthorMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showTOC, setShowTOC] = useState(true);

  const tableOfContents = [
    {
      chapter: "Chapter 1: Foundations of AI",
      active: true,
      sections: [
        { title: "1.1 Historical Context", active: true },
        { title: "1.2 Core Concepts", active: false },
        { title: "1.3 Types of AI Systems", active: false }
      ]
    },
    {
      chapter: "Chapter 2: Machine Learning",
      active: false,
      sections: [
        { title: "2.1 Supervised Learning", active: false },
        { title: "2.2 Unsupervised Learning", active: false },
        { title: "2.3 Reinforcement Learning", active: false }
      ]
    }
  ];

  const iconDescriptions = {
    tutor: "Get personalized help from an AI tutor",
    presentation: "Create a presentation from the current content",
    summary: "Generate a concise summary of the material"
  };

  const handleIconClick = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const handleAddSummary = () => {
    const newSummary = {
      id: Date.now(),
      text: "AI-generated summary of selected content...",
      section: "Chapter 1.2: Introduction to Neural Networks"
    };
    setSummaries([...summaries, newSummary]);
    setShowSummaryAlert(true);
    setTimeout(() => setShowSummaryAlert(false), 3000);
  };

  const regularContent = (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Chapter 1: Introduction to Artificial Intelligence
      </h1>
      <p className="text-gray-800 leading-relaxed mb-4">
        Artificial Intelligence (AI) represents a transformative field in computer science,
        focusing on creating intelligent machines that can simulate human-like learning,
        reasoning, and problem-solving capabilities. This chapter explores the fundamental
        concepts, historical development, and core principles that form the foundation
        of modern AI systems.
      </p>
      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        1.1 Historical Context
      </h2>
      <p className="text-gray-800 leading-relaxed mb-4">
        The journey of AI began in the 1950s when pioneers like Alan Turing, John McCarthy,
        and Marvin Minsky laid the groundwork for what would become one of the most
        influential technological developments in human history.
      </p>
    </>
  );

  const expressContent = (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Chapter 1: Introduction to AI (Express Version)
      </h1>
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Points:</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          <li>AI is about creating intelligent machines that can learn and solve problems</li>
          <li>Started in 1950s with pioneers like Turing, McCarthy, and Minsky</li>
          <li>Core areas: machine learning, neural networks, NLP, computer vision</li>
        </ul>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col h-full">
        {/* Breadcrumbs and Menu Bar */}
        <div className="text-gray-300 p-4">
          <div className="flex items-center mb-3">
            {/* TOC Toggle */}
            <button
              onClick={() => setShowTOC(!showTOC)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors mr-4"
            >
              <Menu size={20} className="text-gray-300" />
            </button>

            {/* Breadcrumbs */}
            <div className="flex-1 flex justify-center items-center">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-[#ffff] hover:text-[#00a1ff] cursor-pointer transition-colors">
                  Library
                </span>
                <ChevronRight size={16} className="text-gray-500" />
                <span className="text-[#ffff] hover:text-[#00a1ff] cursor-pointer transition-colors">
                  Introduction to Artificial Intelligence
                </span>
                <ChevronRight size={16} className="text-gray-500" />
                <span className="text-[#ffffff] hover:text-[#00a1ff]">
                  Chapter 1: Foundations of AI
                </span>
              </div>
            </div>

            {/* Author Menu */}
            <div className="relative">
              <button
                onClick={() => setShowAuthorMenu(!showAuthorMenu)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <MoreVertical size={20} className="text-gray-300" />
              </button>

              {showAuthorMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      setIsEditing(!isEditing);
                      setShowAuthorMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    {isEditing ? (
                      <>
                        <Save size={16} />
                        <span>Save Changes</span>
                      </>
                    ) : (
                      <>
                        <Edit size={16} />
                        <span>Edit Content</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Author Info - Moved to new line */}
          <div className="flex items-center space-x-3 pl-4 mt-4">
            <div className="w-8 h-8 rounded-full bg-[#00a1ff] flex items-center justify-center">
              <img
                src="/api/placeholder/32/32"
                alt="Author"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <span className="text-sm font-medium text-white">Dr. Sarah Johnson</span>
          </div>


        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 p-4">
          <div className="flex-1 flex flex-col max-w-[67rem] mx-auto">
            {/* Navigation and Tabs Container */}
            <div className="flex items-center justify-between mb-0 relative">
              {/* Folder-style Tabs */}
              <div className="flex gap-1 relative z-10">
                <button
                  className={`px-12 py-3 rounded-t-xl text-sm font-medium transition-all relative
                    ${activeTab === 'regular'
                      ? 'bg-white text-[#00a1ff] shadow-[2px_-2px_5px_rgba(0,0,0,0)] border-t-2 border-[#00a1ff]'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }
                  `}
                  onClick={() => setActiveTab('regular')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base">Regular</span>
                  </div>
                  {activeTab === 'regular' && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white" />
                  )}
                </button>
                <button
                  className={`px-12 py-3 rounded-t-xl text-sm font-medium transition-all relative
                    ${activeTab === 'express'
                      ? 'bg-white text-[#00a1ff] shadow-[2px_-2px_5px_rgba(0,0,0,0)] border-t-2 border-[#ffffff]'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }
                  `}
                  onClick={() => setActiveTab('express')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base">Express</span>
                  </div>
                  {activeTab === 'express' && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white" />
                  )}
                </button>
              </div>

              {/* Tool Icons */}
              <div className="flex space-x-2 relative">
                <button 
                  onClick={() => handleIconClick('tutor')}
                  onMouseEnter={() => setHoveredIcon('tutor')}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className={`flex items-center rounded-lg transition-colors ${
                    activePanel === 'tutor' ? 'bg-[#00a1ff] shadow-lg' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <div className="p-2">
                    <Bot size={24} color={activePanel === 'tutor' ? 'white' : '#00a1ff'} />
                  </div>
                  <span className={`hidden md:block pr-3 font-medium ${
                    activePanel === 'tutor' ? 'text-white' : 'text-gray-600'
                  }`}>
                    AI Tutor
                  </span>
                </button>
                
                <button 
                  onClick={() => handleIconClick('presentation')}
                  onMouseEnter={() => setHoveredIcon('presentation')}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className={`flex items-center rounded-lg transition-colors ${
                    activePanel === 'presentation' ? 'bg-[#00a1ff] shadow-lg' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <div className="p-2">
                    <Presentation size={24} color={activePanel === 'presentation' ? 'white' : '#00a1ff'} />
                  </div>
                  <span className={`hidden md:block pr-3 font-medium ${
                    activePanel === 'presentation' ? 'text-white' : 'text-gray-600'
                  }`}>
                    Create Presentation
                  </span>
                </button>
                
                <button 
                  onClick={() => handleIconClick('summary')}
                  onMouseEnter={() => setHoveredIcon('summary')}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className={`flex items-center rounded-lg transition-colors ${
                    activePanel === 'summary' ? 'bg-[#00a1ff] shadow-lg' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <div className="p-2">
                    <FileText size={24} color={activePanel === 'summary' ? 'white' : '#00a1ff'} />
                  </div>
                  <span className={`hidden md:block pr-3 font-medium ${
                    activePanel === 'summary' ? 'text-white' : 'text-gray-600'
                  }`}>
                    Generated Summaries
                  </span>
                </button>

                {/* Floating Description */}
                {hoveredIcon && (
                  <div className="absolute top-full mt-2 right-0 bg-gray-900 text-white text-sm py-2 px-4 rounded shadow-lg z-50 min-w-[200px]">
                    {iconDescriptions[hoveredIcon]}
                  </div>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white shadow-xl rounded-b-lg rounded-tr-lg">
              <div className="p-8">
                <div className="max-w-4xl mx-auto">
                  {activeTab === 'regular' ? regularContent : expressContent}
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          {activePanel && (
            <div className="w-96 bg-white p-6 shadow-xl ml-4 rounded-lg">
              {/* Side panel content */}
            </div>
          )}
        </div>
      </div>

      {/* Summary Added Alert */}
      {showSummaryAlert && (
        <Alert className="fixed bottom-4 right-4 bg-white">
          <AlertDescription className="text-green-600">
            Summary added successfully!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default TextbookInterface;