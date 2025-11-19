import { NavLink } from 'react-router';
import { cn } from '~/lib/utils';
import { Wallet, Settings, TrendingUp } from 'lucide-react';
import type { Settings as SettingsType } from '~/types';
import { getTranslation } from '~/lib/translations';

interface NavigationProps {
  settings: SettingsType;
}

export function Navigation({ settings }: NavigationProps) {
  const t = getTranslation(settings.language);

  const navItems = [
    {
      to: '/',
      label: t.nav.expenses,
      icon: Wallet,
    },
    {
      to: '/settings',
      label: t.nav.settings,
      icon: Settings,
    },
  ];

  return (
    <nav className="border-b bg-background" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold">{t.nav.budgetGame}</span>
          </div>
          <ul className="flex items-center gap-1">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground'
                    )
                  }
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
