import React, { useState, useEffect, useRef } from 'react';

const FlashCard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [flashcard.front, flashcard.back]);
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <div
      className={`card bg-white rounded-lg shadow-md hover:shadow-none w-full ${
        flip ? 'flip' : ''
      }`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}>
      <div className="front focus:outline-none focus:ring-0" ref={frontEl}>
        <span className="jp-font font-semibold text-gray-700">
          {flashcard.front}
        </span>
      </div>
      <div className="back focus:outline-none focus:ring-0" ref={backEl}>
        <span className="jp-font font-semibold text-gray-700">
          {flashcard.back}
        </span>
      </div>
    </div>
  );
};

export default FlashCard;
