import { useRef, useEffect } from 'react';
import { useWordList } from '../context/WordListContext';
import { useWord } from '../context/WordContext';
import { useDisabled } from '../context/DisabledContext';
import WordList from './WordList';

function WordGuess({ secretWord, gameOver, setGameOver, setWon }) {
  const ref = useRef();
  const { wordList, setWordList } = useWordList();
  const { word, setWord } = useWord();
  const { disabled, setDisabled } = useDisabled();

  useEffect(
    function () {
      ref.current?.focus();
    },
    [wordList],
  );

  function handleChange(val) {
    val = val.trim();

    if (wordList?.includes(val)) {
      return;
    }

    setWord(val);
    if (val.length === 5) validateWord(val);
  }

  function handleClick(e) {
    e.preventDefault();
    if (word.length < 5) return;

    //if we already have 4, adding another will end game
    if (wordList?.length === 4) setGameOver(true);

    setWordList([...wordList, word]);

    if (word === secretWord) {
      setWon(true);
      setGameOver(true);
    }

    setWord('');
  }

  async function validateWord(val) {
    const cleanWord = val.trim().toLowerCase();

    try {
      const response = await fetch(
        `https://api.datamuse.com/words?sp=${encodeURIComponent(cleanWord)}&md=d`,
      );

      //if we got an error from the API, just move ahead
      if (!response.ok) {
        setDisabled(true);
        return;
      }

      // Check if the exact word exists as a match in the returned array
      const data = await response.json();
      const isValid = data.some(
        (item) =>
          item.word.toLowerCase() === cleanWord && item.defs?.length > 0,
      );

      setDisabled(!isValid);
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

  return (
    <>
      {!gameOver && (
        <>
          <form onSubmit={(e) => handleClick(e)}>
            <input
              type="text"
              maxLength={5}
              value={word}
              onChange={(e) => handleChange(e.target.value?.toUpperCase())}
              placeholder="Guess a word"
              ref={ref}
            />{' '}
            <button
              type="button"
              onClick={handleClick}
              disabled={disabled}
            >
              Submit
            </button>
          </form>
        </>
      )}
      <WordList secretWord={secretWord} />
    </>
  );
}

export default WordGuess;
