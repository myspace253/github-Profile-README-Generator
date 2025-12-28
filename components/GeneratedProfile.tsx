
import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface GeneratedProfileProps {
  markdown: string;
  isLoading: boolean;
}

const GeneratedProfile: React.FC<GeneratedProfileProps> = ({ markdown, isLoading }) => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (markdown) {
      setHasCopied(false);
    }
  }, [markdown]);

  const handleCopy = () => {
    if (markdown) {
      navigator.clipboard.writeText(markdown);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  const Placeholder = () => (
    <div className="flex flex-col items-center justify-center text-center h-full text-gray-500">
       <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a12.025 12.025 0 01-4.132 4.04m2.259-2.259a12.025 12.025 0 00-4.132-4.04m-2.259 2.259a6 6 0 01-7.38-5.84m12.22 0A12.025 12.025 0 009.62 4.132M14.37 15.59a6 6 0 01-2.56-5.84m-2.56 5.84a12.025 12.025 0 01-4.04-4.132M15.59 14.37A12.025 12.025 0 0019.5 9.62M14.37 15.59a6 6 0 01-5.84 7.38m5.84-7.38a12.025 12.025 0 014.132-4.04M9.62 19.5a12.025 12.025 0 01-4.132-4.04m4.132 4.04a6 6 0 01-7.38-5.84m7.38 5.84A12.025 12.025 0 0014.37 15.59m-4.75 0a12.025 12.025 0 01-4.04-4.132" />
      </svg>
      <h3 className="text-xl font-semibold text-gray-400">Your README will appear here</h3>
      <p className="mt-2 max-w-sm">Fill out the form and click "Generate" to see the magic happen!</p>
    </div>
  );

  return (
    <div className="relative flex-grow flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-100">Generated README</h2>
        {markdown && (
            <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
                {hasCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                {hasCopied ? 'Copied!' : 'Copy Markdown'}
            </button>
        )}
      </div>

      <div className="relative flex-grow bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-700">
        {isLoading && (
            <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
                <div className="text-center">
                    <svg className="animate-spin mx-auto h-10 w-10 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-3 text-gray-300">Generating your profile...</p>
                </div>
            </div>
        )}
        {markdown ? (
          <pre className="text-sm whitespace-pre-wrap font-mono text-gray-300">
            <code>{markdown}</code>
          </pre>
        ) : (
          !isLoading && <Placeholder />
        )}
      </div>
    </div>
  );
};

export default GeneratedProfile;
