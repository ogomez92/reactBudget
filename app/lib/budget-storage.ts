import type { Expense, Settings, BudgetData } from '~/types';
import { DEFAULT_SETTINGS } from '~/types';

const DB_NAME = 'budget-game-db';
const DB_VERSION = 1;
const EXPENSES_STORE = 'expenses';
const SETTINGS_STORE = 'settings';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDatabase(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create expenses store
      if (!db.objectStoreNames.contains(EXPENSES_STORE)) {
        const expensesStore = db.createObjectStore(EXPENSES_STORE, { keyPath: 'id' });
        expensesStore.createIndex('date', 'date', { unique: false });
        expensesStore.createIndex('category', 'category', { unique: false });
      }

      // Create settings store
      if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
        db.createObjectStore(SETTINGS_STORE, { keyPath: 'id' });
      }
    };
  });

  return dbPromise;
}

// Settings operations
export async function getSettings(): Promise<Settings> {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;

  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const transaction = db.transaction(SETTINGS_STORE, 'readonly');
      const store = transaction.objectStore(SETTINGS_STORE);
      const request = store.get('settings');

      request.onsuccess = () => {
        if (request.result) {
          resolve({ ...DEFAULT_SETTINGS, ...request.result.data });
        } else {
          resolve(DEFAULT_SETTINGS);
        }
      };

      request.onerror = () => {
        resolve(DEFAULT_SETTINGS);
      };
    });
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  if (typeof window === 'undefined') return;

  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SETTINGS_STORE, 'readwrite');
    const store = transaction.objectStore(SETTINGS_STORE);
    const request = store.put({ id: 'settings', data: settings });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Expense operations
export async function getExpenses(): Promise<Expense[]> {
  if (typeof window === 'undefined') return [];

  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const transaction = db.transaction(EXPENSES_STORE, 'readonly');
      const store = transaction.objectStore(EXPENSES_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        resolve([]);
      };
    });
  } catch {
    return [];
  }
}

export async function addExpense(expense: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense> {
  const db = await openDatabase();
  const newExpense: Expense = {
    ...expense,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXPENSES_STORE, 'readwrite');
    const store = transaction.objectStore(EXPENSES_STORE);
    const request = store.add(newExpense);

    request.onsuccess = () => resolve(newExpense);
    request.onerror = () => reject(request.error);
  });
}

export async function updateExpense(id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>): Promise<Expense | null> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXPENSES_STORE, 'readwrite');
    const store = transaction.objectStore(EXPENSES_STORE);
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      if (!getRequest.result) {
        resolve(null);
        return;
      }

      const updatedExpense = { ...getRequest.result, ...updates };
      const putRequest = store.put(updatedExpense);

      putRequest.onsuccess = () => resolve(updatedExpense);
      putRequest.onerror = () => reject(putRequest.error);
    };

    getRequest.onerror = () => reject(getRequest.error);
  });
}

export async function deleteExpense(id: string): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXPENSES_STORE, 'readwrite');
    const store = transaction.objectStore(EXPENSES_STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Helper functions
export function getAvailableYears(expenses: Expense[]): number[] {
  const years = new Set<number>();
  expenses.forEach(expense => {
    years.add(new Date(expense.date).getFullYear());
  });
  // Add current year if no expenses exist
  if (years.size === 0) {
    years.add(new Date().getFullYear());
  }
  return Array.from(years).sort((a, b) => b - a);
}

// Export functionality
export async function exportData(): Promise<BudgetData> {
  const [expenses, settings] = await Promise.all([
    getExpenses(),
    getSettings(),
  ]);

  return { expenses, settings };
}

export function downloadData(data: BudgetData, filename: string = 'budget-data.json'): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import functionality
export async function importData(data: BudgetData): Promise<void> {
  const db = await openDatabase();

  // Import settings
  if (data.settings) {
    await saveSettings(data.settings);
  }

  // Import expenses
  if (data.expenses && data.expenses.length > 0) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(EXPENSES_STORE, 'readwrite');
      const store = transaction.objectStore(EXPENSES_STORE);

      // Add each expense
      data.expenses.forEach(expense => {
        store.put(expense);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
}
