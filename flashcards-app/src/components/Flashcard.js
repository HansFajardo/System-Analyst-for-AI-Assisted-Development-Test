import React, { useState } from 'react';
import './Flashcard.css'; // Ensure this is the correct path if you have specific styles for Flashcard

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flashcard-inner">
        <div className="flashcard-face flashcard-front">
          <p>{question}</p>
        </div>
        <div className="flashcard-face flashcard-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
