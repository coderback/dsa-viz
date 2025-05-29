import {
  DefaultModule,
  LinearSearch,
  BubbleSort,
  InsertionSort,
  SelectionSort,
  MergeSort,
  QuickSort,
  HeapSort,
} from './index';

export const moduleCategories = [
  {
    title: 'Data Structures',
    subcategories: [
      { title: 'Linear Structures', modules: [] },
      { title: 'Hierarchical Structures', modules: [] },
      { title: 'Graph-Based Structures', modules: [] },
      { title: 'Hash-Based Structures', modules: [] },
    ],
  },
  {
    title: 'Algorithms',
    subcategories: [
      {
        title: 'Searching & Sorting',
        modules: [
          LinearSearch,
          DefaultModule, // Binary Search
          BubbleSort,
          InsertionSort,
          SelectionSort,
          MergeSort,
          QuickSort,
          HeapSort,
        ],
      },
      { title: 'Divide and Conquer', modules: [] },
      { title: 'Greedy Algorithms', modules: [] },
      { title: 'Dynamic Programming', modules: [] },
      { title: 'Backtracking & Branch-and-Bound', modules: [] },
      { title: 'Graph Algorithms', modules: [] },
      { title: 'String & Pattern-Matching', modules: [] },
    ],
  },
];