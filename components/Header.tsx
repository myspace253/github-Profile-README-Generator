
import React from 'react';
import { GitHubIcon } from './icons/GitHubIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/30 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <GitHubIcon className="w-8 h-8 text-white" />
          <span className="text-xl font-bold text-white">Profile README Generator</span>
        </div>
        <a 
          href="https://github.com/myspace253" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          Built for myspace253
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Header;
