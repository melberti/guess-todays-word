function WordGrid({ userWord, secretWord, displayWord }) {
  const userWordLetters = userWord.split('');
  const secretWordLetters = secretWord.split('');
  const displayWordLetters = displayWord.split('');

  let class0 = compareArrays(userWordLetters, secretWordLetters)[0];
  let class1 = compareArrays(userWordLetters, secretWordLetters)[1];
  let class2 = compareArrays(userWordLetters, secretWordLetters)[2];
  let class3 = compareArrays(userWordLetters, secretWordLetters)[3];
  let class4 = compareArrays(userWordLetters, secretWordLetters)[4];

  //right letter right place, green
  //right letter wrong place, yellow

  return (
    <div className={`grid ${userWord && 'small'}`}>
      <div className={class0}>{displayWordLetters[0]}</div>
      <div className={class1}>{displayWordLetters[1]}</div>
      <div className={class2}>{displayWordLetters[2]}</div>
      <div className={class3}>{displayWordLetters[3]}</div>
      <div className={class4}>{displayWordLetters[4]}</div>
    </div>
  );
}

export default WordGrid;

function compareArrays(userLetters, secretLetters) {
  let colors = ['gray', 'gray', 'gray', 'gray', 'gray'];

  if (!userLetters.length === '') {
    return colors;
  }

  for (var si = 0; si < secretLetters.length; si++) {
    for (var ui = 0; ui < userLetters.length; ui++) {
      if (secretLetters[si] === userLetters[si]) {
        colors[si] = 'green';
        break;
      } else if (
        secretLetters[si] === userLetters[ui] &&
        colors[ui] === 'gray' //if already green, don't set to yellow!
      ) {
        colors[ui] = 'yellow';
        break;
      }
    }
  }

  return colors;
}
