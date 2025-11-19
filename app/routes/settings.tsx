import { useLoaderData, useFetcher } from 'react-router';
import type { Route } from './+types/settings';
import { getSettings, updateSettings } from '~/lib/budget-data.server';
import type { Currency, Language } from '~/types';
import { CURRENCY_SYMBOLS, LANGUAGE_NAMES } from '~/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useEffect, useState } from 'react';
import { getTranslation } from '~/lib/translations';

export function meta() {
  return [
    { title: 'Settings - Budget Game' },
    { name: 'description', content: 'Configure your budget tracking preferences' },
  ];
}

export async function loader() {
  const settings = await getSettings();
  return { settings };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const currency = formData.get('currency') as Currency | null;
  const language = formData.get('language') as Language | null;

  const updates: Partial<{ currency: Currency; language: Language }> = {};
  if (currency) updates.currency = currency;
  if (language) updates.language = language;

  if (Object.keys(updates).length > 0) {
    await updateSettings(updates);
    return { success: true };
  }

  return { success: false };
}

const CURRENCIES: { value: Currency; label: string }[] = [
  { value: 'EUR', label: `Euro (${CURRENCY_SYMBOLS.EUR})` },
  { value: 'USD', label: `US Dollar (${CURRENCY_SYMBOLS.USD})` },
  { value: 'GBP', label: `British Pound (${CURRENCY_SYMBOLS.GBP})` },
  { value: 'JPY', label: `Japanese Yen (${CURRENCY_SYMBOLS.JPY})` },
  { value: 'CAD', label: `Canadian Dollar (${CURRENCY_SYMBOLS.CAD})` },
  { value: 'AUD', label: `Australian Dollar (${CURRENCY_SYMBOLS.AUD})` },
  { value: 'CHF', label: `Swiss Franc (${CURRENCY_SYMBOLS.CHF})` },
];

const LANGUAGES: { value: Language; label: string }[] = (
  Object.entries(LANGUAGE_NAMES) as [Language, string][]
).map(([value, label]) => ({ value, label }));

export default function Settings() {
  const { settings } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [saved, setSaved] = useState(false);
  const t = getTranslation(settings.language);

  // Show saved message briefly after successful save
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.success) {
      setSaved(true);
      const timer = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.state, fetcher.data]);

  const handleCurrencyChange = (value: string) => {
    const formData = new FormData();
    formData.set('currency', value);
    fetcher.submit(formData, { method: 'post' });
  };

  const handleLanguageChange = (value: string) => {
    const formData = new FormData();
    formData.set('language', value);
    fetcher.submit(formData, { method: 'post' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.settings.title}</h1>
        <p className="text-muted-foreground">
          {t.settings.description}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.settings.language}</CardTitle>
          <CardDescription>
            {t.settings.languageDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">{t.settings.selectLanguage}</Label>
              <Select
                value={settings.language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger
                  id="language"
                  className="w-[250px]"
                  aria-label={t.settings.selectLanguage}
                >
                  <SelectValue placeholder={t.settings.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map(language => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.settings.currency}</CardTitle>
          <CardDescription>
            {t.settings.currencyDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">{t.settings.defaultCurrency}</Label>
              <Select
                value={settings.currency}
                onValueChange={handleCurrencyChange}
              >
                <SelectTrigger
                  id="currency"
                  className="w-[250px]"
                  aria-label={t.settings.selectCurrency}
                >
                  <SelectValue placeholder={t.settings.selectCurrency} />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map(currency => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {saved && (
              <p className="text-sm text-green-600" role="status" aria-live="polite">
                {t.settings.saved}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.settings.about}</CardTitle>
          <CardDescription>
            {t.settings.aboutDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t.settings.aboutText}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
