"use client";
import React, { useState } from 'react';
import { 
  ChevronRight, 
  BookOpen, 
  Atom, 
  Binary, 
  Brain, 
  Compass, 
  Lightbulb, 
  Beaker, 
  CircleDot, 
  BookMarked, 
  CircleEllipsis, 
  FileText 
} from 'lucide-react';

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

  const Chapter = ({ number, title, icon: Icon, children }) => {
    const isExpanded = expandedSections.has(number);
    return (
      <div className="mb-4">
        <button
          onClick={() => toggleSection(number)}
          className="w-full flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-gray-800 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 shadow-sm border border-gray-100"
        >
          <Icon className="w-6 h-6 mr-3 text-blue-600" />
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
      <div className="relative h-96 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-black">
        <img 
          src="/api/placeholder/1920/600" 
          alt="Space background" 
          className="w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Puzzles to Unravel the Universe
            </h1>
            <p className="text-xl text-gray-100 mb-6">By Cumrun Vafa, Harvard University</p>
            <div className="flex space-x-4 justify-center">
              <div className="px-6 py-3 bg-blue-500 rounded-lg text-white shadow-lg hover:bg-blue-600 transition-colors duration-300 backdrop-blur-sm">
                Premium Access
              </div>
              <div className="px-6 py-3 bg-purple-500 rounded-lg text-white shadow-lg hover:bg-purple-600 transition-colors duration-300 backdrop-blur-sm">
                Regular Edition
              </div>
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
          <Chapter number={1} title="An Introduction to Modern Physics" icon={BookOpen} />
          
          <Chapter number={2} title="Symmetry and Conservation Laws" icon={Atom}>
            <SubSection number="2.1" title="Motivating Puzzles" />
            <SubSection number="2.2" title="Symmetry" />
            <SubSection number="2.3" title="Noether's Theorem" />
            <SubSection number="2.4" title="Supersymmetry" />
            <SubSection number="2.5" title="Quasi-Crystals and Symmetry" />
            <SubSection number="2.6" title="Strings and Conservation of Charge" />
            <SubSection number="2.7" title="Spontaneous Symmetry Breaking" />
          </Chapter>

          <Chapter number={3} title="Symmetry Breaking" icon={Binary}>
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

          <Chapter number={4} title="The Power of Simple and Abstract Mathematics" icon={Brain} />
          <Chapter number={5} title="Counter Intuitive Mathematics" icon={Compass} />
          <Chapter number={6} title="Physical Intuition" icon={Lightbulb} />
          <Chapter number={7} title="Counter Intuitive Physics" icon={Beaker} />
          <Chapter number={8} title="Naturalness in Physics Dimensional Analysis" icon={CircleDot} />
          <Chapter number={9} title="Unnaturalness and Large Numbers" icon={Binary} />
          <Chapter number={10} title="Religion and Science" icon={BookMarked} />
          <Chapter number={11} title="Duality" icon={CircleEllipsis} />
          <Chapter number={12} title="Summing Up" icon={FileText} />
        </div>
      </div>
    </div>
  );
};

export default ModernTableOfContentsLight;