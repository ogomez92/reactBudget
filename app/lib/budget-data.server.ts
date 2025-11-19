import fs from 'fs/promises';
import path from 'path';
import type { BudgetData, Expense, Settings } from '~/types';
import { DEFAULT_SETTINGS } from '~/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'budget.json');

async function ensureDataDirectory(): Promise<void> {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readData(): Promise<BudgetData> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data) as BudgetData;
  } catch {
    // Return default data if file doesn't exist
    return {
      expenses: [],
      settings: DEFAULT_SETTINGS,
    };
  }
}

async function writeData(data: BudgetData): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getExpenses(): Promise<Expense[]> {
  const data = await readData();
  return data.expenses;
}

export async function addExpense(expense: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense> {
  const data = await readData();
  const newExpense: Expense = {
    ...expense,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  data.expenses.push(newExpense);
  await writeData(data);
  return newExpense;
}

export async function deleteExpense(id: string): Promise<void> {
  const data = await readData();
  data.expenses = data.expenses.filter(expense => expense.id !== id);
  await writeData(data);
}

export async function updateExpense(id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>): Promise<Expense | null> {
  const data = await readData();
  const index = data.expenses.findIndex(expense => expense.id === id);
  if (index === -1) return null;

  data.expenses[index] = { ...data.expenses[index], ...updates };
  await writeData(data);
  return data.expenses[index];
}

export async function getSettings(): Promise<Settings> {
  const data = await readData();
  return data.settings;
}

export async function updateSettings(settings: Partial<Settings>): Promise<Settings> {
  const data = await readData();
  data.settings = { ...data.settings, ...settings };
  await writeData(data);
  return data.settings;
}

export async function getExpensesByMonth(year: number, month: number): Promise<Expense[]> {
  const expenses = await getExpenses();
  return expenses.filter(expense => {
    const date = new Date(expense.date);
    return date.getFullYear() === year && date.getMonth() + 1 === month;
  });
}

export async function getAvailableYears(): Promise<number[]> {
  const expenses = await getExpenses();
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

export async function getMonthlyTotal(year: number, month: number): Promise<number> {
  const expenses = await getExpensesByMonth(year, month);
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}
