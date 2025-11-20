import { useState, useRef, useEffect } from 'react';
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

interface EditExpenseDialogProps {
  expense: Expense | null;
  onOpenChange: (open: boolean) => void;
  settings: Settings;
  onUpdate: (id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>) => Promise<void>;
}

export function EditExpenseDialog({ expense, onOpenChange, settings, onUpdate }: EditExpenseDialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState('');
  const t = getTranslation(settings.language);

  // Update category when expense changes
  useEffect(() => {
    if (expense) {
      setCategory(expense.category);
    }
  }, [expense]);

  if (!expense) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const updates = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      amount: parseFloat(formData.get('amount') as string),
      date: formData.get('date') as string,
    };

    try {
      await onUpdate(expense.id, updates);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={!!expense} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.editExpenseDialog.title}</DialogTitle>
          <DialogDescription>
            {t.editExpenseDialog.description}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="space-y-4"
          aria-label={t.editExpenseDialog.title}
        >
          <div className="space-y-2">
            <Label htmlFor="edit-title">{t.addExpenseDialog.expenseTitle}</Label>
            <Input
              id="edit-title"
              name="title"
              defaultValue={expense.title}
              placeholder={t.addExpenseDialog.titlePlaceholder}
              required
              aria-required="true"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">{t.addExpenseDialog.category}</Label>
            <Select name="category" required value={category} onValueChange={setCategory}>
              <SelectTrigger id="edit-category" aria-required="true">
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
            <Label htmlFor="edit-amount">
              {t.addExpenseDialog.amount} ({CURRENCY_SYMBOLS[settings.currency]})
            </Label>
            <Input
              id="edit-amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              defaultValue={expense.amount}
              placeholder="0.00"
              required
              aria-required="true"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-date">{t.addExpenseDialog.date}</Label>
            <Input
              id="edit-date"
              name="date"
              type="date"
              defaultValue={expense.date}
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
              {isSubmitting ? t.editExpenseDialog.saving : t.editExpenseDialog.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
