'use client'; // This directive is needed for Next.js interactive components

import { useState } from 'react';
import { Plus, Link as LinkIcon, Sparkles } from 'lucide-react';

export default function IdeaBrain() {
  // State to hold the current input
  const [inputText, setInputText] = useState('');
  
  // State to hold our list of ideas (Mock data for now)
  const [ideas, setIdeas] = useState([
    { id: 1, content: "App that tracks water intake and gamifies hydration.", tags: ["Health", "App"] },
    { id: 2, content: "Smart water bottle hardware with bluetooth.", tags: ["Hardware", "Health"] },
  ]);

  // Function to add a new idea
  const handleAddIdea = () => {
    if (!inputText.trim()) return;
    
    const newIdea = {
      id: Date.now(),
      content: inputText,
      tags: ["New"], // You can add logic to auto-tag later
    };

    // Add to the TOP of the list
    setIdeas([newIdea, ...ideas]);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col md:flex-row">
      
      {/* LEFT COLUMN: Main Input & List */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-indigo-900">My Idea Brain 🧠</h1>
        <p className="text-gray-500 mb-8">Capture your thoughts and let AI connect the dots.</p>

        {/* Input Section */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <textarea
            className="w-full p-4 text-lg border-none focus:ring-0 resize-none outline-none text-gray-700 placeholder-gray-400"
            rows="3"
            placeholder="What's on your mind? (e.g., 'A drone that plants trees...')"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); 
                    handleAddIdea();
                }
            }}
          />
          <div className="flex justify-between items-center mt-2 border-t pt-3 border-gray-100">
            <span className="text-xs text-gray-400">Press Enter to save</span>
            <button 
              onClick={handleAddIdea}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium"
            >
              <Plus size={18} /> Save Idea
            </button>
          </div>
        </div>

        {/* Ideas Feed */}
        <div className="space-y-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <p className="text-lg text-gray-800 mb-3">{idea.content}</p>
              
              <div className="flex justify-between items-center">
                {/* Tags */}
                <div className="flex gap-2">
                  {idea.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions (Visible on Hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 text-gray-400">
                  <button className="hover:text-indigo-600" title="Link to another idea">
                    <LinkIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* RIGHT COLUMN: The AI "Sidebar" */}
      <aside className="w-full md:w-80 bg-white border-l border-gray-200 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-6 text-indigo-600">
          <Sparkles size={20} />
          <h2 className="font-bold text-lg">AI Connections</h2>
        </div>
        
        {/* Mock suggestion */}
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4">
          <p className="text-xs font-bold text-indigo-800 uppercase tracking-wide mb-1">Context Match: 92%</p>
          <p className="text-sm text-gray-700 mb-2">
            Your idea about <b>"Smart Water Bottle"</b> seems related to:
          </p>
          <div className="bg-white p-2 rounded border border-indigo-100 text-sm text-gray-600">
            "App that tracks water intake..."
          </div>
          <button className="mt-3 text-xs text-indigo-600 font-semibold hover:underline">
            Link these ideas →
          </button>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm">Add more ideas to see connections appear here.</p>
        </div>
      </aside>

    </div>
  );
}