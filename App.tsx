
import React, { useState } from 'react';
import type { ProfileData } from './types';
import { generateProfileReadme } from './services/geminiService';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import GeneratedProfile from './components/GeneratedProfile';
import { SparklesIcon } from './components/icons/SparklesIcon';
import Footer from './components/Footer';

function App() {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: 'myspace253',
    name: '',
    bio: '',
    workingOn: '',
    learning: '',
    collaborateOn: '',
    contact: '',
    techStack: '',
    hobbies: ''
  });
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedMarkdown('');
    try {
      const markdown = await generateProfileReadme(profileData);
      setGeneratedMarkdown(markdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Craft Your GitHub Profile
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Fill in your details below and let AI create a stunning, animated, and professional README for your GitHub profile.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-100 flex items-center">
              <span className="w-8 h-8 mr-3 text-purple-400">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                 </svg>
              </span>
              Your Information
            </h2>
            <ProfileForm profileData={profileData} onInputChange={handleInputChange} />
          </div>

          <div className="flex flex-col">
            <div className="flex-grow bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col">
               <GeneratedProfile markdown={generatedMarkdown} isLoading={isLoading} />
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-6 h-6" />
                    Generate README
                  </>
                )}
              </button>
              {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
