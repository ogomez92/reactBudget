import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import type { Expense, Settings } from '~/types';
import { DEFAULT_CATEGORIES, CURRENCY_SYMBOLS } from '~/types';
import { getTranslation, getCategoryName } from '~/lib/translations';

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: Settings;
  onAdd: (expense: Omit<Expense, 'id' | 'createdAt'>) => Promise<void>;
}

export function AddExpenseDialog({ open, onOpenChange, settings, onAdd }: AddExpenseDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState('');
  const t = getTranslation(settings.language);

  // Get today's date in YYYY-MM-DD format for the date input default
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const expense = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      amount: parseFloat(formData.get('amount') as string),
      date: formData.get('date') as string,
    };

    try {
      await onAdd(expense);
      onOpenChange(false);
      formRef.current?.reset();
      setCategory('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.addExpenseDialog.title}</DialogTitle>
          <DialogDescription>
            {t.addExpenseDialog.description}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="space-y-4"
          aria-label={t.addExpenseDialog.title}
        >
          <div className="space-y-2">
            <Label htmlFor="title">{t.addExpenseDialog.expenseTitle}</Label>
            <Input
              id="title"
              name="title"
              placeholder={t.addExpenseDialog.titlePlaceholder}
              required
              aria-required="true"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">{t.addExpenseDialog.category}</Label>
            <Select name="category" required value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" aria-required="true">
                <SelectValue placeholder={t.addExpenseDialog.selectCategory} />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {getCategoryName(settings.language, cat)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">
              {t.addExpenseDialog.amount} ({CURRENCY_SYMBOLS[settings.currency]})
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              required
              aria-required="true"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">{t.addExpenseDialog.date}</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={today}
              required
              aria-required="true"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t.addExpenseDialog.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t.addExpenseDialog.adding : t.addExpenseDialog.add}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
