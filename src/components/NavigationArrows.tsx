import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavigationArrows = ({ showTOC, activePanel, tocWidth, sidePanelWidth }) => {
  // Calculate positions based on TOC and side panel state
  const leftPosition = showTOC ? `${tocWidth + 16}px` : '16px';
  const rightPosition = activePanel ? `${sidePanelWidth + 16}px` : '16px';

  return (
    <>
      {/* Previous Arrow */}
      <button 
        className="fixed top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors group"
        onClick={() => console.log('Navigate to previous section')}
        aria-label="Previous section"
        style={{ 
          left: leftPosition,
          zIndex: 15 // Below the sidebars (z-20) but above other content
        }}
      >
        <ChevronLeft 
          size={24} 
          className="text-gray-400 group-hover:text-[#00a1ff] transition-colors" 
        />
      </button>

      {/* Next Arrow */}
      <button 
        className="fixed top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors group"
        onClick={() => console.log('Navigate to next section')}
        aria-label="Next section"
        style={{ 
          right: rightPosition,
          zIndex: 15 // Below the sidebars (z-20) but above other content
        }}
      >
        <ChevronRight 
          size={24} 
          className="text-gray-400 group-hover:text-[#00a1ff] transition-colors" 
        />
      </button>
    </>
  );
};

export default NavigationArrows;