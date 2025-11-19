import { useFetcher } from 'react-router';
import { useEffect, useRef } from 'react';
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
}

export function EditExpenseDialog({ expense, onOpenChange, settings }: EditExpenseDialogProps) {
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = fetcher.state === 'submitting';
  const t = getTranslation(settings.language);

  // Close dialog on successful submission
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.success) {
      onOpenChange(false);
    }
  }, [fetcher.state, fetcher.data, onOpenChange]);

  if (!expense) return null;

  return (
    <Dialog open={!!expense} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.editExpenseDialog.title}</DialogTitle>
          <DialogDescription>
            {t.editExpenseDialog.description}
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form
          method="post"
          ref={formRef}
          className="space-y-4"
          aria-label={t.editExpenseDialog.title}
        >
          <input type="hidden" name="intent" value="update" />
          <input type="hidden" name="id" value={expense.id} />

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
            <Select name="category" defaultValue={expense.category} required>
              <SelectTrigger id="edit-category" aria-required="true">
                <SelectValue placeholder={t.addExpenseDialog.selectCategory} />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {getCategoryName(settings.language, category)}
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
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
