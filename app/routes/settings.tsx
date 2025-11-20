import type { Currency, Language, Settings } from '~/types';
import { CURRENCY_SYMBOLS, LANGUAGE_NAMES, DEFAULT_SETTINGS } from '~/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useEffect, useState } from 'react';
import { getTranslation } from '~/lib/translations';
import { getSettings, saveSettings, exportData, downloadData } from '~/lib/budget-storage';
import { Download } from 'lucide-react';

export function meta() {
  return [
    { title: 'Settings - Budget Game' },
    { name: 'description', content: 'Configure your budget tracking preferences' },
  ];
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

export default function SettingsPage() {
  const [settings, setSettingsState] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from IndexedDB on mount
  useEffect(() => {
    getSettings().then(storedSettings => {
      setSettingsState(storedSettings);
      setIsLoaded(true);
    });
  }, []);

  const t = getTranslation(settings.language);

  const handleCurrencyChange = async (value: string) => {
    const newSettings = { ...settings, currency: value as Currency };
    setSettingsState(newSettings);
    await saveSettings(newSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLanguageChange = async (value: string) => {
    const newSettings = { ...settings, language: value as Language };
    setSettingsState(newSettings);
    await saveSettings(newSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = async () => {
    const data = await exportData();
    const date = new Date().toISOString().split('T')[0];
    downloadData(data, `budget-data-${date}.json`);
  };

  // Show loading state while hydrating
  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

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
          <CardTitle>{t.settings.data || 'Data'}</CardTitle>
          <CardDescription>
            {t.settings.dataDescription || 'Export your budget data'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.settings.exportData || 'Export Data'}
          </Button>
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
