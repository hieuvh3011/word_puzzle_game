import {Puzzle} from './puzzle.entities';

export interface Topic {
  id: string;
  name: string;
  puzzles: Array<Puzzle>;
}
