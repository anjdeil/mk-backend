import { Relevance } from '../enums/relevance';

export type SearchFilters = {
  search: string;
  categories: number[];
  keys: number[];
  moods: number[];
  instruments: number[];
  types: number[];
  bpm: number[] | number;
  duration: number[] | number;
  cost: number[] | number;
  relevance: Relevance;
};
