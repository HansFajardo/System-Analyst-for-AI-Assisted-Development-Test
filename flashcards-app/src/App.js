import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Flashcard from './components/Flashcard'; // Ensure correct path
import './App.css';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*');

    if (error) {
      console.error('Error fetching flashcards:', error);
      return;
    }

    setFlashcards(data);
  };

  const addFlashcard = async () => {
    const { data, error } = await supabase
      .from('flashcards')
      .insert([{ question, answer }]);

    if (error) {
      console.error('Error adding flashcard:', error);
      return;
    }

    setQuestion('');
    setAnswer('');
    fetchFlashcards(); // Refresh the list
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addFlashcard}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Flashcard
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {flashcards.map((card) => (
          <Flashcard key={card.id} question={card.question} answer={card.answer} />
        ))}
      </div>
    </div>
  );
};

export default App;
