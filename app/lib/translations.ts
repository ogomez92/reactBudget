import type { Language } from '~/types';

export interface Translations {
  // Navigation
  nav: {
    expenses: string;
    settings: string;
    budgetGame: string;
  };
  // Expenses page
  expenses: {
    title: string;
    description: string;
    addExpense: string;
    selectYear: string;
    monthlyComparison: string;
    comparing: string;
    vs: string;
    sameSpending: string;
    saved: string;
    comparedToLastMonth: string;
    spentMore: string;
    moreThanLastMonth: string;
    selectMonth: string;
    total: string;
    noExpenses: string;
    noExpensesForYear: string;
    clickAddExpense: string;
    titleColumn: string;
    dateColumn: string;
    categoryColumn: string;
    amountColumn: string;
    actionsColumn: string;
    deleteExpense: string;
    editExpense: string;
    categoryBreakdown: string;
  };
  // Add expense dialog
  addExpenseDialog: {
    title: string;
    description: string;
    expenseTitle: string;
    titlePlaceholder: string;
    category: string;
    selectCategory: string;
    amount: string;
    date: string;
    cancel: string;
    add: string;
    adding: string;
  };
  // Edit expense dialog
  editExpenseDialog: {
    title: string;
    description: string;
    save: string;
    saving: string;
  };
  // Settings page
  settings: {
    title: string;
    description: string;
    currency: string;
    currencyDescription: string;
    defaultCurrency: string;
    selectCurrency: string;
    saved: string;
    language: string;
    languageDescription: string;
    selectLanguage: string;
    about: string;
    aboutDescription: string;
    aboutText: string;
  };
  // Categories
  categories: {
    foodGroceries: string;
    transportation: string;
    housing: string;
    utilities: string;
    entertainment: string;
    healthcare: string;
    shopping: string;
    education: string;
    travel: string;
    subscriptions: string;
    other: string;
  };
  // Months
  months: {
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };
}

const en: Translations = {
  nav: {
    expenses: 'Expenses',
    settings: 'Settings',
    budgetGame: 'Budget Game',
  },
  expenses: {
    title: 'Expenses',
    description: 'Track your spending and compare with previous months',
    addExpense: 'Add Expense',
    selectYear: 'Select year',
    monthlyComparison: 'Monthly Comparison',
    comparing: 'Comparing',
    vs: 'vs',
    sameSpending: 'Same spending as last month',
    saved: 'You saved',
    comparedToLastMonth: 'compared to last month!',
    spentMore: 'You spent',
    moreThanLastMonth: 'more than last month',
    selectMonth: 'Select month',
    total: 'Total',
    noExpenses: 'No expenses recorded for this month.',
    noExpensesForYear: 'No expenses recorded for',
    clickAddExpense: 'Click "Add Expense" to get started.',
    titleColumn: 'Title',
    dateColumn: 'Date',
    categoryColumn: 'Category',
    amountColumn: 'Amount',
    actionsColumn: 'Actions',
    deleteExpense: 'Delete expense',
    editExpense: 'Edit expense',
    categoryBreakdown: 'Category Breakdown',
  },
  addExpenseDialog: {
    title: 'Add Expense',
    description: 'Add a new expense to track your spending. All fields are required.',
    expenseTitle: 'Title',
    titlePlaceholder: 'e.g., Weekly groceries',
    category: 'Category',
    selectCategory: 'Select a category',
    amount: 'Amount',
    date: 'Date',
    cancel: 'Cancel',
    add: 'Add Expense',
    adding: 'Adding...',
  },
  editExpenseDialog: {
    title: 'Edit Expense',
    description: 'Update the expense details.',
    save: 'Save Changes',
    saving: 'Saving...',
  },
  settings: {
    title: 'Settings',
    description: 'Configure your budget tracking preferences',
    currency: 'Currency',
    currencyDescription: 'Set the default currency for all your expenses. All transactions will be displayed in this currency.',
    defaultCurrency: 'Default Currency',
    selectCurrency: 'Select currency',
    saved: 'Settings saved successfully',
    language: 'Language',
    languageDescription: 'Choose your preferred language for the application interface.',
    selectLanguage: 'Select language',
    about: 'About',
    aboutDescription: 'Budget Game helps you track your spending and compare your monthly expenses.',
    aboutText: 'Add expenses to see how much you\'re saving compared to previous months. The goal is to reduce your spending over time and build better financial habits.',
  },
  categories: {
    foodGroceries: 'Food & Groceries',
    transportation: 'Transportation',
    housing: 'Housing',
    utilities: 'Utilities',
    entertainment: 'Entertainment',
    healthcare: 'Healthcare',
    shopping: 'Shopping',
    education: 'Education',
    travel: 'Travel',
    subscriptions: 'Subscriptions',
    other: 'Other',
  },
  months: {
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  },
};

const es: Translations = {
  nav: {
    expenses: 'Gastos',
    settings: 'Configuración',
    budgetGame: 'Juego de Presupuesto',
  },
  expenses: {
    title: 'Gastos',
    description: 'Rastrea tus gastos y compara con meses anteriores',
    addExpense: 'Añadir Gasto',
    selectYear: 'Seleccionar año',
    monthlyComparison: 'Comparación Mensual',
    comparing: 'Comparando',
    vs: 'vs',
    sameSpending: 'Mismo gasto que el mes pasado',
    saved: 'Ahorraste',
    comparedToLastMonth: 'comparado con el mes pasado!',
    spentMore: 'Gastaste',
    moreThanLastMonth: 'más que el mes pasado',
    selectMonth: 'Seleccionar mes',
    total: 'Total',
    noExpenses: 'No hay gastos registrados para este mes.',
    noExpensesForYear: 'No hay gastos registrados para',
    clickAddExpense: 'Haz clic en "Añadir Gasto" para comenzar.',
    titleColumn: 'Título',
    dateColumn: 'Fecha',
    categoryColumn: 'Categoría',
    amountColumn: 'Cantidad',
    actionsColumn: 'Acciones',
    deleteExpense: 'Eliminar gasto',
    editExpense: 'Editar gasto',
    categoryBreakdown: 'Desglose por Categoría',
  },
  addExpenseDialog: {
    title: 'Añadir Gasto',
    description: 'Añade un nuevo gasto para rastrear tus gastos. Todos los campos son obligatorios.',
    expenseTitle: 'Título',
    titlePlaceholder: 'ej., Compras semanales',
    category: 'Categoría',
    selectCategory: 'Selecciona una categoría',
    amount: 'Cantidad',
    date: 'Fecha',
    cancel: 'Cancelar',
    add: 'Añadir Gasto',
    adding: 'Añadiendo...',
  },
  editExpenseDialog: {
    title: 'Editar Gasto',
    description: 'Actualiza los detalles del gasto.',
    save: 'Guardar Cambios',
    saving: 'Guardando...',
  },
  settings: {
    title: 'Configuración',
    description: 'Configura tus preferencias de seguimiento de presupuesto',
    currency: 'Moneda',
    currencyDescription: 'Establece la moneda predeterminada para todos tus gastos. Todas las transacciones se mostrarán en esta moneda.',
    defaultCurrency: 'Moneda Predeterminada',
    selectCurrency: 'Seleccionar moneda',
    saved: 'Configuración guardada exitosamente',
    language: 'Idioma',
    languageDescription: 'Elige tu idioma preferido para la interfaz de la aplicación.',
    selectLanguage: 'Seleccionar idioma',
    about: 'Acerca de',
    aboutDescription: 'Juego de Presupuesto te ayuda a rastrear tus gastos y comparar tus gastos mensuales.',
    aboutText: 'Añade gastos para ver cuánto estás ahorrando comparado con meses anteriores. El objetivo es reducir tus gastos con el tiempo y construir mejores hábitos financieros.',
  },
  categories: {
    foodGroceries: 'Alimentación y Compras',
    transportation: 'Transporte',
    housing: 'Vivienda',
    utilities: 'Servicios',
    entertainment: 'Entretenimiento',
    healthcare: 'Salud',
    shopping: 'Compras',
    education: 'Educación',
    travel: 'Viajes',
    subscriptions: 'Suscripciones',
    other: 'Otros',
  },
  months: {
    january: 'Enero',
    february: 'Febrero',
    march: 'Marzo',
    april: 'Abril',
    may: 'Mayo',
    june: 'Junio',
    july: 'Julio',
    august: 'Agosto',
    september: 'Septiembre',
    october: 'Octubre',
    november: 'Noviembre',
    december: 'Diciembre',
  },
};

const ca: Translations = {
  nav: {
    expenses: 'Despeses',
    settings: 'Configuració',
    budgetGame: 'Joc de Pressupost',
  },
  expenses: {
    title: 'Despeses',
    description: 'Rastreja les teves despeses i compara amb mesos anteriors',
    addExpense: 'Afegir Despesa',
    selectYear: 'Seleccionar any',
    monthlyComparison: 'Comparació Mensual',
    comparing: 'Comparant',
    vs: 'vs',
    sameSpending: 'Mateixa despesa que el mes passat',
    saved: 'Has estalviat',
    comparedToLastMonth: 'comparat amb el mes passat!',
    spentMore: 'Has gastat',
    moreThanLastMonth: 'més que el mes passat',
    selectMonth: 'Seleccionar mes',
    total: 'Total',
    noExpenses: 'No hi ha despeses registrades per aquest mes.',
    noExpensesForYear: 'No hi ha despeses registrades per',
    clickAddExpense: 'Fes clic a "Afegir Despesa" per començar.',
    titleColumn: 'Títol',
    dateColumn: 'Data',
    categoryColumn: 'Categoria',
    amountColumn: 'Quantitat',
    actionsColumn: 'Accions',
    deleteExpense: 'Eliminar despesa',
    editExpense: 'Editar despesa',
    categoryBreakdown: 'Desglossament per Categoria',
  },
  addExpenseDialog: {
    title: 'Afegir Despesa',
    description: 'Afegeix una nova despesa per rastrejar les teves despeses. Tots els camps són obligatoris.',
    expenseTitle: 'Títol',
    titlePlaceholder: 'ex., Compres setmanals',
    category: 'Categoria',
    selectCategory: 'Selecciona una categoria',
    amount: 'Quantitat',
    date: 'Data',
    cancel: 'Cancel·lar',
    add: 'Afegir Despesa',
    adding: 'Afegint...',
  },
  editExpenseDialog: {
    title: 'Editar Despesa',
    description: 'Actualitza els detalls de la despesa.',
    save: 'Desar Canvis',
    saving: 'Desant...',
  },
  settings: {
    title: 'Configuració',
    description: 'Configura les teves preferències de seguiment de pressupost',
    currency: 'Moneda',
    currencyDescription: 'Estableix la moneda predeterminada per a totes les teves despeses. Totes les transaccions es mostraran en aquesta moneda.',
    defaultCurrency: 'Moneda Predeterminada',
    selectCurrency: 'Seleccionar moneda',
    saved: 'Configuració guardada correctament',
    language: 'Idioma',
    languageDescription: 'Tria el teu idioma preferit per a la interfície de l\'aplicació.',
    selectLanguage: 'Seleccionar idioma',
    about: 'Quant a',
    aboutDescription: 'Joc de Pressupost t\'ajuda a rastrejar les teves despeses i comparar les teves despeses mensuals.',
    aboutText: 'Afegeix despeses per veure quant estàs estalviant comparat amb mesos anteriors. L\'objectiu és reduir les teves despeses amb el temps i construir millors hàbits financers.',
  },
  categories: {
    foodGroceries: 'Alimentació i Compres',
    transportation: 'Transport',
    housing: 'Habitatge',
    utilities: 'Serveis',
    entertainment: 'Entreteniment',
    healthcare: 'Salut',
    shopping: 'Compres',
    education: 'Educació',
    travel: 'Viatges',
    subscriptions: 'Subscripcions',
    other: 'Altres',
  },
  months: {
    january: 'Gener',
    february: 'Febrer',
    march: 'Març',
    april: 'Abril',
    may: 'Maig',
    june: 'Juny',
    july: 'Juliol',
    august: 'Agost',
    september: 'Setembre',
    october: 'Octubre',
    november: 'Novembre',
    december: 'Desembre',
  },
};

const it: Translations = {
  nav: {
    expenses: 'Spese',
    settings: 'Impostazioni',
    budgetGame: 'Gioco del Budget',
  },
  expenses: {
    title: 'Spese',
    description: 'Traccia le tue spese e confronta con i mesi precedenti',
    addExpense: 'Aggiungi Spesa',
    selectYear: 'Seleziona anno',
    monthlyComparison: 'Confronto Mensile',
    comparing: 'Confrontando',
    vs: 'vs',
    sameSpending: 'Stessa spesa del mese scorso',
    saved: 'Hai risparmiato',
    comparedToLastMonth: 'rispetto al mese scorso!',
    spentMore: 'Hai speso',
    moreThanLastMonth: 'più del mese scorso',
    selectMonth: 'Seleziona mese',
    total: 'Totale',
    noExpenses: 'Nessuna spesa registrata per questo mese.',
    noExpensesForYear: 'Nessuna spesa registrata per',
    clickAddExpense: 'Clicca "Aggiungi Spesa" per iniziare.',
    titleColumn: 'Titolo',
    dateColumn: 'Data',
    categoryColumn: 'Categoria',
    amountColumn: 'Importo',
    actionsColumn: 'Azioni',
    deleteExpense: 'Elimina spesa',
    editExpense: 'Modifica spesa',
    categoryBreakdown: 'Ripartizione per Categoria',
  },
  addExpenseDialog: {
    title: 'Aggiungi Spesa',
    description: 'Aggiungi una nuova spesa per tracciare le tue spese. Tutti i campi sono obbligatori.',
    expenseTitle: 'Titolo',
    titlePlaceholder: 'es., Spesa settimanale',
    category: 'Categoria',
    selectCategory: 'Seleziona una categoria',
    amount: 'Importo',
    date: 'Data',
    cancel: 'Annulla',
    add: 'Aggiungi Spesa',
    adding: 'Aggiungendo...',
  },
  editExpenseDialog: {
    title: 'Modifica Spesa',
    description: 'Aggiorna i dettagli della spesa.',
    save: 'Salva Modifiche',
    saving: 'Salvataggio...',
  },
  settings: {
    title: 'Impostazioni',
    description: 'Configura le tue preferenze di tracciamento del budget',
    currency: 'Valuta',
    currencyDescription: 'Imposta la valuta predefinita per tutte le tue spese. Tutte le transazioni saranno visualizzate in questa valuta.',
    defaultCurrency: 'Valuta Predefinita',
    selectCurrency: 'Seleziona valuta',
    saved: 'Impostazioni salvate con successo',
    language: 'Lingua',
    languageDescription: 'Scegli la tua lingua preferita per l\'interfaccia dell\'applicazione.',
    selectLanguage: 'Seleziona lingua',
    about: 'Informazioni',
    aboutDescription: 'Gioco del Budget ti aiuta a tracciare le tue spese e confrontare le tue spese mensili.',
    aboutText: 'Aggiungi spese per vedere quanto stai risparmiando rispetto ai mesi precedenti. L\'obiettivo è ridurre le tue spese nel tempo e costruire migliori abitudini finanziarie.',
  },
  categories: {
    foodGroceries: 'Alimentari e Spesa',
    transportation: 'Trasporti',
    housing: 'Abitazione',
    utilities: 'Utenze',
    entertainment: 'Intrattenimento',
    healthcare: 'Sanità',
    shopping: 'Shopping',
    education: 'Istruzione',
    travel: 'Viaggi',
    subscriptions: 'Abbonamenti',
    other: 'Altro',
  },
  months: {
    january: 'Gennaio',
    february: 'Febbraio',
    march: 'Marzo',
    april: 'Aprile',
    may: 'Maggio',
    june: 'Giugno',
    july: 'Luglio',
    august: 'Agosto',
    september: 'Settembre',
    october: 'Ottobre',
    november: 'Novembre',
    december: 'Dicembre',
  },
};

const fr: Translations = {
  nav: {
    expenses: 'Dépenses',
    settings: 'Paramètres',
    budgetGame: 'Jeu de Budget',
  },
  expenses: {
    title: 'Dépenses',
    description: 'Suivez vos dépenses et comparez avec les mois précédents',
    addExpense: 'Ajouter Dépense',
    selectYear: 'Sélectionner année',
    monthlyComparison: 'Comparaison Mensuelle',
    comparing: 'Comparaison',
    vs: 'vs',
    sameSpending: 'Mêmes dépenses que le mois dernier',
    saved: 'Vous avez économisé',
    comparedToLastMonth: 'par rapport au mois dernier!',
    spentMore: 'Vous avez dépensé',
    moreThanLastMonth: 'de plus que le mois dernier',
    selectMonth: 'Sélectionner mois',
    total: 'Total',
    noExpenses: 'Aucune dépense enregistrée pour ce mois.',
    noExpensesForYear: 'Aucune dépense enregistrée pour',
    clickAddExpense: 'Cliquez sur "Ajouter Dépense" pour commencer.',
    titleColumn: 'Titre',
    dateColumn: 'Date',
    categoryColumn: 'Catégorie',
    amountColumn: 'Montant',
    actionsColumn: 'Actions',
    deleteExpense: 'Supprimer dépense',
    editExpense: 'Modifier dépense',
    categoryBreakdown: 'Répartition par Catégorie',
  },
  addExpenseDialog: {
    title: 'Ajouter Dépense',
    description: 'Ajoutez une nouvelle dépense pour suivre vos dépenses. Tous les champs sont obligatoires.',
    expenseTitle: 'Titre',
    titlePlaceholder: 'ex., Courses hebdomadaires',
    category: 'Catégorie',
    selectCategory: 'Sélectionnez une catégorie',
    amount: 'Montant',
    date: 'Date',
    cancel: 'Annuler',
    add: 'Ajouter Dépense',
    adding: 'Ajout...',
  },
  editExpenseDialog: {
    title: 'Modifier Dépense',
    description: 'Mettez à jour les détails de la dépense.',
    save: 'Enregistrer',
    saving: 'Enregistrement...',
  },
  settings: {
    title: 'Paramètres',
    description: 'Configurez vos préférences de suivi de budget',
    currency: 'Devise',
    currencyDescription: 'Définissez la devise par défaut pour toutes vos dépenses. Toutes les transactions seront affichées dans cette devise.',
    defaultCurrency: 'Devise par Défaut',
    selectCurrency: 'Sélectionner devise',
    saved: 'Paramètres enregistrés avec succès',
    language: 'Langue',
    languageDescription: 'Choisissez votre langue préférée pour l\'interface de l\'application.',
    selectLanguage: 'Sélectionner langue',
    about: 'À propos',
    aboutDescription: 'Jeu de Budget vous aide à suivre vos dépenses et comparer vos dépenses mensuelles.',
    aboutText: 'Ajoutez des dépenses pour voir combien vous économisez par rapport aux mois précédents. L\'objectif est de réduire vos dépenses au fil du temps et de développer de meilleures habitudes financières.',
  },
  categories: {
    foodGroceries: 'Alimentation et Courses',
    transportation: 'Transport',
    housing: 'Logement',
    utilities: 'Services publics',
    entertainment: 'Divertissement',
    healthcare: 'Santé',
    shopping: 'Shopping',
    education: 'Éducation',
    travel: 'Voyages',
    subscriptions: 'Abonnements',
    other: 'Autre',
  },
  months: {
    january: 'Janvier',
    february: 'Février',
    march: 'Mars',
    april: 'Avril',
    may: 'Mai',
    june: 'Juin',
    july: 'Juillet',
    august: 'Août',
    september: 'Septembre',
    october: 'Octobre',
    november: 'Novembre',
    december: 'Décembre',
  },
};

const he: Translations = {
  nav: {
    expenses: 'הוצאות',
    settings: 'הגדרות',
    budgetGame: 'משחק התקציב',
  },
  expenses: {
    title: 'הוצאות',
    description: 'עקוב אחר ההוצאות שלך והשווה עם חודשים קודמים',
    addExpense: 'הוסף הוצאה',
    selectYear: 'בחר שנה',
    monthlyComparison: 'השוואה חודשית',
    comparing: 'משווה',
    vs: 'מול',
    sameSpending: 'אותה הוצאה כמו בחודש שעבר',
    saved: 'חסכת',
    comparedToLastMonth: 'בהשוואה לחודש שעבר!',
    spentMore: 'הוצאת',
    moreThanLastMonth: 'יותר מהחודש שעבר',
    selectMonth: 'בחר חודש',
    total: 'סה"כ',
    noExpenses: 'אין הוצאות רשומות לחודש זה.',
    noExpensesForYear: 'אין הוצאות רשומות ל',
    clickAddExpense: 'לחץ על "הוסף הוצאה" כדי להתחיל.',
    titleColumn: 'כותרת',
    dateColumn: 'תאריך',
    categoryColumn: 'קטגוריה',
    amountColumn: 'סכום',
    actionsColumn: 'פעולות',
    deleteExpense: 'מחק הוצאה',
    editExpense: 'ערוך הוצאה',
    categoryBreakdown: 'פירוט לפי קטגוריה',
  },
  addExpenseDialog: {
    title: 'הוסף הוצאה',
    description: 'הוסף הוצאה חדשה כדי לעקוב אחר ההוצאות שלך. כל השדות נדרשים.',
    expenseTitle: 'כותרת',
    titlePlaceholder: 'לדוגמה, קניות שבועיות',
    category: 'קטגוריה',
    selectCategory: 'בחר קטגוריה',
    amount: 'סכום',
    date: 'תאריך',
    cancel: 'ביטול',
    add: 'הוסף הוצאה',
    adding: 'מוסיף...',
  },
  editExpenseDialog: {
    title: 'ערוך הוצאה',
    description: 'עדכן את פרטי ההוצאה.',
    save: 'שמור שינויים',
    saving: 'שומר...',
  },
  settings: {
    title: 'הגדרות',
    description: 'הגדר את העדפות מעקב התקציב שלך',
    currency: 'מטבע',
    currencyDescription: 'הגדר את המטבע ברירת המחדל לכל ההוצאות שלך. כל העסקאות יוצגו במטבע זה.',
    defaultCurrency: 'מטבע ברירת מחדל',
    selectCurrency: 'בחר מטבע',
    saved: 'ההגדרות נשמרו בהצלחה',
    language: 'שפה',
    languageDescription: 'בחר את השפה המועדפת עליך לממשק האפליקציה.',
    selectLanguage: 'בחר שפה',
    about: 'אודות',
    aboutDescription: 'משחק התקציב עוזר לך לעקוב אחר ההוצאות שלך ולהשוות את ההוצאות החודשיות שלך.',
    aboutText: 'הוסף הוצאות כדי לראות כמה אתה חוסך בהשוואה לחודשים קודמים. המטרה היא להפחית את ההוצאות שלך לאורך זמן ולבנות הרגלים פיננסיים טובים יותר.',
  },
  categories: {
    foodGroceries: 'מזון וקניות',
    transportation: 'תחבורה',
    housing: 'דיור',
    utilities: 'שירותים',
    entertainment: 'בידור',
    healthcare: 'בריאות',
    shopping: 'קניות',
    education: 'חינוך',
    travel: 'נסיעות',
    subscriptions: 'מנויים',
    other: 'אחר',
  },
  months: {
    january: 'ינואר',
    february: 'פברואר',
    march: 'מרץ',
    april: 'אפריל',
    may: 'מאי',
    june: 'יוני',
    july: 'יולי',
    august: 'אוגוסט',
    september: 'ספטמבר',
    october: 'אוקטובר',
    november: 'נובמבר',
    december: 'דצמבר',
  },
};

const ja: Translations = {
  nav: {
    expenses: '支出',
    settings: '設定',
    budgetGame: '予算ゲーム',
  },
  expenses: {
    title: '支出',
    description: '支出を追跡し、前月と比較します',
    addExpense: '支出を追加',
    selectYear: '年を選択',
    monthlyComparison: '月間比較',
    comparing: '比較中',
    vs: '対',
    sameSpending: '先月と同じ支出',
    saved: '節約額',
    comparedToLastMonth: '先月比！',
    spentMore: '支出額',
    moreThanLastMonth: '先月より多い',
    selectMonth: '月を選択',
    total: '合計',
    noExpenses: 'この月の支出記録はありません。',
    noExpensesForYear: '支出記録なし',
    clickAddExpense: '「支出を追加」をクリックして開始してください。',
    titleColumn: 'タイトル',
    dateColumn: '日付',
    categoryColumn: 'カテゴリ',
    amountColumn: '金額',
    actionsColumn: '操作',
    deleteExpense: '支出を削除',
    editExpense: '支出を編集',
    categoryBreakdown: 'カテゴリ別内訳',
  },
  addExpenseDialog: {
    title: '支出を追加',
    description: '新しい支出を追加して支出を追跡します。すべてのフィールドは必須です。',
    expenseTitle: 'タイトル',
    titlePlaceholder: '例：週間食料品',
    category: 'カテゴリ',
    selectCategory: 'カテゴリを選択',
    amount: '金額',
    date: '日付',
    cancel: 'キャンセル',
    add: '支出を追加',
    adding: '追加中...',
  },
  editExpenseDialog: {
    title: '支出を編集',
    description: '支出の詳細を更新します。',
    save: '変更を保存',
    saving: '保存中...',
  },
  settings: {
    title: '設定',
    description: '予算追跡の設定を構成します',
    currency: '通貨',
    currencyDescription: 'すべての支出のデフォルト通貨を設定します。すべての取引はこの通貨で表示されます。',
    defaultCurrency: 'デフォルト通貨',
    selectCurrency: '通貨を選択',
    saved: '設定が正常に保存されました',
    language: '言語',
    languageDescription: 'アプリケーションインターフェースの優先言語を選択してください。',
    selectLanguage: '言語を選択',
    about: '概要',
    aboutDescription: '予算ゲームは、支出を追跡し、毎月の支出を比較するのに役立ちます。',
    aboutText: '支出を追加して、前月と比べてどれだけ節約しているかを確認してください。目標は、時間とともに支出を減らし、より良い金融習慣を身につけることです。',
  },
  categories: {
    foodGroceries: '食料品',
    transportation: '交通費',
    housing: '住居',
    utilities: '光熱費',
    entertainment: '娯楽',
    healthcare: '医療',
    shopping: 'ショッピング',
    education: '教育',
    travel: '旅行',
    subscriptions: 'サブスクリプション',
    other: 'その他',
  },
  months: {
    january: '1月',
    february: '2月',
    march: '3月',
    april: '4月',
    may: '5月',
    june: '6月',
    july: '7月',
    august: '8月',
    september: '9月',
    october: '10月',
    november: '11月',
    december: '12月',
  },
};

const ru: Translations = {
  nav: {
    expenses: 'Расходы',
    settings: 'Настройки',
    budgetGame: 'Игра бюджета',
  },
  expenses: {
    title: 'Расходы',
    description: 'Отслеживайте свои расходы и сравнивайте с предыдущими месяцами',
    addExpense: 'Добавить расход',
    selectYear: 'Выбрать год',
    monthlyComparison: 'Месячное сравнение',
    comparing: 'Сравнение',
    vs: 'против',
    sameSpending: 'Такие же расходы, как в прошлом месяце',
    saved: 'Вы сэкономили',
    comparedToLastMonth: 'по сравнению с прошлым месяцем!',
    spentMore: 'Вы потратили',
    moreThanLastMonth: 'больше, чем в прошлом месяце',
    selectMonth: 'Выбрать месяц',
    total: 'Итого',
    noExpenses: 'Нет записей о расходах за этот месяц.',
    noExpensesForYear: 'Нет записей о расходах за',
    clickAddExpense: 'Нажмите "Добавить расход", чтобы начать.',
    titleColumn: 'Название',
    dateColumn: 'Дата',
    categoryColumn: 'Категория',
    amountColumn: 'Сумма',
    actionsColumn: 'Действия',
    deleteExpense: 'Удалить расход',
    editExpense: 'Редактировать расход',
    categoryBreakdown: 'Разбивка по категориям',
  },
  addExpenseDialog: {
    title: 'Добавить расход',
    description: 'Добавьте новый расход для отслеживания ваших трат. Все поля обязательны.',
    expenseTitle: 'Название',
    titlePlaceholder: 'напр., Еженедельные продукты',
    category: 'Категория',
    selectCategory: 'Выберите категорию',
    amount: 'Сумма',
    date: 'Дата',
    cancel: 'Отмена',
    add: 'Добавить расход',
    adding: 'Добавление...',
  },
  editExpenseDialog: {
    title: 'Редактировать расход',
    description: 'Обновите детали расхода.',
    save: 'Сохранить изменения',
    saving: 'Сохранение...',
  },
  settings: {
    title: 'Настройки',
    description: 'Настройте параметры отслеживания бюджета',
    currency: 'Валюта',
    currencyDescription: 'Установите валюту по умолчанию для всех ваших расходов. Все транзакции будут отображаться в этой валюте.',
    defaultCurrency: 'Валюта по умолчанию',
    selectCurrency: 'Выбрать валюту',
    saved: 'Настройки успешно сохранены',
    language: 'Язык',
    languageDescription: 'Выберите предпочитаемый язык интерфейса приложения.',
    selectLanguage: 'Выбрать язык',
    about: 'О программе',
    aboutDescription: 'Игра бюджета помогает отслеживать ваши расходы и сравнивать ежемесячные траты.',
    aboutText: 'Добавляйте расходы, чтобы увидеть, сколько вы экономите по сравнению с предыдущими месяцами. Цель - сокращать расходы со временем и формировать лучшие финансовые привычки.',
  },
  categories: {
    foodGroceries: 'Продукты питания',
    transportation: 'Транспорт',
    housing: 'Жилье',
    utilities: 'Коммунальные услуги',
    entertainment: 'Развлечения',
    healthcare: 'Здравоохранение',
    shopping: 'Покупки',
    education: 'Образование',
    travel: 'Путешествия',
    subscriptions: 'Подписки',
    other: 'Другое',
  },
  months: {
    january: 'Январь',
    february: 'Февраль',
    march: 'Март',
    april: 'Апрель',
    may: 'Май',
    june: 'Июнь',
    july: 'Июль',
    august: 'Август',
    september: 'Сентябрь',
    october: 'Октябрь',
    november: 'Ноябрь',
    december: 'Декабрь',
  },
};

const zh: Translations = {
  nav: {
    expenses: '支出',
    settings: '设置',
    budgetGame: '预算游戏',
  },
  expenses: {
    title: '支出',
    description: '跟踪您的支出并与前几个月进行比较',
    addExpense: '添加支出',
    selectYear: '选择年份',
    monthlyComparison: '月度比较',
    comparing: '比较',
    vs: '对比',
    sameSpending: '与上个月支出相同',
    saved: '您节省了',
    comparedToLastMonth: '与上个月相比！',
    spentMore: '您花费了',
    moreThanLastMonth: '比上个月多',
    selectMonth: '选择月份',
    total: '总计',
    noExpenses: '本月没有记录的支出。',
    noExpensesForYear: '没有记录的支出',
    clickAddExpense: '点击"添加支出"开始。',
    titleColumn: '标题',
    dateColumn: '日期',
    categoryColumn: '类别',
    amountColumn: '金额',
    actionsColumn: '操作',
    deleteExpense: '删除支出',
    editExpense: '编辑支出',
    categoryBreakdown: '类别明细',
  },
  addExpenseDialog: {
    title: '添加支出',
    description: '添加新支出以跟踪您的花费。所有字段都是必填的。',
    expenseTitle: '标题',
    titlePlaceholder: '例如，每周杂货',
    category: '类别',
    selectCategory: '选择类别',
    amount: '金额',
    date: '日期',
    cancel: '取消',
    add: '添加支出',
    adding: '添加中...',
  },
  editExpenseDialog: {
    title: '编辑支出',
    description: '更新支出详情。',
    save: '保存更改',
    saving: '保存中...',
  },
  settings: {
    title: '设置',
    description: '配置您的预算跟踪偏好',
    currency: '货币',
    currencyDescription: '设置所有支出的默认货币。所有交易将以此货币显示。',
    defaultCurrency: '默认货币',
    selectCurrency: '选择货币',
    saved: '设置保存成功',
    language: '语言',
    languageDescription: '选择应用程序界面的首选语言。',
    selectLanguage: '选择语言',
    about: '关于',
    aboutDescription: '预算游戏帮助您跟踪支出并比较每月开支。',
    aboutText: '添加支出以查看与前几个月相比您节省了多少。目标是随着时间的推移减少支出并建立更好的财务习惯。',
  },
  categories: {
    foodGroceries: '食品杂货',
    transportation: '交通',
    housing: '住房',
    utilities: '公用事业',
    entertainment: '娱乐',
    healthcare: '医疗保健',
    shopping: '购物',
    education: '教育',
    travel: '旅行',
    subscriptions: '订阅',
    other: '其他',
  },
  months: {
    january: '一月',
    february: '二月',
    march: '三月',
    april: '四月',
    may: '五月',
    june: '六月',
    july: '七月',
    august: '八月',
    september: '九月',
    october: '十月',
    november: '十一月',
    december: '十二月',
  },
};

export const translations: Record<Language, Translations> = {
  en,
  es,
  ca,
  it,
  fr,
  he,
  ja,
  ru,
  zh,
};

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.en;
}

export function getMonthName(language: Language, monthIndex: number): string {
  const t = getTranslation(language);
  const monthKeys: (keyof Translations['months'])[] = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  return t.months[monthKeys[monthIndex]];
}

export function getMonthShortName(language: Language, monthIndex: number): string {
  const name = getMonthName(language, monthIndex);
  // For CJK languages, use full name as they're already short
  if (['ja', 'zh'].includes(language)) {
    return name;
  }
  return name.slice(0, 3);
}

export function getCategoryName(language: Language, categoryKey: string): string {
  const t = getTranslation(language);
  const categoryMap: Record<string, keyof Translations['categories']> = {
    'Food & Groceries': 'foodGroceries',
    'Transportation': 'transportation',
    'Housing': 'housing',
    'Utilities': 'utilities',
    'Entertainment': 'entertainment',
    'Healthcare': 'healthcare',
    'Shopping': 'shopping',
    'Education': 'education',
    'Travel': 'travel',
    'Subscriptions': 'subscriptions',
    'Other': 'other',
  };
  const key = categoryMap[categoryKey];
  return key ? t.categories[key] : categoryKey;
}
