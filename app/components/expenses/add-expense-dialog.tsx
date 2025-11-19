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
import type { Settings } from '~/types';
import { DEFAULT_CATEGORIES, CURRENCY_SYMBOLS } from '~/types';
import { getTranslation, getCategoryName } from '~/lib/translations';

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: Settings;
}

export function AddExpenseDialog({ open, onOpenChange, settings }: AddExpenseDialogProps) {
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = fetcher.state === 'submitting';
  const t = getTranslation(settings.language);

  // Close dialog and reset form on successful submission
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.success) {
      onOpenChange(false);
      formRef.current?.reset();
    }
  }, [fetcher.state, fetcher.data, onOpenChange]);

  // Get today's date in YYYY-MM-DD format for the date input default
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.addExpenseDialog.title}</DialogTitle>
          <DialogDescription>
            {t.addExpenseDialog.description}
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form
          method="post"
          ref={formRef}
          className="space-y-4"
          aria-label={t.addExpenseDialog.title}
        >
          <input type="hidden" name="intent" value="add" />

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
            <Select name="category" required>
              <SelectTrigger id="category" aria-required="true">
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
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
