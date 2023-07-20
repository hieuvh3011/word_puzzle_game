import {Puzzle} from '@app/entities/puzzle.entities';

export function shuffle(array: Array<string>) {
  const newArray = [...array];
  let currentIndex = newArray.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
}

export function calculateScore(isCorrect: boolean, puzzle: Puzzle): number {
  if (isCorrect) {
    return puzzle.score;
  }
  return 0;
}

export function isAnswerCorrect(
  answerLetters: Array<string>,
  puzzle: Puzzle,
): boolean {
  let answer: string = '';
  answerLetters.forEach(item => {
    answer += item;
  });
  const answerFromPuzzle = puzzle.answer.replace(/\s+/g, '').toUpperCase();
  console.log('result = ', answer === answerFromPuzzle);

  return answer === answerFromPuzzle;
}
