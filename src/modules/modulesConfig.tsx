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

import { ArrayModule } from './DataStructures/Array';
import { LinkedListModule } from './DataStructures/LinkedList';
import { StackModule } from './DataStructures/Stack';
import { QueueModule } from './DataStructures/Queue';
import { DequeModule } from './DataStructures/Deque';
import { BinaryTreeModule } from './DataStructures/BinaryTree';
import { AVLTreeModule } from './DataStructures/AVLTree';
import { BTreeModule } from './DataStructures/BTree';
import { HeapModule } from './DataStructures/Heap';
import { TrieModule } from './DataStructures/Trie';
import { GraphModule } from './DataStructures/Graph';
import { AdjacencyListModule } from './DataStructures/AdjacencyList';
import { AdjacencyMatrixModule } from './DataStructures/AdjacencyMatrix';
import { HashTableModule } from './DataStructures/HashTable';
import { HashSetModule } from './DataStructures/HashSet';

export const moduleCategories = [
  {
    title: 'Data Structures',
    subcategories: [
      {
        title: 'Linear Structures',
        modules: [
          ArrayModule,
          LinkedListModule,
          StackModule,
          QueueModule,
          DequeModule,
        ],
      },
      {
        title: 'Hierarchical Structures',
        modules: [
          BinaryTreeModule,
          AVLTreeModule,
          BTreeModule,
          HeapModule,
          TrieModule,
        ],
      },
      {
        title: 'Graph-Based Structures',
        modules: [
          GraphModule,
          AdjacencyListModule,
          AdjacencyMatrixModule,
        ],
      },
      {
        title: 'Hash-Based Structures',
        modules: [
          HashTableModule,
          HashSetModule,
        ],
      },
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