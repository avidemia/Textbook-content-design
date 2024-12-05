"use client";
import React, { useState, useEffect } from "react";
import {
  Bot,
  Presentation,
  FileText,
  Menu,
  Edit,
  Save,
  MoreVertical,
  ChevronRight,
} from "lucide-react";

const TextbookInterface = () => {
  // State variables
  const [activePanel, setActivePanel] = useState(null);
  const [activeTab, setActiveTab] = useState("regular");
  const [summaries, setSummaries] = useState([]);
  const [showSummaryAlert, setShowSummaryAlert] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showAuthorMenu, setShowAuthorMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showTOC, setShowTOC] = useState(false); // TOC is closed by default

  // State variables for resizing
  const [sidePanelWidth, setSidePanelWidth] = useState(384); // Default width in pixels
  const [isResizingSidePanel, setIsResizingSidePanel] = useState(false);

  const [tocWidth, setTocWidth] = useState(256); // Default TOC width
  const [isResizingTOC, setIsResizingTOC] = useState(false);

  // State for main container padding
  const [containerPadding, setContainerPadding] = useState({
    paddingLeft: 0,
    paddingRight: 0,
  });

  const tableOfContents = [
    {
      chapter: "Chapter 1: Foundations of AI",
      active: true,
      sections: [
        { title: "1.1 Historical Context", active: true },
        { title: "1.2 Core Concepts", active: false },
        { title: "1.3 Types of AI Systems", active: false },
      ],
    },
    {
      chapter: "Chapter 2: Machine Learning",
      active: false,
      sections: [
        { title: "2.1 Supervised Learning", active: false },
        { title: "2.2 Unsupervised Learning", active: false },
        { title: "2.3 Reinforcement Learning", active: false },
      ],
    },
  ];

  const iconDescriptions = {
    tutor: "Get personalized help from an AI tutor",
    presentation: "Create a presentation from the current content",
    summary: "Generate a concise summary of the material",
  };

  // Event handlers for side panel resizing
  const handleSidePanelMouseDown = (e) => {
    setIsResizingSidePanel(true);
    e.preventDefault();
  };

  const handleSidePanelMouseMove = (e) => {
    if (isResizingSidePanel) {
      const mainContentWidth = 67 * 16; // 67rem in pixels
      const minMainContentWidth = 40 * 16; // Minimum width for main content (40rem)
      const tocSpace = showTOC ? tocWidth : 0;
      const maxSidePanelWidth = window.innerWidth - tocSpace - minMainContentWidth - 2; // 2px buffer

      let newWidth = window.innerWidth - e.clientX;
      newWidth = Math.min(newWidth, maxSidePanelWidth);
      newWidth = Math.max(0, newWidth);

      setSidePanelWidth(newWidth);
    }
  };

  const handleSidePanelMouseUp = () => {
    if (isResizingSidePanel) {
      setIsResizingSidePanel(false);
    }
  };

  // Event handlers for TOC resizing
  const handleTOCMouseDown = (e) => {
    setIsResizingTOC(true);
    e.preventDefault();
  };

  const handleTOCMouseMove = (e) => {
    if (isResizingTOC) {
      const mainContentWidth = 67 * 16; // 67rem in pixels
      const minMainContentWidth = 40 * 16; // Minimum width for main content (40rem)
      const sidePanelSpace = activePanel ? sidePanelWidth : 0;
      const maxTOCWidth = window.innerWidth - sidePanelSpace - minMainContentWidth - 2; // 2px buffer

      let newWidth = e.clientX;
      newWidth = Math.min(newWidth, maxTOCWidth);
      newWidth = Math.max(0, newWidth);

      setTocWidth(newWidth);
    }
  };

  const handleTOCMouseUp = () => {
    if (isResizingTOC) {
      setIsResizingTOC(false);
    }
  };

  useEffect(() => {
    if (isResizingSidePanel || isResizingTOC) {
      document.addEventListener(
        "mousemove",
        isResizingSidePanel ? handleSidePanelMouseMove : handleTOCMouseMove
      );
      document.addEventListener(
        "mouseup",
        isResizingSidePanel ? handleSidePanelMouseUp : handleTOCMouseUp
      );
    } else {
      document.removeEventListener("mousemove", handleSidePanelMouseMove);
      document.removeEventListener("mouseup", handleSidePanelMouseUp);
      document.removeEventListener("mousemove", handleTOCMouseMove);
      document.removeEventListener("mouseup", handleTOCMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleSidePanelMouseMove);
      document.removeEventListener("mouseup", handleSidePanelMouseUp);
      document.removeEventListener("mousemove", handleTOCMouseMove);
      document.removeEventListener("mouseup", handleTOCMouseUp);
    };
  }, [isResizingSidePanel, isResizingTOC]);

  // Adjust main container padding based on TOC and side panel widths
  useEffect(() => {
    const adjustLayout = () => {
      const viewportWidth = window.innerWidth;
      const defaultMainContentWidth = 67 * 16; // 67rem in pixels
      const minMainContentWidth = 40 * 16; // 40rem in pixels
      const totalSidePanelsWidth = (showTOC ? tocWidth : 0) + (activePanel ? sidePanelWidth : 0) + 2; // 2px buffer
      
      let mainContentWidth = defaultMainContentWidth;
      let paddingLeft = 0;
      let paddingRight = 0;

      // If panels take up too much space, reduce main content width
      if (totalSidePanelsWidth + defaultMainContentWidth > viewportWidth) {
        mainContentWidth = Math.max(minMainContentWidth, viewportWidth - totalSidePanelsWidth);
      }

      // Calculate padding to center the main content in remaining space
      const remainingSpace = viewportWidth - totalSidePanelsWidth - mainContentWidth;
      if (remainingSpace > 0) {
        const padding = Math.floor(remainingSpace / 2);
        paddingLeft = showTOC ? tocWidth : padding;
        paddingRight = activePanel ? sidePanelWidth : padding;
      } else {
        paddingLeft = showTOC ? tocWidth : 0;
        paddingRight = activePanel ? sidePanelWidth : 0;
      }

      setContainerPadding({ paddingLeft, paddingRight });
      
      // Apply the new width to the main content
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        (mainContent as HTMLElement).style.width = `${mainContentWidth}px`;
      }
    };

    adjustLayout();
    window.addEventListener('resize', adjustLayout);

    return () => {
      window.removeEventListener('resize', adjustLayout);
    };
  }, [tocWidth, sidePanelWidth, showTOC, activePanel]);

  // Other event handlers
  const handleIconClick = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const handleAddSummary = () => {
    const newSummary = {
      id: Date.now(),
      text: "AI-generated summary of selected content...",
      section: "Chapter 1.2: Introduction to Neural Networks",
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
        Artificial Intelligence (AI) represents a transformative field in
        computer science, focusing on creating intelligent machines that can
        simulate human-like learning, reasoning, and problem-solving
        capabilities. This chapter explores the fundamental concepts, historical
        development, and core principles that form the foundation of modern AI
        systems.
      </p>
      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        1.1 Historical Context
      </h2>
      <p className="text-gray-800 leading-relaxed mb-4">
        The journey of AI began in the 1950s when pioneers like Alan Turing,
        John McCarthy, and Marvin Minsky laid the groundwork for what would
        become one of the most influential technological developments in human
        history.
      </p>
      {/* Add more content as needed */}
    </>
  );

  const expressContent = (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Chapter 1: Introduction to AI (Express Version)
      </h1>
      <p className="text-gray-800 leading-relaxed mb-4">
        This express version provides a concise overview of the key concepts in
        AI. It covers the essential topics without the in-depth explanations
        found in the regular version.
      </p>
      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Key Points
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-800">
        <li>
          AI aims to create machines that can perform tasks requiring human
          intelligence.
        </li>
        <li>
          The field originated in the 1950s with significant contributions from
          Turing, McCarthy, and Minsky.
        </li>
        <li>
          Core areas include machine learning, neural networks, natural language
          processing, and computer vision.
        </li>
      </ul>
      {/* Ensure the structure and styling match the regular content */}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative">
      {/* Header */}
      <div className="text-gray-300 p-4">
        {/* Navigation Bar */}
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
              <span className="text-white hover:text-[#00a1ff] cursor-pointer transition-colors">
                Library
              </span>
              <ChevronRight size={16} className="text-gray-500" />
              <span className="text-white hover:text-[#00a1ff] cursor-pointer transition-colors">
                Introduction to Artificial Intelligence
              </span>
              <ChevronRight size={16} className="text-gray-500" />
              <span className="text-white hover:text-[#00a1ff]">
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

        {/* Author Info */}
        <div className="max-w-[67rem] mx-auto">
          <div className="flex items-center space-x-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-[#00a1ff] flex items-center justify-center">
              <img
                src="/api/placeholder/32/32"
                alt="Author"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <span className="text-sm font-medium text-white">
              Dr. Sarah Johnson
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="flex h-full relative"
        style={{
          paddingLeft: containerPadding.paddingLeft,
          paddingRight: containerPadding.paddingRight,
        }}
      >
        {/* TOC */}
        {showTOC && (
          <div
            className="bg-white p-4 shadow-lg absolute top-0 left-0 h-full z-20"
            style={{ width: tocWidth }}
          >
            {/* Resizer */}
            <div
              className="absolute right-0 top-0 h-full w-2 cursor-ew-resize"
              onMouseDown={handleTOCMouseDown}
            ></div>

            {/* Table of Contents */}
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            {tableOfContents.map((chapter, idx) => (
              <div key={idx} className="mb-4">
                <div
                  className={`font-semibold ${
                    chapter.active ? "text-blue-600" : "text-gray-800"
                  }`}
                >
                  {chapter.chapter}
                </div>
                <ul className="pl-4 mt-2">
                  {chapter.sections.map((section, sIdx) => (
                    <li
                      key={sIdx}
                      className={`mt-1 ${
                        section.active ? "text-blue-500" : "text-gray-600"
                      }`}
                    >
                      {section.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Side Panel */}
        {activePanel && (
          <div
            className="bg-white p-6 shadow-lg absolute top-0 right-0 h-full z-20"
            style={{ width: sidePanelWidth }}
          >
            {/* Resizer */}
            <div
              className="absolute left-0 top-0 h-full w-2 cursor-ew-resize"
              onMouseDown={handleSidePanelMouseDown}
            ></div>

            {/* Side panel content */}
            <h2 className="text-xl font-bold mb-4">
              {activePanel === "tutor" && "AI Tutor"}
              {activePanel === "presentation" && "Presentation Creator"}
              {activePanel === "summary" && "Generated Summaries"}
            </h2>
            {/* Additional content based on activePanel */}
          </div>
        )}

        {/* Main Content */}
        <div
          className="flex flex-col flex-1 items-center"
          style={{ maxWidth: "67rem", margin: "0 auto" }}
        >
          {/* Navigation and Tabs Container */}
          <div className="flex items-center justify-between mb-0 relative w-full">
            {/* Folder-style Tabs */}
            <div className="flex gap-1 relative z-10">
              <button
                className={`px-12 py-3 rounded-t-xl text-sm font-medium transition-all relative
                  ${
                    activeTab === "regular"
                      ? "bg-white text-[#00a1ff] shadow-[2px_-2px_5px_rgba(0,0,0,0)] border-t-2 border-[#00a1ff]"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }
                `}
                onClick={() => setActiveTab("regular")}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-base">Regular</span>
                </div>
                {activeTab === "regular" && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white" />
                )}
              </button>
              <button
                className={`px-12 py-3 rounded-t-xl text-sm font-medium transition-all relative
                  ${
                    activeTab === "express"
                      ? "bg-white text-[#00a1ff] shadow-[2px_-2px_5px_rgba(0,0,0,0)] border-t-2 border-[#ffffff]"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }
                `}
                onClick={() => setActiveTab("express")}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-base">Express</span>
                </div>
                {activeTab === "express" && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white" />
                )}
              </button>
            </div>

            {/* Tool Icons */}
            <div className="flex space-x-2 relative">
              <button
                onClick={() => handleIconClick("tutor")}
                onMouseEnter={() => setHoveredIcon("tutor")}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`flex items-center rounded-lg transition-colors ${
                  activePanel === "tutor"
                    ? "bg-[#00a1ff] shadow-lg"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <div className="p-2">
                  <Bot
                    size={24}
                    color={activePanel === "tutor" ? "white" : "#00a1ff"}
                  />
                </div>
                <span
                  className={`hidden md:block pr-3 font-medium ${
                    activePanel === "tutor" ? "text-white" : "text-gray-600"
                  }`}
                >
                  AI Tutor
                </span>
              </button>

              <button
                onClick={() => handleIconClick("presentation")}
                onMouseEnter={() => setHoveredIcon("presentation")}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`flex items-center rounded-lg transition-colors ${
                  activePanel === "presentation"
                    ? "bg-[#00a1ff] shadow-lg"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <div className="p-2">
                  <Presentation
                    size={24}
                    color={
                      activePanel === "presentation" ? "white" : "#00a1ff"
                    }
                  />
                </div>
                <span
                  className={`hidden md:block pr-3 font-medium ${
                    activePanel === "presentation"
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  Create Presentation
                </span>
              </button>

              <button
                onClick={() => handleIconClick("summary")}
                onMouseEnter={() => setHoveredIcon("summary")}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`flex items-center rounded-lg transition-colors ${
                  activePanel === "summary"
                    ? "bg-[#00a1ff] shadow-lg"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <div className="p-2">
                  <FileText
                    size={24}
                    color={activePanel === "summary" ? "white" : "#00a1ff"}
                  />
                </div>
                <span
                  className={`hidden md:block pr-3 font-medium ${
                    activePanel === "summary" ? "text-white" : "text-gray-600"
                  }`}
                >
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
          <div className="flex-1 bg-white shadow-xl rounded-b-lg rounded-tr-lg overflow-auto w-full main-content">
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                {activeTab === "regular" ? regularContent : expressContent}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Added Alert */}
      {showSummaryAlert && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow-lg">
          <p className="text-green-600">Summary added successfully!</p>
        </div>
      )}
    </div>
  );
};

export default TextbookInterface;
