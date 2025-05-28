import type { AlgorithmModule } from '../types/types';
import { DefaultModule } from './DefaultModule';

export const BinarySearch: AlgorithmModule = {
  ...DefaultModule,
  name: 'Binary Search',
};
