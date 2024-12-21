"use client";
import React, { useState } from 'react';
import { ChevronRight, Atom } from 'lucide-react';

const ModernTableOfContentsLight = () => {
  const [expandedSections, setExpandedSections] = useState(new Set([2]));

  const toggleSection = (sectionNumber) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionNumber)) {
        newSet.delete(sectionNumber);
      } else {
        newSet.add(sectionNumber);
      }
      return newSet;
    });
  };

  const Chapter = ({ number, title, children }) => {
    const isExpanded = expandedSections.has(number);
    return (
      <div className="mb-4">
        <button
          onClick={() => toggleSection(number)}
          className="w-full flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-gray-800 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 shadow-sm border border-gray-100"
        >
          <Atom className="w-6 h-6 mr-3 text-blue-600" />
          <span className="text-lg font-semibold">{number}. {title}</span>
          <ChevronRight className={`ml-auto transform transition-transform duration-300 text-gray-400 ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
        {isExpanded && children && (
          <div className="ml-8 mt-2 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  const SubSection = ({ number, title }) => (
    <div className="flex items-center p-3 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-100">
      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
      <span>{number} {title}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-white">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2">
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
          <div className="max-w-4xl">
            <div className="inline-block mb-6">
              <Atom className="w-16 h-16 text-blue-500 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Puzzles to Unravel the Universe
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-light">By Cumrun Vafa, Harvard University</p>
            <div className="flex space-x-6 justify-center">
              <button className="group relative px-8 py-4 bg-white border border-blue-200 rounded-xl text-blue-600 hover:text-white shadow-lg transition-all duration-300">
                <div className="absolute inset-0 w-0 bg-blue-600 rounded-xl group-hover:w-full transition-all duration-300"></div>
                <span className="relative">Premium Access</span>
              </button>
              <button className="group relative px-8 py-4 bg-white border border-purple-200 rounded-xl text-purple-600 hover:text-white shadow-lg transition-all duration-300">
                <div className="absolute inset-0 w-0 bg-purple-600 rounded-xl group-hover:w-full transition-all duration-300"></div>
                <span className="relative">Regular Edition</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-3xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Table of Contents
          </h2>
          <p className="text-gray-500 mt-2">Explore the chapters</p>
        </div>

        <div className="space-y-4">
          <Chapter number={1} title="An Introduction to Modern Physics" />
          
          <Chapter number={2} title="Symmetry and Conservation Laws">
            <SubSection number="2.1" title="Motivating Puzzles" />
            <SubSection number="2.2" title="Symmetry" />
            <SubSection number="2.3" title="Noether's Theorem" />
            <SubSection number="2.4" title="Supersymmetry" />
            <SubSection number="2.5" title="Quasi-Crystals and Symmetry" />
            <SubSection number="2.6" title="Strings and Conservation of Charge" />
            <SubSection number="2.7" title="Spontaneous Symmetry Breaking" />
          </Chapter>

          <Chapter number={3} title="Symmetry Breaking">
            <SubSection number="3.1" title="Earth's Motion and Symmetry Breaking" />
            <SubSection number="3.2" title="Spontaneous Symmetry Breaking" />
            <SubSection number="3.3" title="Spontaneous Symmetry Breaking and Magnets" />
            <SubSection number="3.4" title="The Square Puzzle" />
            <SubSection number="3.5" title="Symmetry Breaking and the Higgs Boson" />
            <SubSection number="3.6" title="Grand Unification of Forces" />
            <SubSection number="3.7" title="Superconductivity" />
            <SubSection number="3.8" title="Rigidity" />
            <SubSection number="3.9" title="Handedness" />
          </Chapter>

          <Chapter number={4} title="The Power of Simple and Abstract Mathematics" />
          <Chapter number={5} title="Counter Intuitive Mathematics" />
          <Chapter number={6} title="Physical Intuition" />
          <Chapter number={7} title="Counter Intuitive Physics" />
          <Chapter number={8} title="Naturalness in Physics Dimensional Analysis" />
          <Chapter number={9} title="Unnaturalness and Large Numbers" />
          <Chapter number={10} title="Religion and Science" />
          <Chapter number={11} title="Duality" />
          <Chapter number={12} title="Summing Up" />
        </div>
      </div>
    </div>
  );
};

export default ModernTableOfContentsLight;