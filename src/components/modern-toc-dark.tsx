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

const ModernTableOfContentsDark = () => {
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
          className="w-full flex items-center p-4 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg text-white hover:from-blue-800 hover:to-purple-800 transition-all duration-300"
        >
          <Icon className="w-6 h-6 mr-3" />
          <span className="text-lg font-semibold">{number}. {title}</span>
          <ChevronRight className={`ml-auto transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
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
    <div className="flex items-center p-3 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg text-gray-200 hover:from-gray-800 hover:to-gray-700 transition-all duration-300">
      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
      <span>{number} {title}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src="/api/placeholder/1920/600" 
          alt="Space background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Puzzles to Unravel the Universe
          </h1>
          <p className="text-xl text-gray-200 mb-6">By Cumrun Vafa, Harvard University</p>
          <div className="flex space-x-4">
            <div className="px-6 py-3 bg-blue-600 rounded-lg text-white">
              Premium Access
            </div>
            <div className="px-6 py-3 bg-purple-600 rounded-lg text-white">
              Regular Edition
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-3xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Table of Contents
          </h2>
          <p className="text-gray-400 mt-2">Explore the chapters</p>
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

export default ModernTableOfContentsDark;