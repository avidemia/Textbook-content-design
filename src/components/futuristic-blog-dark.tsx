'use client';

import React from 'react';
import { MessageCircle, Share2, Send } from 'lucide-react';

const BlogPost = () => {
  const handleShare = (platform) => {
    let shareUrl = window.location.href;
    let shareText = "Check out this article: The Future of Technology";
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
        break;
    }
  };

  return (
    <div className="w-full bg-gray-900 min-h-screen text-gray-100">
      {/* Hero Image with Overlay Content */}
      <div className="relative h-96">
        <img 
          src="https://adaptivebooks.org/blog-images/codingbootcampjpg-1734565883323.jpg" 
          alt="Futuristic cityscape" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 max-w-6xl mx-auto px-8 flex flex-col justify-end pb-8">
          <h1 className="text-5xl font-bold mb-6 text-white text-center">
            The Future of Technology
          </h1>
          
          <div className="flex justify-between items-center">
            {/* Author Info */}
            <div className="text-gray-200 space-x-4">
              <span>By Sarah Chen</span>
              <span>•</span>
              <span>Dec 21, 2024</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
            
            {/* Share Buttons */}
            <div className="flex space-x-3">
              <button 
                onClick={() => handleShare('twitter')}
                className="p-2 bg-gray-800/50 hover:bg-blue-500/80 rounded-full transition-colors group"
                aria-label="Share on Twitter"
              >
                <Share2 size={20} className="text-gray-200 group-hover:text-white" />
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="p-2 bg-gray-800/50 hover:bg-blue-600/80 rounded-full transition-colors group"
                aria-label="Share on Facebook"
              >
                <MessageCircle size={20} className="text-gray-200 group-hover:text-white" />
              </button>
              <button 
                onClick={() => handleShare('telegram')}
                className="p-2 bg-gray-800/50 hover:bg-blue-400/80 rounded-full transition-colors group"
                aria-label="Share on Telegram"
              >
                <Send size={20} className="text-gray-200 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-gray-800">
        <div className="max-w-6xl mx-auto px-8">
          {/* Article Content */}
          <div className="py-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                As we stand on the precipice of a new technological era, the convergence of artificial intelligence, quantum computing, and biotechnology is reshaping our understanding of what's possible. The innovations emerging from research labs and tech companies around the world are not just incremental improvements – they represent fundamental shifts in how we interact with technology and with each other.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">
                The Rise of Quantum Computing
              </h2>
              
              <p className="text-lg leading-relaxed mb-6">
                Quantum computers are no longer confined to theoretical physics papers. Today's quantum processors are solving complex problems that would take classical computers millennia to complete. From drug discovery to climate modeling, the applications are as vast as they are transformative.
              </p>

              <blockquote className="border-l-4 border-blue-500 pl-4 my-8 italic">
                "The quantum revolution isn't coming – it's already here. The question is no longer if, but when these technologies will become part of our daily lives."
              </blockquote>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                AI and Human Collaboration
              </h2>
              
              <p className="text-lg leading-relaxed mb-6">
                The narrative around artificial intelligence has shifted from replacement to collaboration. We're witnessing the emergence of AI systems that augment human capabilities rather than supplant them. This symbiotic relationship between human intuition and machine precision is opening new frontiers in creativity, scientific discovery, and problem-solving.
              </p>

              <div className="bg-gray-700 rounded-lg p-6 my-8">
                <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Quantum computing is moving from theory to practice
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    AI is evolving towards collaborative systems
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Integration of multiple technologies is key
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDark;