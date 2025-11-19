export type Currency = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF';

export type Language = 'en' | 'es' | 'ca' | 'it' | 'fr' | 'he' | 'ja' | 'ru' | 'zh';

export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string; // ISO date string (YYYY-MM-DD)
  createdAt: string; // ISO timestamp
}

export interface Settings {
  currency: Currency;
  language: Language;
}

export interface BudgetData {
  expenses: Expense[];
  settings: Settings;
}

export interface MonthlyExpenses {
  month: number;
  year: number;
  expenses: Expense[];
  total: number;
}

export const DEFAULT_CATEGORIES = [
  'Food & Groceries',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Travel',
  'Subscriptions',
  'Other',
] as const;

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
};

export const DEFAULT_SETTINGS: Settings = {
  currency: 'EUR',
  language: 'en',
};

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  ca: 'Català',
  it: 'Italiano',
  fr: 'Français',
  he: 'עברית',
  ja: '日本語',
  ru: 'Русский',
  zh: '中文',
};

// RTL languages
export const RTL_LANGUAGES: Language[] = ['he'];
