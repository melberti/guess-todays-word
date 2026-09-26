import WordGrid from './WordGrid';
import { useWordList } from '../context/WordListContext';

function TodaysWord({ gameOver, secretWord }) {
  const { wordList } = useWordList();

  return (
    <>
      <h1>Guess The Word</h1>
      <div>
        <WordGrid
          userWord=""
          secretWord=""
          displayWord={gameOver ? secretWord : '_____'}
        />
      </div>
      {wordList?.length === 0 && (
        <p className="intro">
          Guess the 5-letter word. Correct letters in the correct position will
          be green. Letters that are in the word but in a different position
          will be yellow. You have five guesses. Good luck!
        </p>
      )}
    </>
  );
}

export default TodaysWord;
