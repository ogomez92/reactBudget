import { useState, useEffect } from 'react';
import type { Expense, Settings } from '~/types';
import { CURRENCY_SYMBOLS, DEFAULT_SETTINGS } from '~/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Trash2, Plus, TrendingUp, TrendingDown, Minus, Pencil } from 'lucide-react';
import { AddExpenseDialog } from '~/components/expenses/add-expense-dialog';
import { EditExpenseDialog } from '~/components/expenses/edit-expense-dialog';
import { getTranslation, getMonthName, getMonthShortName, getCategoryName } from '~/lib/translations';
import { getExpenses, getSettings, addExpense, updateExpense, deleteExpense, getAvailableYears } from '~/lib/budget-storage';

export function meta() {
  return [
    { title: 'Expenses - Budget Game' },
    { name: 'description', content: 'Track your monthly expenses' },
  ];
}

function groupExpensesByMonth(expenses: Expense[]): Map<string, Expense[]> {
  const grouped = new Map<string, Expense[]>();

  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const existing = grouped.get(key) || [];
    grouped.set(key, [...existing, expense]);
  });

  return grouped;
}

function getMonthTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

function formatCurrency(amount: number, settings: Settings): string {
  return `${CURRENCY_SYMBOLS[settings.currency]}${amount.toFixed(2)}`;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Load data from IndexedDB on mount
  useEffect(() => {
    Promise.all([getExpenses(), getSettings()]).then(([storedExpenses, storedSettings]) => {
      setExpenses(storedExpenses);
      setSettings(storedSettings);
      const years = getAvailableYears(storedExpenses);
      setSelectedYear(years[0] || new Date().getFullYear());
      setIsLoaded(true);
    });
  }, []);

  const t = getTranslation(settings.language);
  const years = getAvailableYears(expenses);
  const groupedExpenses = groupExpensesByMonth(expenses);

  // Get months that have expenses for the selected year
  const monthsWithExpenses = Array.from(groupedExpenses.keys())
    .filter(key => key.startsWith(`${selectedYear}-`))
    .map(key => parseInt(key.split('-')[1]));

  // Always include current month if viewing current year
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Build list of months to show: months with expenses + current month (if current year)
  const monthsToShow = new Set(monthsWithExpenses);
  if (selectedYear === currentYear) {
    monthsToShow.add(currentMonth);
  }

  // Sort months in chronological order
  const sortedMonthsToShow = Array.from(monthsToShow).sort((a, b) => a - b);

  // Get expenses for selected month
  const currentMonthKey = `${selectedYear}-${selectedMonth}`;
  const currentMonthExpenses = groupedExpenses.get(currentMonthKey) || [];
  const currentMonthTotal = getMonthTotal(currentMonthExpenses);

  // Get previous month total for comparison
  const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
  const prevYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
  const prevMonthKey = `${prevYear}-${prevMonth}`;
  const prevMonthExpenses = groupedExpenses.get(prevMonthKey) || [];
  const prevMonthTotal = getMonthTotal(prevMonthExpenses);

  // Calculate savings comparison
  const difference = prevMonthTotal - currentMonthTotal;
  const savedMore = difference > 0;
  const spentSame = difference === 0;

  // Handler functions
  const handleAddExpense = async (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense = await addExpense(expenseData);
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = async (id: string) => {
    await deleteExpense(id);
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleUpdateExpense = async (id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>) => {
    const updated = await updateExpense(id, updates);
    if (updated) {
      setExpenses(expenses.map(expense => expense.id === id ? updated : expense));
    }
  };

  // Show loading state while hydrating
  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.expenses.title}</h1>
          <p className="text-muted-foreground">
            {t.expenses.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {years.length > 1 && (
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              <SelectTrigger className="w-[120px]" aria-label={t.expenses.selectYear}>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            type="button"
            onClick={() => setDialogOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={dialogOpen}
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.expenses.addExpense}
          </Button>
        </div>
      </div>

      {/* Monthly comparison card */}
      {prevMonthExpenses.length > 0 && currentMonthExpenses.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t.expenses.monthlyComparison}</CardTitle>
            <CardDescription>
              {t.expenses.comparing} {getMonthName(settings.language, selectedMonth)} {t.expenses.vs} {getMonthName(settings.language, prevMonth)} {prevYear !== selectedYear ? prevYear : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {spentSame ? (
                <>
                  <Minus className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <span className="text-lg font-medium">
                    {t.expenses.sameSpending}
                  </span>
                </>
              ) : savedMore ? (
                <>
                  <TrendingDown className="h-5 w-5 text-green-500" aria-hidden="true" />
                  <span className="text-lg font-medium text-green-500">
                    {t.expenses.saved} {formatCurrency(difference, settings)} {t.expenses.comparedToLastMonth}
                  </span>
                </>
              ) : (
                <>
                  <TrendingUp className="h-5 w-5 text-red-500" aria-hidden="true" />
                  <span className="text-lg font-medium text-red-500">
                    {t.expenses.spentMore} {formatCurrency(Math.abs(difference), settings)} {t.expenses.moreThanLastMonth}
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Month tabs */}
      {sortedMonthsToShow.length > 0 ? (
        <Tabs
          value={selectedMonth.toString()}
          onValueChange={(value) => setSelectedMonth(parseInt(value))}
          className="w-full"
        >
          <TabsList className="w-full justify-start overflow-x-auto" aria-label={t.expenses.selectMonth}>
            {sortedMonthsToShow.map((monthIndex) => {
              const monthKey = `${selectedYear}-${monthIndex}`;
              const monthExpenses = groupedExpenses.get(monthKey) || [];
              const monthTotal = getMonthTotal(monthExpenses);
              return (
                <TabsTrigger
                  key={monthIndex}
                  value={monthIndex.toString()}
                  className="min-w-[100px]"
                >
                  {getMonthShortName(settings.language, monthIndex)} ({formatCurrency(monthTotal, settings)})
                </TabsTrigger>
              );
            })}
          </TabsList>

          {sortedMonthsToShow.map((monthIndex) => {
            const monthKey = `${selectedYear}-${monthIndex}`;
            const monthExpenses = groupedExpenses.get(monthKey) || [];
            const monthTotal = getMonthTotal(monthExpenses);

            return (
              <TabsContent key={monthIndex} value={monthIndex.toString()} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{getMonthName(settings.language, monthIndex)} {selectedYear}</CardTitle>
                    <CardDescription>
                      {t.expenses.total}: {formatCurrency(monthTotal, settings)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {monthExpenses.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        {t.expenses.noExpenses} {t.expenses.clickAddExpense}
                      </p>
                    ) : (
                      <div className="space-y-6">
                        {/* Expenses table */}
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th scope="col" className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                  {t.expenses.titleColumn}
                                </th>
                                <th scope="col" className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                  {t.expenses.dateColumn}
                                </th>
                                <th scope="col" className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">
                                  {t.expenses.categoryColumn}
                                </th>
                                <th scope="col" className="text-right py-3 px-2 font-medium text-sm text-muted-foreground">
                                  {t.expenses.amountColumn}
                                </th>
                                <th scope="col" className="text-right py-3 px-2 font-medium text-sm text-muted-foreground">
                                  <span className="sr-only">{t.expenses.actionsColumn}</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {monthExpenses
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .map(expense => (
                                  <tr key={expense.id} className="border-b last:border-0">
                                    <td className="py-3 px-2 font-medium">
                                      {expense.title}
                                    </td>
                                    <td className="py-3 px-2 text-sm text-muted-foreground">
                                      {new Date(expense.date).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-2 text-sm text-muted-foreground">
                                      {getCategoryName(settings.language, expense.category)}
                                    </td>
                                    <td className="py-3 px-2 text-right font-medium">
                                      {formatCurrency(expense.amount, settings)}
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                      <div className="flex justify-end gap-1">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => setEditingExpense(expense)}
                                          aria-label={`${t.expenses.editExpense}: ${expense.title}`}
                                          aria-haspopup="dialog"
                                        >
                                          <Pencil className="h-4 w-4" aria-hidden="true" />
                                        </Button>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleDeleteExpense(expense.id)}
                                          aria-label={`${t.expenses.deleteExpense}: ${expense.title}`}
                                        >
                                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Category breakdown table */}
                        <div>
                          <h4 className="font-medium mb-3">{t.expenses.categoryBreakdown}</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b">
                                  <th scope="col" className="text-left py-2 px-2 font-medium text-sm text-muted-foreground">
                                    {t.expenses.categoryColumn}
                                  </th>
                                  <th scope="col" className="text-right py-2 px-2 font-medium text-sm text-muted-foreground">
                                    {t.expenses.amountColumn}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(
                                  monthExpenses.reduce((acc, expense) => {
                                    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                                    return acc;
                                  }, {} as Record<string, number>)
                                )
                                  .sort(([, a], [, b]) => b - a)
                                  .map(([category, total]) => (
                                    <tr key={category} className="border-b last:border-0">
                                      <td className="py-2 px-2 text-sm">
                                        {getCategoryName(settings.language, category)}
                                      </td>
                                      <td className="py-2 px-2 text-right font-medium">
                                        {formatCurrency(total, settings)}
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                              <tfoot>
                                <tr className="border-t-2">
                                  <td className="py-2 px-2 font-bold">
                                    {t.expenses.total}
                                  </td>
                                  <td className="py-2 px-2 text-right font-bold">
                                    {formatCurrency(monthTotal, settings)}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="py-8">
            <p className="text-muted-foreground text-center">
              {t.expenses.noExpensesForYear} {selectedYear}. {t.expenses.clickAddExpense}
            </p>
          </CardContent>
        </Card>
      )}

      <AddExpenseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        settings={settings}
        onAdd={handleAddExpense}
      />

      <EditExpenseDialog
        expense={editingExpense}
        onOpenChange={(open) => !open && setEditingExpense(null)}
        settings={settings}
        onUpdate={handleUpdateExpense}
      />
    </div>
  );
}
