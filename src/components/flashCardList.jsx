import React from 'react';
import FlashCard from './flashCard';

const FlashCardList = ({ data }) => {
  return (
    <div className="card-grid">
      {data.map((flashcard) => {
        return <FlashCard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
};

export default FlashCardList;
