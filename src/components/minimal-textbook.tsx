"use client";
import React, { useState } from 'react';
import { Menu, Bot, Presentation, FileText, ChevronRight } from 'lucide-react';
import ArticleContent from './ArticleContent2'; // Import the article content

const MinimalTextbookInterface = () => {
  const [showTOC, setShowTOC] = useState(false);
  const [activeTab, setActiveTab] = useState('regular');
  const [activePanel, setActivePanel] = useState(null);

  
  // Content component that handles MathJax rendering
  const MathContent = ({ children }) => {
    useEffect(() => {
      if (typeof window !== 'undefined' && window.MathJax) {
        window.MathJax.typesetPromise?.()
          .catch((err) => console.error('MathJax typesetting failed:', err));
      }
    }, [children]);
  
    return <div>{children}</div>;
  };

  const tableOfContents = [
    {
      chapter: "Chapter 1: Foundations of AI",
      sections: ["1.1 Historical Context", "1.2 Core Concepts", "1.3 Types of AI Systems"],
    },
    {
      chapter: "Chapter 2: Machine Learning",
      sections: ["2.1 Supervised Learning", "2.2 Unsupervised Learning", "2.3 Reinforcement Learning"],
    },
  ];

  const regularContent = <ArticleContent />;

  const expressContent = (
    <>
      <h1 className="text-2xl font-light mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
        Chapter 1: Introduction to AI (Express)
      </h1>
      <ul className="space-y-4">
        <li className="flex items-start">
          <div className="w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
          <span className="text-slate-800">AI aims to create machines that can perform tasks requiring human intelligence</span>
        </li>
        <li className="flex items-start">
          <div className="w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
          <span className="text-slate-800">Field originated in the 1950s with contributions from Turing, McCarthy, and Minsky</span>
        </li>
        <li className="flex items-start">
          <div className="w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
          <span className="text-slate-800">Core areas: machine learning, neural networks, NLP, and computer vision</span>
        </li>
      </ul>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/70 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setShowTOC(!showTOC)} 
            className="p-2 rounded-lg hover:bg-white/50 text-violet-600 transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <nav className="flex items-center space-x-2 text-sm">
            <span className="text-slate-600 hover:text-violet-500 cursor-pointer transition-colors">Library</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-600 hover:text-violet-500 cursor-pointer transition-colors">Introduction to AI</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-violet-500">Chapter 1</span>
          </nav>

          <div className="flex items-center space-x-1">
            {['tutor', 'presentation', 'summary'].map((panel) => (
              <button
                key={panel}
                onClick={() => setActivePanel(activePanel === panel ? null : panel)}
                className={`p-2 rounded-lg transition-all ${
                  activePanel === panel 
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-violet-500 hover:bg-white/50'
                }`}
              >
                {panel === 'tutor' && <Bot size={20} />}
                {panel === 'presentation' && <Presentation size={20} />}
                {panel === 'summary' && <FileText size={20} />}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* TOC Sidebar */}
        {showTOC && (
          <aside className="w-64 backdrop-blur-xl bg-white/70 border-r border-white/20 h-[calc(100vh-57px)] p-4">
            {tableOfContents.map((chapter, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-light text-slate-800">{chapter.chapter}</h3>
                <ul className="space-y-2 mt-2 text-sm">
                  {chapter.sections.map((section, sIdx) => (
                    <li key={sIdx} className="text-slate-600 hover:text-violet-500 cursor-pointer transition-colors pl-3 border-l border-slate-200 hover:border-violet-500">
                      {section}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 px-4 py-8">
          <div className="max-w-screen-md mx-auto">
            {/* Tabs */}
            <div className="mb-8 flex space-x-6">
              {['regular', 'express'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 transition-all ${
                    activeTab === tab
                      ? 'border-b-2 border-violet-500 text-violet-500 font-light'
                      : 'text-slate-400 hover:text-violet-500'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="prose max-w-none">
              {activeTab === 'regular' ? regularContent : expressContent}
            </div>
          </div>
        </main>

        {/* Side Panel */}
        {activePanel && (
          <aside className="w-64 backdrop-blur-xl bg-white/70 border-l border-white/20 h-[calc(100vh-57px)] p-4">
            <h2 className="text-lg font-light mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
              {activePanel.charAt(0).toUpperCase() + activePanel.slice(1)}
            </h2>
            <p className="text-sm text-slate-600">
              {activePanel === 'tutor' && 'Get help from an AI tutor'}
              {activePanel === 'presentation' && 'Create a presentation'}
              {activePanel === 'summary' && 'View generated summaries'}
            </p>
          </aside>
        )}
      </div>
    </div>
  );
};

export default MinimalTextbookInterface;