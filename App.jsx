import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import * as Icons from 'lucide-react';

// Système de traduction
const translations = {
fr: {
// Header
title: 'Gestionnaire Financier Personnel',
income: 'Revenus',
userName: 'Nom d\'utilisateur',

// Navigation
dashboard: 'Tableau de bord',
budget: 'Budget',
expenses: 'Dépenses',
savings: 'Épargne',
calendar: 'Calendrier',
recurring: 'Récurrent',
debts: 'Dettes',
reports: 'Rapports',

// Dashboard
revenue: 'Revenus',
economy: 'Économies',
totalSavings: 'Épargne totale',
expenseDistribution: 'Répartition des dépenses',
expenseEvolution: 'Évolution des dépenses',
budgetOverview: 'Aperçu du budget',
remaining: 'restant',

// Categories
housing: 'Logement',
food: 'Alimentation',
transport: 'Transport',
leisure: 'Loisirs',
health: 'Santé',

// Common
add: 'Ajouter',
edit: 'Modifier',
delete: 'Supprimer',
save: 'Sauvegarder',
cancel: 'Annuler',
amount: 'Montant',
description: 'Description',
category: 'Catégorie',
date: 'Date',
month: 'Mois',
year: 'Année',
newCategory: 'Nouvelle catégorie',
monthlyBudget: 'Budget mensuel',
addExpense: 'Ajouter une dépense',
expenseHistory: 'Historique des dépenses',
noExpenses: 'Aucune dépense ce mois-ci',
newSavingsGoal: 'Nouvel objectif d\'épargne',
goalName: 'Nom de l\'objectif',
targetAmount: 'Montant cible',
deadline: 'Échéance',
create: 'Créer',
reached: 'atteint',
newRecurring: 'Nouvelle dépense récurrente',
dayOfMonth: 'Jour du mois (1-31)',
deductionDate: 'Date de prélèvement',
active: 'Actif',
inactive: 'Inactif',
monthlyRecurringTotal: 'Total mensuel récurrent',
newDebt: 'Nouvelle dette',
debtName: 'Nom de la dette',
currentBalance: 'Solde actuel',
minimumPayment: 'Paiement minimum',
interestRate: 'Taux d\'intérêt (%)',
balance: 'Solde',
minPayment: 'Paiement min',
rate: 'Taux',
recordPayment: 'Enregistrer un paiement',
totalDebts: 'Total des dettes',
monthlyMinPayments: 'Paiements mensuels min',
financialReports: 'Rapports financiers',
monthlyReport: 'Rapport mensuel',
detailedView: 'Vue détaillée de vos finances pour',
generateReport: 'Générer le rapport',
annualAnalysis: 'Analyse annuelle',
trends12Months: 'Tendances et projections sur 12 mois',
viewAnalysis: 'Voir l\'analyse',
modifyMonthlyIncome: 'Modifier les revenus mensuels',
monthlyIncome: 'Revenus mensuels',
language: 'Langue',
currency: 'Devise',
addCurrency: 'Ajouter une devise',
paymentHistory: 'Historique des paiements'
},
en: {
// Header
title: 'Personal Finance Manager',
income: 'Income',
userName: 'User Name',

// Navigation
dashboard: 'Dashboard',
budget: 'Budget',
expenses: 'Expenses',
savings: 'Savings',
calendar: 'Calendar',
recurring: 'Recurring',
debts: 'Debts',
reports: 'Reports',

// Dashboard
revenue: 'Revenue',
economy: 'Savings',
totalSavings: 'Total Savings',
expenseDistribution: 'Expense Distribution',
expenseEvolution: 'Expense Evolution',
budgetOverview: 'Budget Overview',
remaining: 'remaining',

// Categories
housing: 'Housing',
food: 'Food',
transport: 'Transport',
leisure: 'Leisure',
health: 'Health',

// Common
add: 'Add',
edit: 'Edit',
delete: 'Delete',
save: 'Save',
cancel: 'Cancel',
amount: 'Amount',
description: 'Description',
category: 'Category',
date: 'Date',
month: 'Month',
year: 'Year',
newCategory: 'New Category',
monthlyBudget: 'Monthly Budget',
addExpense: 'Add Expense',
expenseHistory: 'Expense History',
noExpenses: 'No expenses this month',
newSavingsGoal: 'New Savings Goal',
goalName: 'Goal Name',
targetAmount: 'Target Amount',
deadline: 'Deadline',
create: 'Create',
reached: 'reached',
newRecurring: 'New Recurring Expense',
dayOfMonth: 'Day of Month (1-31)',
deductionDate: 'Deduction Date',
active: 'Active',
inactive: 'Inactive',
monthlyRecurringTotal: 'Monthly Recurring Total',
newDebt: 'New Debt',
debtName: 'Debt Name',
currentBalance: 'Current Balance',
minimumPayment: 'Minimum Payment',
interestRate: 'Interest Rate (%)',
balance: 'Balance',
minPayment: 'Min Payment',
rate: 'Rate',
recordPayment: 'Record Payment',
totalDebts: 'Total Debts',
monthlyMinPayments: 'Monthly Min Payments',
financialReports: 'Financial Reports',
monthlyReport: 'Monthly Report',
detailedView: 'Detailed view of your finances for',
generateReport: 'Generate Report',
annualAnalysis: 'Annual Analysis',
trends12Months: 'Trends and projections over 12 months',
viewAnalysis: 'View Analysis',
modifyMonthlyIncome: 'Modify Monthly Income',
monthlyIncome: 'Monthly Income',
language: 'Language',
currency: 'Currency',
addCurrency: 'Add Currency',
paymentHistory: 'Payment History'
},
es: {
// Header
title: 'Gestor Financiero Personal',
income: 'Ingresos',
userName: 'Nombre de Usuario',

// Navigation
dashboard: 'Panel',
budget: 'Presupuesto',
expenses: 'Gastos',
savings: 'Ahorros',
calendar: 'Calendario',
recurring: 'Recurrente',
debts: 'Deudas',
reports: 'Informes',

// Dashboard
revenue: 'Ingresos',
economy: 'Ahorros',
totalSavings: 'Ahorros Totales',
expenseDistribution: 'Distribución de Gastos',
expenseEvolution: 'Evolución de Gastos',
budgetOverview: 'Resumen del Presupuesto',
remaining: 'restante',

// Categories
housing: 'Vivienda',
food: 'Alimentación',
transport: 'Transporte',
leisure: 'Ocio',
health: 'Salud',

// Common
add: 'Añadir',
edit: 'Editar',
delete: 'Eliminar',
save: 'Guardar',
cancel: 'Cancelar',
amount: 'Cantidad',
description: 'Descripción',
category: 'Categoría',
date: 'Fecha',
month: 'Mes',
year: 'Año',
newCategory: 'Nueva Categoría',
monthlyBudget: 'Presupuesto Mensual',
addExpense: 'Añadir Gasto',
expenseHistory: 'Historial de Gastos',
noExpenses: 'No hay gastos este mes',
newSavingsGoal: 'Nuevo Objetivo de Ahorro',
goalName: 'Nombre del Objetivo',
targetAmount: 'Cantidad Objetivo',
deadline: 'Fecha Límite',
create: 'Crear',
reached: 'alcanzado',
newRecurring: 'Nuevo Gasto Recurrente',
dayOfMonth: 'Día del Mes (1-31)',
deductionDate: 'Fecha de Deducción',
active: 'Activo',
inactive: 'Inactivo',
monthlyRecurringTotal: 'Total Mensual Recurrente',
newDebt: 'Nueva Deuda',
debtName: 'Nombre de la Deuda',
currentBalance: 'Saldo Actual',
minimumPayment: 'Pago Mínimo',
interestRate: 'Tasa de Interés (%)',
balance: 'Saldo',
minPayment: 'Pago Mín',
rate: 'Tasa',
recordPayment: 'Registrar Pago',
totalDebts: 'Total de Deudas',
monthlyMinPayments: 'Pagos Mínimos Mensuales',
financialReports: 'Informes Financieros',
monthlyReport: 'Informe Mensual',
detailedView: 'Vista detallada de sus finanzas para',
generateReport: 'Generar Informe',
annualAnalysis: 'Análisis Anual',
trends12Months: 'Tendencias y proyecciones de 12 meses',
viewAnalysis: 'Ver Análisis',
modifyMonthlyIncome: 'Modificar Ingresos Mensuales',
monthlyIncome: 'Ingresos Mensuales',
language: 'Idioma',
currency: 'Moneda',
addCurrency: 'Añadir Moneda',
paymentHistory: 'Historial de Pagos'
},
de: {
// Header
title: 'Persönlicher Finanzmanager',
income: 'Einkommen',
userName: 'Benutzername',

// Navigation
dashboard: 'Dashboard',
budget: 'Budget',
expenses: 'Ausgaben',
savings: 'Sparen',
calendar: 'Kalender',
recurring: 'Wiederkehrend',
debts: 'Schulden',
reports: 'Berichte',

// Dashboard
revenue: 'Einnahmen',
economy: 'Ersparnisse',
totalSavings: 'Gesamte Ersparnisse',
expenseDistribution: 'Ausgabenverteilung',
expenseEvolution: 'Ausgabenentwicklung',
budgetOverview: 'Budget-Übersicht',
remaining: 'übrig',

// Categories
housing: 'Wohnen',
food: 'Lebensmittel',
transport: 'Transport',
leisure: 'Freizeit',
health: 'Gesundheit',

// Common
add: 'Hinzufügen',
edit: 'Bearbeiten',
delete: 'Löschen',
save: 'Speichern',
cancel: 'Abbrechen',
amount: 'Betrag',
description: 'Beschreibung',
category: 'Kategorie',
date: 'Datum',
month: 'Monat',
year: 'Jahr',
newCategory: 'Neue Kategorie',
monthlyBudget: 'Monatsbudget',
addExpense: 'Ausgabe hinzufügen',
expenseHistory: 'Ausgabenhistorie',
noExpenses: 'Keine Ausgaben in diesem Monat',
newSavingsGoal: 'Neues Sparziel',
goalName: 'Name des Ziels',
targetAmount: 'Zielbetrag',
deadline: 'Fristablauf',
create: 'Erstellen',
reached: 'erreicht',
newRecurring: 'Neue wiederkehrende Ausgabe',
dayOfMonth: 'Tag des Monats (1-31)',
deductionDate: 'Abzugsdatum',
active: 'Aktiv',
inactive: 'Inaktiv',
monthlyRecurringTotal: 'Monatlicher wiederkehrender Gesamtbetrag',
newDebt: 'Neue Schuld',
debtName: 'Name der Schuld',
currentBalance: 'Aktueller Saldo',
minimumPayment: 'Mindestzahlung',
interestRate: 'Zinssatz (%)',
balance: 'Saldo',
minPayment: 'Min. Zahlung',
rate: 'Satz',
recordPayment: 'Zahlung erfassen',
totalDebts: 'Gesamtschulden',
monthlyMinPayments: 'Monatliche Mindestzahlungen',
financialReports: 'Finanzberichte',
monthlyReport: 'Monatsbericht',
detailedView: 'Detaillierte Ansicht Ihrer Finanzen für',
generateReport: 'Bericht erstellen',
annualAnalysis: 'Jahresanalyse',
trends12Months: 'Trends und Prognosen über 12 Monate',
viewAnalysis: 'Analyse anzeigen',
modifyMonthlyIncome: 'Monatliches Einkommen ändern',
monthlyIncome: 'Monatliches Einkommen',
language: 'Sprache',
currency: 'Währung',
addCurrency: 'Währung hinzufügen',
paymentHistory: 'Zahlungshistorie'
},
ar: {
// Header
title: 'مدير الشؤون المالية الشخصية',
income: 'الدخل',
userName: 'اسم المستخدم',

// Navigation
dashboard: 'لوحة التحكم',
budget: 'الميزانية',
expenses: 'المصروفات',
savings: 'المدخرات',
calendar: 'التقويم',
recurring: 'متكرر',
debts: 'الديون',
reports: 'التقارير',

// Dashboard
revenue: 'الإيرادات',
economy: 'المدخرات',
totalSavings: 'إجمالي المدخرات',
expenseDistribution: 'توزيع المصروفات',
expenseEvolution: 'تطور المصروفات',
budgetOverview: 'نظرة عامة على الميزانية',
remaining: 'متبقي',

// Categories
housing: 'السكن',
food: 'الطعام',
transport: 'النقل',
leisure: 'الترفيه',
health: 'الصحة',

// Common
add: 'إضافة',
edit: 'تعديل',
delete: 'حذف',
save: 'حفظ',
cancel: 'إلغاء',
amount: 'المبلغ',
description: 'الوصف',
category: 'الفئة',
date: 'التاريخ',
month: 'الشهر',
year: 'السنة',
newCategory: 'فئة جديدة',
monthlyBudget: 'الميزانية الشهرية',
addExpense: 'إضافة مصروف',
expenseHistory: 'تاريخ المصروفات',
noExpenses: 'لا توجد مصروفات هذا الشهر',
newSavingsGoal: 'هدف ادخار جديد',
goalName: 'اسم الهدف',
targetAmount: 'المبلغ المستهدف',
deadline: 'الموعد النهائي',
create: 'إنشاء',
reached: 'تم الوصول',
newRecurring: 'مصروف متكرر جديد',
dayOfMonth: 'يوم من الشهر (1-31)',
deductionDate: 'تاريخ الخصم',
active: 'نشط',
inactive: 'غير نشط',
monthlyRecurringTotal: 'إجمالي المصروفات المتكررة الشهرية',
newDebt: 'دين جديد',
debtName: 'اسم الدين',
currentBalance: 'الرصيد الحالي',
minimumPayment: 'الحد الأدنى للدفع',
interestRate: 'معدل الفائدة (%)',
balance: 'الرصيد',
minPayment: 'الحد الأدنى للدفع',
rate: 'المعدل',
recordPayment: 'تسجيل دفع',
totalDebts: 'إجمالي الديون',
monthlyMinPayments: 'الحد الأدنى للمدفوعات الشهرية',
financialReports: 'التقارير المالية',
monthlyReport: 'التقرير الشهري',
detailedView: 'عرض تفصيلي لأموالك لشهر',
generateReport: 'إنتاج التقرير',
annualAnalysis: 'التحليل السنوي',
trends12Months: 'الاتجاهات والتوقعات على مدى 12 شهرًا',
viewAnalysis: 'عرض التحليل',
modifyMonthlyIncome: 'تعديل الدخل الشهري',
monthlyIncome: 'الدخل الشهري',
language: 'اللغة',
currency: 'العملة',
addCurrency: 'إضافة عملة',
paymentHistory: 'تاريخ المدفوعات'
}
};

const FinanceDashboard = () => {
// Configuration initiale avec langue et devises
const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'fr');
const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
const [showBalances, setShowBalances] = useState(true);
const [activeTab, setActiveTab] = useState('dashboard');
const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
const [notifications, setNotifications] = useState([]);
const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');

// Helper pour les traductions
const t = (key) => translations[language]?.[key] || translations.fr[key] || key;

// Système de devises
const [currencies, setCurrencies] = useState(() => {
const saved = localStorage.getItem('currencies');
return saved ? JSON.parse(saved) : [
{ code: 'EUR', symbol: '€', name: 'Euro' },
{ code: 'USD', symbol: '$', name: 'Dollar américain' }
];
});

const [selectedCurrency, setSelectedCurrency] = useState(() => {
return localStorage.getItem('selectedCurrency') || 'EUR';
});

const getCurrentCurrency = () => currencies.find(c => c.code === selectedCurrency) || currencies[0];

// Revenus modifiables
const [monthlyIncome, setMonthlyIncome] = useState(() => {
const saved = localStorage.getItem('monthlyIncome');
return saved ? parseFloat(saved) : 3500;
});

// État pour les modals
const [showIncomeModal, setShowIncomeModal] = useState(false);
const [showSavingsModal, setShowSavingsModal] = useState(false);
const [showRecurringModal, setShowRecurringModal] = useState(false);
const [showDebtModal, setShowDebtModal] = useState(false);
const [showCurrencyModal, setShowCurrencyModal] = useState(false);
const [editingItem, setEditingItem] = useState(null);

// Données principales avec nouvelles catégories traduites
const [categories, setCategories] = useState(() => {
const saved = localStorage.getItem('categories');
return saved ? JSON.parse(saved) : [
{ id: 1, name: t('housing'), budget: 1200, spent: 1200, color: '#3B82F6' },
{ id: 2, name: t('food'), budget: 400, spent: 320, color: '#10B981' },
{ id: 3, name: t('transport'), budget: 300, spent: 280, color: '#8B5CF6' },
{ id: 4, name: t('leisure'), budget: 200, spent: 150, color: '#EC4899' },
{ id: 5, name: t('health'), budget: 150, spent: 80, color: '#EF4444' }
];
});

const [expenses, setExpenses] = useState(() => {
const saved = localStorage.getItem('expenses');
return saved ? JSON.parse(saved) : [
{ id: 1, date: '2024-12-28', category: t('food'), amount: 45.50, description: 'Courses Carrefour' },
{ id: 2, date: '2024-12-27', category: t('transport'), amount: 12.80, description: 'Métro' },
{ id: 3, date: '2024-12-26', category: t('leisure'), amount: 35.00, description: 'Cinéma' }
];
});

const [savingsGoals, setSavingsGoals] = useState(() => {
const saved = localStorage.getItem('savingsGoals');
return saved ? JSON.parse(saved) : [
{ id: 1, name: 'Vacances', target: 3000, current: 1250, color: '#3B82F6', deadline: '2025-12-31' },
{ id: 2, name: 'Urgence', target: 10000, current: 4500, color: '#10B981', deadline: '2026-12-31' }
];
});

const [recurringExpenses, setRecurringExpenses] = useState(() => {
const saved = localStorage.getItem('recurringExpenses');
return saved ? JSON.parse(saved) : [
{ id: 1, name: 'Loyer', amount: 1200, day: 1, category: t('housing'), active: true, deductionDate: '01/01' },
{ id: 2, name: 'Netflix', amount: 13.99, day: 5, category: t('leisure'), active: true, deductionDate: '05/01' },
{ id: 3, name: 'Assurance', amount: 85, day: 15, category: t('transport'), active: true, deductionDate: '15/01' }
];
});

const [debts, setDebts] = useState(() => {
const saved = localStorage.getItem('debts');
return saved ? JSON.parse(saved) : [
{ 
id: 1, 
name: 'Carte crédit', 
balance: 2500, 
minPayment: 75, 
rate: 18.9, 
type: 'credit_card',
paymentHistory: []
},
{ 
id: 2, 
name: 'Prêt auto', 
balance: 12000, 
minPayment: 320, 
rate: 4.5, 
type: 'auto_loan',
paymentHistory: []
}
];
});

const [newExpense, setNewExpense] = useState({
date: new Date().toISOString().split('T')[0],
category: '',
amount: '',
description: ''
});

const [newCategory, setNewCategory] = useState({ name: '', budget: '' });
const [showCategoryForm, setShowCategoryForm] = useState(false);

// Sauvegarde automatique
useEffect(() => {
localStorage.setItem('language', language);
}, [language]);

useEffect(() => {
localStorage.setItem('currencies', JSON.stringify(currencies));
}, [currencies]);

useEffect(() => {
localStorage.setItem('selectedCurrency', selectedCurrency);
}, [selectedCurrency]);

useEffect(() => {
localStorage.setItem('categories', JSON.stringify(categories));
}, [categories]);

useEffect(() => {
localStorage.setItem('expenses', JSON.stringify(expenses));
}, [expenses]);

useEffect(() => {
localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals));
}, [savingsGoals]);

useEffect(() => {
localStorage.setItem('recurringExpenses', JSON.stringify(recurringExpenses));
}, [recurringExpenses]);

useEffect(() => {
localStorage.setItem('debts', JSON.stringify(debts));
}, [debts]);

useEffect(() => {
localStorage.setItem('monthlyIncome', monthlyIncome.toString());
}, [monthlyIncome]);

useEffect(() => {
localStorage.setItem('userName', userName);
}, [userName]);

useEffect(() => {
localStorage.setItem('darkMode', darkMode);
if (darkMode) {
document.documentElement.classList.add('dark');
} else {
document.documentElement.classList.remove('dark');
}
}, [darkMode]);

// Support RTL pour l'arabe
useEffect(() => {
if (language === 'ar') {
document.dir = 'rtl';
document.documentElement.style.direction = 'rtl';
} else {
document.dir = 'ltr';
document.documentElement.style.direction = 'ltr';
}
}, [language]);

// Initialisation de la catégorie par défaut dans newExpense
useEffect(() => {
if (categories.length > 0 && !newExpense.category) {
setNewExpense(prev => ({ ...prev, category: categories[0].name }));
}
}, [categories]);

// Calculs avec revenus dynamiques
const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
const totalSpent = useMemo(() => {
const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth));
const spent = {};

monthExpenses.forEach(expense => {
if (!spent[expense.category]) spent[expense.category] = 0;
spent[expense.category] += expense.amount;
});

return categories.reduce((sum, cat) => sum + (spent[cat.name] || 0), 0);
}, [expenses, categories, selectedMonth]);

const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.current, 0);
const totalRecurring = recurringExpenses.filter(e => e.active).reduce((sum, exp) => sum + exp.amount, 0);
const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);

// Données pour graphiques
const monthlyData = useMemo(() => {
const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth));
const data = {};

monthExpenses.forEach(expense => {
if (!data[expense.category]) data[expense.category] = 0;
data[expense.category] += expense.amount;
});

return categories.map(cat => ({
name: cat.name,
spent: data[cat.name] || 0,
budget: cat.budget
}));
}, [expenses, categories, selectedMonth]);

const spendingTrend = useMemo(() => {
const months = [];
const today = new Date();

for (let i = 5; i >= 0; i--) {
const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
const monthStr = date.toISOString().slice(0, 7);
const monthExpenses = expenses.filter(e => e.date.startsWith(monthStr));
const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

months.push({
month: date.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'fr-FR', { month: 'short' }),
amount: total
});
}

return months;
}, [expenses, language]);

// Nouvelles données pour l'analyse annuelle
const annualData = useMemo(() => {
const months = [];
const currentYear = new Date().getFullYear();

for (let i = 0; i < 12; i++) {
const date = new Date(currentYear, i, 1);
const monthStr = date.toISOString().slice(0, 7);
const monthExpenses = expenses.filter(e => e.date.startsWith(monthStr));
const monthRevenue = monthlyIncome; // Pour simplifier, revenus constants
const totalExpenses = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
const savings = monthRevenue - totalExpenses;

months.push({
month: date.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'fr-FR', { month: 'short' }),
revenue: monthRevenue,
expenses: totalExpenses,
savings: savings > 0 ? savings : 0,
deficit: savings < 0 ? Math.abs(savings) : 0
});
}

return months;
}, [expenses, monthlyIncome, language]);

// Pie chart data pour la répartition des dépenses
const pieChartData = useMemo(() => {
const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth));
const data = {};

monthExpenses.forEach(expense => {
if (!data[expense.category]) data[expense.category] = 0;
data[expense.category] += expense.amount;
});

return Object.keys(data).map(categoryName => {
const category = categories.find(cat => cat.name === categoryName);
return {
name: categoryName,
value: data[categoryName],
color: category?.color || '#888888'
};
});
}, [expenses, categories, selectedMonth]);

// Calendrier avec support multi-années
const getDaysInMonth = (year, month) => {
const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);
const days = [];

for (let i = 0; i < firstDay.getDay(); i++) {
days.push(null);
}

for (let i = 1; i <= lastDay.getDate(); i++) {
days.push(i);
}

return days;
};

const calendarDays = useMemo(() => {
const [year, month] = selectedMonth.split('-');
return getDaysInMonth(parseInt(year), parseInt(month) - 1);
}, [selectedMonth]);

// Génération d'années (2020-2030)
const availableYears = useMemo(() => {
const years = [];
for (let year = 2020; year <= 2030; year++) {
years.push(year);
}
return years;
}, []);

// Fonctions pour les devises
const addCurrency = (currency) => {
const newCurrency = {
...currency,
code: currency.code.toUpperCase()
};
setCurrencies([...currencies, newCurrency]);
setShowCurrencyModal(false);
showNotification('Devise ajoutée avec succès');
};

// Fonctions CRUD
const addExpense = () => {
const amount = parseFloat(newExpense.amount);
if (!amount || !newExpense.description || !newExpense.category) {
showNotification('Veuillez remplir tous les champs', 'error');
return;
}

const expense = {
id: Date.now(),
...newExpense,
amount
};

setExpenses(prevExpenses => [...prevExpenses, expense]);

setNewExpense({
date: new Date().toISOString().split('T')[0],
category: categories.length > 0 ? categories[0].name : '',
amount: '',
description: ''
});

showNotification('Dépense ajoutée avec succès');
};

const deleteExpense = (id) => {
if (window.confirm('Supprimer cette dépense ?')) {
setExpenses(expenses.filter(e => e.id !== id));
showNotification('Dépense supprimée');
}
};

const editExpense = (id) => {
const expense = expenses.find(e => e.id === id);
if (expense) {
const newDescription = prompt('Nouvelle description:', expense.description);
const newAmount = prompt('Nouveau montant:', expense.amount);
if (newDescription && newAmount) {
setExpenses(expenses.map(e => 
e.id === id 
? { ...e, description: newDescription, amount: parseFloat(newAmount) }
: e
));
showNotification('Dépense modifiée');
}
}
};

const addCategory = () => {
const budget = parseFloat(newCategory.budget);
if (!newCategory.name || !budget) {
showNotification('Veuillez remplir tous les champs', 'error');
return;
}

const category = {
id: Date.now(),
name: newCategory.name,
budget: budget,
spent: 0,
color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
};

setCategories([...categories, category]);
setNewCategory({ name: '', budget: '' });
setShowCategoryForm(false);
showNotification('Catégorie ajoutée');
};

const deleteCategory = (id) => {
if (window.confirm('Supprimer cette catégorie ?')) {
const category = categories.find(c => c.id === id);
setCategories(categories.filter(c => c.id !== id));
setExpenses(expenses.filter(e => e.category !== category.name));
showNotification('Catégorie supprimée');
}
};

const editCategory = (id) => {
const category = categories.find(c => c.id === id);
if (category) {
const newName = prompt('Nouveau nom:', category.name);
const newBudget = prompt('Nouveau budget:', category.budget);
if (newName && newBudget) {
setCategories(categories.map(c => 
c.id === id 
? { ...c, name: newName, budget: parseFloat(newBudget) }
: c
));
showNotification('Catégorie modifiée');
}
}
};

const updateCategory = (id, updates) => {
setCategories(categories.map(cat =>
cat.id === id ? { ...cat, ...updates } : cat
));
showNotification('Catégorie mise à jour');
};

// Fonctions pour les objectifs d'épargne
const addSavingsGoal = (goal) => {
const newGoal = {
id: Date.now(),
...goal,
current: 0,
color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
};
setSavingsGoals([...savingsGoals, newGoal]);
setShowSavingsModal(false);
showNotification('Objectif d\'épargne créé');
};

const updateSavingsGoal = (id, amount) => {
setSavingsGoals(goals =>
goals.map(goal =>
goal.id === id
? { ...goal, current: Math.max(0, Math.min(goal.current + amount, goal.target)) }
: goal
)
);
showNotification('Objectif mis à jour');
};

const editSavingsGoal = (id) => {
const goal = savingsGoals.find(g => g.id === id);
if (goal) {
const newName = prompt('Nouveau nom:', goal.name);
const newTarget = prompt('Nouveau montant cible:', goal.target);
if (newName && newTarget) {
setSavingsGoals(savingsGoals.map(g => 
g.id === id 
? { ...g, name: newName, target: parseFloat(newTarget) }
: g
));
showNotification('Objectif d\'épargne modifié');
}
}
};

const deleteSavingsGoal = (id) => {
if (window.confirm('Supprimer cet objectif ?')) {
setSavingsGoals(savingsGoals.filter(g => g.id !== id));
showNotification('Objectif supprimé');
}
};

// Fonctions pour les dépenses récurrentes
const addRecurringExpense = (expense) => {
const newExpense = {
id: Date.now(),
...expense,
active: true
};
setRecurringExpenses([...recurringExpenses, newExpense]);
setShowRecurringModal(false);
showNotification('Dépense récurrente ajoutée');
};

const updateRecurringExpenseDate = (id, deductionDate) => {
setRecurringExpenses(expenses =>
expenses.map(exp =>
exp.id === id ? { ...exp, deductionDate } : exp
)
);
showNotification('Date de prélèvement mise à jour');
};

const editRecurringExpense = (id) => {
const expense = recurringExpenses.find(e => e.id === id);
if (expense) {
const newName = prompt('Nouveau nom:', expense.name);
const newAmount = prompt('Nouveau montant:', expense.amount);
if (newName && newAmount) {
setRecurringExpenses(recurringExpenses.map(e => 
e.id === id 
? { ...e, name: newName, amount: parseFloat(newAmount) }
: e
));
showNotification('Dépense récurrente modifiée');
}
}
};

const toggleRecurringExpense = (id) => {
setRecurringExpenses(expenses =>
expenses.map(exp =>
exp.id === id ? { ...exp, active: !exp.active } : exp
)
);
};

const deleteRecurringExpense = (id) => {
if (window.confirm('Supprimer cette dépense récurrente ?')) {
setRecurringExpenses(recurringExpenses.filter(e => e.id !== id));
showNotification('Dépense récurrente supprimée');
}
};

// Fonctions pour les dettes avec historique
const addDebt = (debt) => {
const newDebt = {
id: Date.now(),
...debt,
paymentHistory: []
};
setDebts([...debts, newDebt]);
setShowDebtModal(false);
showNotification('Dette ajoutée');
};

const updateDebt = (id, payment) => {
setDebts(debts.map(debt => {
if (debt.id === id) {
const newHistory = [...(debt.paymentHistory || []), {
id: Date.now(),
amount: payment,
date: new Date().toISOString().split('T')[0],
balanceAfter: Math.max(0, debt.balance - payment)
}];
return { 
...debt, 
balance: Math.max(0, debt.balance - payment),
paymentHistory: newHistory
};
}
return debt;
}));
showNotification('Paiement enregistré');
};

const editDebt = (id) => {
const debt = debts.find(d => d.id === id);
if (debt) {
const newName = prompt('Nouveau nom:', debt.name);
const newBalance = prompt('Nouveau solde:', debt.balance);
if (newName && newBalance) {
setDebts(debts.map(d => 
d.id === id 
? { ...d, name: newName, balance: parseFloat(newBalance) }
: d
));
showNotification('Dette modifiée');
}
}
};

const deleteDebt = (id) => {
if (window.confirm('Supprimer cette dette ?')) {
setDebts(debts.filter(d => d.id !== id));
showNotification('Dette supprimée');
}
};

// Notifications
const showNotification = (message, type = 'success') => {
const id = Date.now();
setNotifications(prev => [...prev, { id, message, type }]);
setTimeout(() => {
setNotifications(prev => prev.filter(n => n.id !== id));
}, 3000);
};

// Export/Import
const exportData = () => {
const data = {
monthlyIncome,
categories,
expenses,
savingsGoals,
recurringExpenses,
debts,
currencies,
selectedCurrency,
language,
userName,
exportDate: new Date().toISOString()
};

const jsonString = JSON.stringify(data, null, 2);
const blob = new Blob(['\ufeff' + jsonString], {
type: 'application/json;charset=utf-8'
});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `finance-data-${new Date().toISOString().split('T')[0]}.json`;
a.click();
URL.revokeObjectURL(url);
showNotification('Données exportées');
};

const importData = (event) => {
const file = event.target.files[0];
if (!file) return;

const reader = new FileReader();
reader.onload = (e) => {
try {
const data = JSON.parse(e.target.result);
if (data.monthlyIncome) setMonthlyIncome(data.monthlyIncome);
if (data.categories) setCategories(data.categories);
if (data.expenses) setExpenses(data.expenses);
if (data.savingsGoals) setSavingsGoals(data.savingsGoals);
if (data.recurringExpenses) setRecurringExpenses(data.recurringExpenses);
if (data.debts) setDebts(data.debts);
if (data.currencies) setCurrencies(data.currencies);
if (data.selectedCurrency) setSelectedCurrency(data.selectedCurrency);
if (data.language) setLanguage(data.language);
if (data.userName) setUserName(data.userName);
showNotification('Données importées avec succès');
} catch (error) {
showNotification('Erreur lors de l\'import', 'error');
}
};
reader.readAsText(file, 'UTF-8');
};

// Générer un rapport amélioré avec couleurs
const generateReport = (type) => {
const report = type === 'monthly' ? generateMonthlyReport() : generateAnnualReport();
const blob = new Blob([report], { type: 'text/html;charset=utf-8' });
const url = URL.createObjectURL(blob);
window.open(url, '_blank');
showNotification(`Rapport ${type === 'monthly' ? 'mensuel' : 'annuel'} généré`);
};

const generateMonthlyReport = () => {
const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth));
const monthName = new Date(selectedMonth).toLocaleDateString(
language === 'ar' ? 'ar-SA' :
language === 'en' ? 'en-US' :
language === 'es' ? 'es-ES' :
language === 'de' ? 'de-DE' : 'fr-FR',
{ month: 'long', year: 'numeric' }
);

const currencySymbol = getCurrentCurrency().symbol;

const html = `
<!DOCTYPE html>
<html lang="${language}" ${language === 'ar' ? 'dir="rtl"' : ''}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${t('monthlyReport')} - ${selectedMonth}</title>
<style>
body {
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
margin: 0;
padding: 40px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
direction: ${language === 'ar' ? 'rtl' : 'ltr'};
}
.container {
background: white;
border-radius: 12px;
padding: 40px;
box-shadow: 0 20px 40px rgba(0,0,0,0.1);
max-width: 1000px;
margin: 0 auto;
}
h1 { 
color: #2563eb; 
margin-bottom: 30px;
font-size: 2.5em;
text-align: center;
border-bottom: 3px solid #2563eb;
padding-bottom: 20px;
}
h2 { 
color: #1e40af; 
margin-top: 40px;
margin-bottom: 20px;
font-size: 1.8em;
}
.summary-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 20px;
margin: 30px 0;
}
.summary-card {
background: linear-gradient(135deg, #3b82f6, #1d4ed8);
color: white;
padding: 25px;
border-radius: 10px;
text-align: center;
box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}
.summary-card h3 {
margin: 0 0 10px 0;
font-size: 1.1em;
opacity: 0.9;
}
.summary-card .value {
font-size: 2.2em;
font-weight: bold;
margin: 0;
}
table { 
width: 100%; 
border-collapse: collapse; 
margin: 20px 0;
background: white;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}
th, td { 
border: none;
padding: 15px; 
text-align: ${language === 'ar' ? 'right' : 'left'}; 
}
th { 
background: linear-gradient(135deg, #f8fafc, #e2e8f0);
font-weight: 600;
color: #374151;
text-transform: uppercase;
letter-spacing: 0.5px;
font-size: 0.9em;
}
tr:nth-child(even) { background-color: #f8fafc; }
tr:hover { background-color: #e0f2fe; }
.positive { color: #059669; font-weight: 600; }
.negative { color: #dc2626; font-weight: 600; }
.category-color {
width: 20px;
height: 20px;
border-radius: 50%;
display: inline-block;
margin-right: 10px;
vertical-align: middle;
}
.chart-container {
background: #f8fafc;
padding: 20px;
border-radius: 8px;
margin: 20px 0;
text-align: center;
}
</style>
</head>
<body>
<div class="container">
<h1>📊 ${t('financialReports')} - ${monthName}</h1>
${userName ? `<p style="text-align: center; font-size: 1.2em; color: #6b7280; margin-bottom: 30px;">Rapport de ${userName}</p>` : ''}

<div class="summary-grid">
<div class="summary-card">
<h3>${t('revenue')}</h3>
<p class="value">${monthlyIncome}${currencySymbol}</p>
</div>
<div class="summary-card" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
<h3>Dépenses totales</h3>
<p class="value">${totalSpent.toFixed(2)}${currencySymbol}</p>
</div>
<div class="summary-card" style="background: linear-gradient(135deg, #10b981, #059669);">
<h3>Économies</h3>
<p class="value">${(monthlyIncome - totalSpent).toFixed(2)}${currencySymbol}</p>
</div>
</div>

<h2>💰 Dépenses par catégorie</h2>
<table>
<tr>
<th>Catégorie</th>
<th>Budget</th>
<th>Dépensé</th>
<th>Restant</th>
<th>% Utilisé</th>
</tr>
${categories.map(cat => {
const spent = monthExpenses
.filter(e => e.category === cat.name)
.reduce((sum, e) => sum + e.amount, 0);
const remaining = cat.budget - spent;
const percentage = ((spent / cat.budget) * 100).toFixed(1);
return `
<tr>
<td>
<span class="category-color" style="background-color: ${cat.color}"></span>
${cat.name}
</td>
<td>${cat.budget}${currencySymbol}</td>
<td class="${spent > cat.budget ? 'negative' : ''}">${spent.toFixed(2)}${currencySymbol}</td>
<td class="${remaining < 0 ? 'negative' : 'positive'}">${remaining.toFixed(2)}${currencySymbol}</td>
<td>${percentage}%</td>
</tr>
`;
}).join('')}
</table>

<h2>📋 Détail des dépenses</h2>
<table>
<tr>
<th>Date</th>
<th>Description</th>
<th>Catégorie</th>
<th>Montant</th>
</tr>
${monthExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(e => `
<tr>
<td>${new Date(e.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'fr-FR')}</td>
<td>${e.description}</td>
<td>${e.category}</td>
<td class="negative">${e.amount.toFixed(2)}${currencySymbol}</td>
</tr>
`).join('')}
</table>

<div style="margin-top: 50px; text-align: center; color: #6b7280; font-style: italic;">
Rapport généré le ${new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'fr-FR')} - ${t('title')}
</div>
</div>
</body>
</html>
`;
return html;
};

const generateAnnualReport = () => {
const currencySymbol = getCurrentCurrency().symbol;
const totalAnnualRevenue = monthlyIncome * 12;
const totalAnnualExpenses = annualData.reduce((sum, month) => sum + month.expenses, 0);
const totalAnnualSavings = totalAnnualRevenue - totalAnnualExpenses;

const html = `
<!DOCTYPE html>
<html lang="${language}" ${language === 'ar' ? 'dir="rtl"' : ''}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${t('annualAnalysis')} - ${new Date().getFullYear()}</title>
<style>
body {
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
margin: 0;
padding: 40px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
direction: ${language === 'ar' ? 'rtl' : 'ltr'};
}
.container {
background: white;
border-radius: 12px;
padding: 40px;
box-shadow: 0 20px 40px rgba(0,0,0,0.1);
max-width: 1200px;
margin: 0 auto;
}
h1 { 
color: #2563eb; 
margin-bottom: 30px;
font-size: 2.5em;
text-align: center;
border-bottom: 3px solid #2563eb;
padding-bottom: 20px;
}
h2 { 
color: #1e40af; 
margin-top: 40px;
margin-bottom: 20px;
font-size: 1.8em;
}
.annual-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 25px;
margin: 30px 0;
}
.annual-card {
background: linear-gradient(135deg, #8b5cf6, #7c3aed);
color: white;
padding: 30px;
border-radius: 12px;
text-align: center;
box-shadow: 0 15px 30px rgba(139, 92, 246, 0.3);
}
.annual-card h3 {
margin: 0 0 15px 0;
font-size: 1.2em;
opacity: 0.9;
}
.annual-card .value {
font-size: 2.5em;
font-weight: bold;
margin: 0;
}
table { 
width: 100%; 
border-collapse: collapse; 
margin: 25px 0;
background: white;
border-radius: 10px;
overflow: hidden;
box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}
th, td { 
border: none;
padding: 18px; 
text-align: ${language === 'ar' ? 'right' : 'left'}; 
}
th { 
background: linear-gradient(135deg, #1f2937, #111827);
color: white;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.5px;
font-size: 0.9em;
}
tr:nth-child(even) { background-color: #f8fafc; }
tr:hover { background-color: #e0f2fe; }
.positive { color: #059669; font-weight: 700; }
.negative { color: #dc2626; font-weight: 700; }
.neutral { color: #6b7280; font-weight: 600; }
.trend-up { color: #10b981; }
.trend-down { color: #ef4444; }
.insights {
background: linear-gradient(135deg, #fef3c7, #fbbf24);
padding: 25px;
border-radius: 10px;
margin: 30px 0;
border-left: 5px solid #f59e0b;
}
.insights h3 {
color: #92400e;
margin-top: 0;
}
</style>
</head>
<body>
<div class="container">
<h1>📈 ${t('annualAnalysis')} - ${new Date().getFullYear()}</h1>
${userName ? `<p style="text-align: center; font-size: 1.2em; color: #6b7280; margin-bottom: 30px;">Analyse de ${userName}</p>` : ''}

<div class="annual-grid">
<div class="annual-card">
<h3>Revenus Annuels</h3>
<p class="value">${totalAnnualRevenue.toFixed(0)}${currencySymbol}</p>
</div>
<div class="annual-card" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
<h3>Dépenses Annuelles</h3>
<p class="value">${totalAnnualExpenses.toFixed(0)}${currencySymbol}</p>
</div>
<div class="annual-card" style="background: linear-gradient(135deg, #10b981, #059669);">
<h3>Épargne Annuelle</h3>
<p class="value">${totalAnnualSavings.toFixed(0)}${currencySymbol}</p>
</div>
</div>

<div class="insights">
<h3>💡 Insights Financiers</h3>
<ul>
<li><strong>Taux d'épargne:</strong> ${((totalAnnualSavings / totalAnnualRevenue) * 100).toFixed(1)}% de vos revenus</li>
<li><strong>Dépense moyenne mensuelle:</strong> ${(totalAnnualExpenses / 12).toFixed(0)}${currencySymbol}</li>
<li><strong>Épargne mensuelle moyenne:</strong> ${(totalAnnualSavings / 12).toFixed(0)}${currencySymbol}</li>
</ul>
</div>

<h2>📊 Évolution Mensuelle</h2>
<table>
<tr>
<th>Mois</th>
<th>Revenus</th>
<th>Dépenses</th>
<th>Épargne</th>
<th>Taux d'épargne</th>
</tr>
${annualData.map(month => {
const savingsRate = ((month.savings / month.revenue) * 100).toFixed(1);
return `
<tr>
<td><strong>${month.month}</strong></td>
<td class="positive">${month.revenue}${currencySymbol}</td>
<td class="negative">${month.expenses.toFixed(0)}${currencySymbol}</td>
<td class="${month.savings > 0 ? 'positive' : 'negative'}">${month.savings.toFixed(0)}${currencySymbol}</td>
<td class="${month.savings > 0 ? 'positive' : 'negative'}">${savingsRate}%</td>
</tr>
`;
}).join('')}
</table>

<h2>🎯 Projections et Tendances</h2>
<div style="background: #f0f9ff; padding: 25px; border-radius: 10px; border-left: 5px solid #0ea5e9;">
<h3 style="color: #0c4a6e; margin-top: 0;">Projections pour l'année prochaine</h3>
<p><strong>Si les tendances continuent:</strong></p>
<ul>
<li>Épargne projetée: <span class="positive">${(totalAnnualSavings * 1.05).toFixed(0)}${currencySymbol}</span> (+5%)</li>
<li>Objectifs d'épargne atteignables: <span class="positive">${Math.floor(totalAnnualSavings / 1000)} objectifs de 1000${currencySymbol}</span></li>
<li>Recommandation: ${totalAnnualSavings > monthlyIncome * 3 ? 'Excellent! Continuez sur cette voie.' : 'Essayez de réduire les dépenses non essentielles.'}</li>
</ul>
</div>

<div style="margin-top: 50px; text-align: center; color: #6b7280; font-style: italic;">
Rapport généré le ${new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'fr-FR')} - ${t('title')}
</div>
</div>
</body>
</html>
`;
return html;
};

// Styles responsives améliorés avec meilleur contraste
const theme = {
bg: darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100',
card: darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900 shadow-lg',
text: darkMode ? 'text-white' : 'text-gray-900',
textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
border: darkMode ? 'border-gray-700' : 'border-gray-200',
input: darkMode ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500',
button: {
primary: darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
secondary: darkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white',
success: darkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white',
danger: darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
}
};

// Tabs configuration
const tabs = [
{ id: 'dashboard', name: t('dashboard'), icon: Icons.Home },
{ id: 'budget', name: t('budget'), icon: Icons.Target },
{ id: 'expenses', name: t('expenses'), icon: Icons.CreditCard },
{ id: 'savings', name: t('savings'), icon: Icons.PiggyBank },
{ id: 'calendar', name: t('calendar'), icon: Icons.Calendar },
{ id: 'recurring', name: t('recurring'), icon: Icons.RefreshCw },
{ id: 'debts', name: t('debts'), icon: Icons.AlertCircle },
{ id: 'reports', name: t('reports'), icon: Icons.FileText }
];

return (
<div className={`min-h-screen ${theme.bg}`}>
{/* Notifications */}
<div className="fixed top-4 right-4 z-50 space-y-2">
{notifications.map(notif => (
<div
key={notif.id}
className={`px-4 py-2 rounded-lg shadow-lg text-white flex items-center ${
notif.type === 'error' ? 'bg-red-500' : 'bg-green-500'
}`}
>
<Icons.CheckCircle className="h-5 w-5 mr-2" />
{notif.message}
</div>
))}
</div>

{/* Header - Responsive amélioré */}
<header className={`${theme.card} shadow-lg border-b ${theme.border}`}>
<div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4">
<div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
<div className="flex flex-col items-center sm:items-start">
<h1 className={`text-lg sm:text-2xl font-bold ${theme.text} flex items-center`}>
<Icons.TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 mr-2" />
<span className="hidden sm:inline">{t('title')}</span>
<span className="sm:hidden">Finance Pro</span>
</h1>
{userName && (
<p className={`text-sm ${theme.textSecondary} mt-1`}>
Bonjour, {userName} !
</p>
)}
</div>
<div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
{/* User Name Input */}
<input
type="text"
value={userName}
onChange={(e) => setUserName(e.target.value)}
placeholder={t('userName')}
className={`px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-xs sm:text-sm ${theme.input} w-24 sm:w-32`}
/>

{/* Language Selector */}
<select
value={language}
onChange={(e) => setLanguage(e.target.value)}
className={`px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-xs sm:text-sm ${theme.input}`}
>
<option value="fr">🇫🇷 Français</option>
<option value="en">🇺🇸 English</option>
<option value="es">🇪🇸 Español</option>
<option value="de">🇩🇪 Deutsch</option>
<option value="ar">🇸🇦 العربية</option>
</select>

{/* Currency Selector */}
<select
value={selectedCurrency}
onChange={(e) => setSelectedCurrency(e.target.value)}
className={`px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-xs sm:text-sm ${theme.input}`}
>
{currencies.map(currency => (
<option key={currency.code} value={currency.code}>
{currency.symbol} {currency.code}
</option>
))}
</select>

<button
onClick={() => setShowCurrencyModal(true)}
className="px-2 py-1 sm:px-3 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs sm:text-sm"
>
<Icons.Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
<span className="hidden sm:inline">{t('currency')}</span>
</button>

<button
onClick={() => setShowIncomeModal(true)}
className="flex items-center px-2 py-1 sm:px-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-sm"
>
<Icons.Edit2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
<span className="hidden sm:inline">{t('income')}: </span>
{showBalances ? `${monthlyIncome}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</button>

<button onClick={() => setDarkMode(!darkMode)} className="p-1 sm:p-2">
{darkMode ? <Icons.Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Icons.Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
</button>

<button onClick={() => setShowBalances(!showBalances)} className="flex items-center p-1 sm:p-2">
{showBalances ? <Icons.EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Icons.Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
</button>
</div>
</div>
</div>
</header>

{/* Navigation - Mobile responsive */}
<nav className={`${theme.card} shadow-sm`}>
<div className="max-w-7xl mx-auto px-2 sm:px-4">
<div className="flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-hide">
{tabs.map(tab => {
const Icon = tab.icon;
return (
<button
key={tab.id}
onClick={() => setActiveTab(tab.id)}
className={`flex flex-col sm:flex-row items-center px-2 sm:px-3 py-2 sm:py-4 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap min-w-max transition-colors ${
activeTab === tab.id
? 'border-blue-500 text-blue-600'
: `border-transparent ${theme.textSecondary} hover:text-blue-500`
}`}
>
<Icon className="h-4 w-4 sm:h-4 sm:w-4 sm:mr-2 mb-1 sm:mb-0" />
<span className="text-xs sm:text-sm">{tab.name}</span>
</button>
);
})}
</div>
</div>
</nav>

{/* Main Content */}
<main className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
{/* Dashboard Tab */}
{activeTab === 'dashboard' && (
<div className="space-y-4 sm:space-y-6">
{/* Month and Year Selectors - Mobile friendly */}
<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
<div className="flex items-center space-x-2">
<label className={`text-sm font-medium ${theme.text}`}>{t('year')}:</label>
<select
value={selectedYear}
onChange={(e) => {
const newYear = e.target.value;
setSelectedYear(parseInt(newYear));
setSelectedMonth(`${newYear}-${selectedMonth.split('-')[1]}`);
}}
className={`px-3 py-2 border rounded-lg text-base ${theme.input}`}
>
{availableYears.map(year => (
<option key={year} value={year}>{year}</option>
))}
</select>
</div>
<div className="flex items-center space-x-2">
<label className={`text-sm font-medium ${theme.text}`}>{t('month')}:</label>
<input
type="month"
value={selectedMonth}
onChange={(e) => setSelectedMonth(e.target.value)}
className={`px-3 py-2 border rounded-lg text-base ${theme.input}`}
/>
</div>
</div>

{/* Stats Cards - Mobile responsive grid */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
<div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 sm:p-6 text-white shadow-lg">
<Icons.TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 mb-2" />
<p className="text-xs sm:text-sm text-blue-100">{t('revenue')}</p>
<p className="text-lg sm:text-2xl font-bold">{showBalances ? `${monthlyIncome}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}</p>
</div>
<div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 sm:p-6 text-white shadow-lg">
<Icons.Wallet className="h-6 w-6 sm:h-8 sm:w-8 mb-2" />
<p className="text-xs sm:text-sm text-green-100">{t('economy')}</p>
<p className="text-lg sm:text-2xl font-bold">{showBalances ? `${(monthlyIncome - totalSpent).toFixed(0)}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}</p>
</div>
<div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-3 sm:p-6 text-white shadow-lg">
<Icons.TrendingDown className="h-6 w-6 sm:h-8 sm:w-8 mb-2" />
<p className="text-xs sm:text-sm text-purple-100">{t('expenses')}</p>
<p className="text-lg sm:text-2xl font-bold">{showBalances ? `${totalSpent.toFixed(0)}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}</p>
</div>
<div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-3 sm:p-6 text-white shadow-lg">
<Icons.PiggyBank className="h-6 w-6 sm:h-8 sm:w-8 mb-2" />
<p className="text-xs sm:text-sm text-yellow-100">{t('totalSavings')}</p>
<p className="text-lg sm:text-2xl font-bold">{showBalances ? `${totalSavings}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}</p>
</div>
</div>

{/* Charts - Mobile responsive avec espacement amélioré */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-6 ${theme.text}`}>{t('expenseDistribution')}</h3>
<div className="h-64 sm:h-80">
<ResponsiveContainer width="100%" height="100%">
<PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
<Pie
data={pieChartData}
cx="50%"
cy="50%"
labelLine={false}
label={(entry) => `${entry.name}: ${entry.value.toFixed(0)}${getCurrentCurrency().symbol}`}
outerRadius="70%"
fill="#8884d8"
dataKey="value"
>
{pieChartData.map((entry, index) => (
<Cell key={`cell-${index}`} fill={entry.color} />
))}
</Pie>
<Tooltip formatter={(value) => `${value.toFixed(2)}${getCurrentCurrency().symbol}`} />
</PieChart>
</ResponsiveContainer>
</div>
</div>

<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-6 ${theme.text}`}>{t('expenseEvolution')}</h3>
<div className="h-64 sm:h-80">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={spendingTrend} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
<CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
<XAxis 
dataKey="month" 
tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
/>
<YAxis 
tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
/>
<Tooltip 
contentStyle={{
backgroundColor: darkMode ? '#1f2937' : '#ffffff',
border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
borderRadius: '8px',
color: darkMode ? '#ffffff' : '#000000'
}}
formatter={(value) => [`${value.toFixed(2)}${getCurrentCurrency().symbol}`, 'Montant']}
/>
<Line 
type="monotone" 
dataKey="amount" 
stroke="#3B82F6" 
strokeWidth={3}
dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
/>
</LineChart>
</ResponsiveContainer>
</div>
</div>
</div>

{/* Budget Overview - Mobile responsive */}
<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('budgetOverview')}</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{categories.map(cat => {
const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth) && e.category === cat.name);
const spent = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
const percentage = (spent / cat.budget) * 100;
const isOver = percentage > 100;

return (
<div key={cat.id} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg border ${theme.border}`}>
<div className="flex justify-between mb-2">
<span className={`font-medium text-sm sm:text-base ${theme.text}`}>{cat.name}</span>
<span className={`text-xs sm:text-sm ${theme.textSecondary}`}>
{showBalances ? `${spent.toFixed(0)}${getCurrentCurrency().symbol} / ${cat.budget}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol} / •••${getCurrentCurrency().symbol}`}
</span>
</div>
<div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2 mb-1`}>
<div
className="h-2 rounded-full transition-all"
style={{
width: `${Math.min(percentage, 100)}%`,
backgroundColor: isOver ? '#EF4444' : cat.color
}}
/>
</div>
<div className="flex justify-between text-xs">
<span className={theme.textSecondary}>{percentage.toFixed(0)}%</span>
<span className={isOver ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
{showBalances ? `${(cat.budget - spent).toFixed(0)}${getCurrentCurrency().symbol} ${t('remaining')}` : `•••${getCurrentCurrency().symbol} ${t('remaining')}`}
</span>
</div>
</div>
);
})}
</div>
</div>
</div>
)}

{/* Budget Tab */}
{activeTab === 'budget' && (
<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-2 sm:space-y-0">
<h2 className={`text-xl font-bold ${theme.text}`}>{t('budget')} {t('dashboard').toLowerCase()}</h2>
<button
onClick={() => setShowCategoryForm(!showCategoryForm)}
className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm sm:text-base ${theme.button.primary}`}
>
<Icons.PlusCircle className="inline h-4 w-4 mr-2" />
{t('newCategory')}
</button>
</div>

{showCategoryForm && (
<div className={`mb-6 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg border ${theme.border}`}>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
<input
type="text"
placeholder={t('category')}
value={newCategory.name}
onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
className={`px-3 py-2 border rounded-lg text-base ${theme.input}`}
/>
<input
type="number"
placeholder={t('monthlyBudget')}
value={newCategory.budget}
onChange={(e) => setNewCategory({...newCategory, budget: e.target.value})}
className={`px-3 py-2 border rounded-lg text-base ${theme.input}`}
/>
<div className="flex gap-2">
<button
onClick={addCategory}
className={`flex-1 px-4 py-2 rounded-lg text-sm sm:text-base ${theme.button.success}`}
>
{t('add')}
</button>
<button
onClick={() => setShowCategoryForm(false)}
className={`flex-1 px-4 py-2 rounded-lg text-sm sm:text-base ${theme.button.secondary}`}
>
{t('cancel')}
</button>
</div>
</div>
</div>
)}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
<div>
<div className="h-64 sm:h-96">
<ResponsiveContainer width="100%" height="100%">
<BarChart data={monthlyData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
<CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
<XAxis 
dataKey="name" 
tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
/>
<YAxis 
tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
/>
<Tooltip 
contentStyle={{
backgroundColor: darkMode ? '#1f2937' : '#ffffff',
border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
borderRadius: '8px',
color: darkMode ? '#ffffff' : '#000000'
}}
formatter={(value) => `${value.toFixed(2)}${getCurrentCurrency().symbol}`}
/>
<Bar dataKey="budget" fill="#3B82F6" name={t('budget')} />
<Bar dataKey="spent" fill="#10B981" name="Dépensé" />
</BarChart>
</ResponsiveContainer>
</div>
</div>
<div className="space-y-4">
<div className={`${darkMode ? 'bg-blue-900' : 'bg-blue-50'} p-4 rounded-lg border ${theme.border}`}>
<h4 className={`font-semibold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Résumé mensuel</h4>
<div className="mt-2 space-y-2 text-sm sm:text-base">
<div className="flex justify-between">
<span className={darkMode ? 'text-blue-200' : 'text-blue-800'}>{t('revenue')}:</span>
<span className={`font-semibold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>{showBalances ? `${monthlyIncome}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}</span>
</div>
<div className="flex justify-between">
<span className={darkMode ? 'text-blue-200' : 'text-blue-800'}>{t('budget')} total:</span>
<span className={`font-semibold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>{showBalances ? `${totalBudget}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}</span>
</div>
<div className="flex justify-between">
<span className={darkMode ? 'text-blue-200' : 'text-blue-800'}>{t('expenses')}:</span>
<span className="font-semibold text-red-600 dark:text-red-400">{showBalances ? `${totalSpent.toFixed(0)}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}</span>
</div>
<div className={`flex justify-between pt-2 border-t ${darkMode ? 'border-blue-700' : 'border-blue-200'}`}>
<span className={darkMode ? 'text-blue-200' : 'text-blue-800'}>Restant:</span>
<span className="font-bold text-green-600 dark:text-green-400">
{showBalances ? `${(monthlyIncome - totalSpent).toFixed(0)}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</span>
</div>
</div>
</div>

<div className="space-y-2">
{categories.map(cat => (
<div key={cat.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg border ${theme.border}`}>
<div className="flex items-center">
<div className="w-4 h-4 rounded-full mr-3" style={{backgroundColor: cat.color}}></div>
<span className={`text-sm sm:text-base ${theme.text}`}>{cat.name}</span>
</div>
<div className="flex items-center space-x-2">
<button
onClick={() => editCategory(cat.id)}
className="text-blue-500 hover:text-blue-700 p-1"
title="Modifier"
>
<Icons.Edit2 className="h-4 w-4" />
</button>
<button
onClick={() => deleteCategory(cat.id)}
className="text-red-500 hover:text-red-700 p-1"
title="Supprimer"
>
<Icons.Trash2 className="h-4 w-4" />
</button>
</div>
</div>
))}
</div>
</div>
</div>
</div>
)}

{/* Expenses Tab */}
{activeTab === 'expenses' && (
<div className="space-y-4 sm:space-y-6">
<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('addExpense')}</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<input
type="date"
value={newExpense.date}
onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
className={`px-3 py-2 border rounded-lg text-base ${theme.input}`}
/>
<select
value={newExpense.category}
onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
className={`px-3 py-2 border rounded-lg text-base ${theme.input}`}
>
<option value="">{t('category')}</option>
{categories.map(cat => (
<option key={cat.id} value={cat.name}>{cat.name}</option>
))}
</select>
<input
type="number"
step="0.01"
placeholder={t('amount')}
value={newExpense.amount}
onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
className={`px-3 py-2 border rounded-lg text-base ${theme.input}`}
/>
<input
type="text"
placeholder={t('description')}
value={newExpense.description}
onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
className={`px-3 py-2 border rounded-lg text-base ${theme.input}`}
/>
</div>
<button
onClick={addExpense}
className={`mt-4 w-full sm:w-auto px-4 py-2 rounded-lg ${theme.button.primary}`}
>
<Icons.PlusCircle className="inline h-4 w-4 mr-2" />
{t('add')}
</button>
</div>

<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('expenseHistory')}</h3>
<div className="space-y-3">
{expenses
.filter(e => e.date.startsWith(selectedMonth))
.sort((a, b) => new Date(b.date) - new Date(a.date))
.map(expense => (
<div key={expense.id} className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b ${theme.border} space-y-2 sm:space-y-0`}>
<div className="flex-1">
<p className={`font-medium text-sm sm:text-base ${theme.text}`}>{expense.description}</p>
<p className={`text-xs sm:text-sm ${theme.textSecondary}`}>{expense.category} • {expense.date}</p>
</div>
<div className="flex items-center space-x-2">
<span className="font-semibold text-red-600 dark:text-red-400 text-sm sm:text-base">
{showBalances ? `-${expense.amount}${getCurrentCurrency().symbol}` : `-•••${getCurrentCurrency().symbol}`}
</span>
<button 
onClick={() => editExpense(expense.id)} 
className="text-blue-500 hover:text-blue-700 p-1"
title="Modifier"
>
<Icons.Edit2 className="h-4 w-4" />
</button>
<button 
onClick={() => deleteExpense(expense.id)} 
className="text-red-500 hover:text-red-700 p-1"
title="Supprimer"
>
<Icons.Trash2 className="h-4 w-4" />
</button>
</div>
</div>
))}
{expenses.filter(e => e.date.startsWith(selectedMonth)).length === 0 && (
<p className={`text-center ${theme.textSecondary} py-8`}>{t('noExpenses')}</p>
)}
</div>
</div>
</div>
)}

{/* Savings Tab */}
{activeTab === 'savings' && (
<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-2 sm:space-y-0">
<h2 className={`text-xl font-bold ${theme.text}`}>{t('savings')}</h2>
<button
onClick={() => setShowSavingsModal(true)}
className={`w-full sm:w-auto px-4 py-2 rounded-lg ${theme.button.primary}`}
>
<Icons.PlusCircle className="inline h-4 w-4 mr-2" />
{t('newSavingsGoal')}
</button>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
{savingsGoals.map(goal => {
const percentage = (goal.current / goal.target) * 100;
return (
<div key={goal.id} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<div className="flex justify-between items-start mb-4">
<h3 className={`font-semibold text-base sm:text-lg ${theme.text}`}>{goal.name}</h3>
<div className="flex items-center space-x-2">
<button
onClick={() => editSavingsGoal(goal.id)}
className="text-blue-500 hover:text-blue-700 p-1"
title="Modifier"
>
<Icons.Edit2 className="h-4 w-4" />
</button>
<button
onClick={() => deleteSavingsGoal(goal.id)}
className="text-red-500 hover:text-red-700 p-1"
title="Supprimer"
>
<Icons.Trash2 className="h-4 w-4" />
</button>
</div>
</div>
<div className="mb-4">
<div className="flex justify-between text-xs sm:text-sm mb-1">
<span className={theme.textSecondary}>{showBalances ? `${goal.current}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}</span>
<span className={theme.textSecondary}>{showBalances ? `${goal.target}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}</span>
</div>
<div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-3`}>
<div
className="h-3 rounded-full transition-all"
style={{
width: `${percentage}%`,
backgroundColor: goal.color
}}
/>
</div>
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-1 space-y-1 sm:space-y-0">
<p className={`text-xs sm:text-sm ${theme.textSecondary}`}>{percentage.toFixed(0)}% {t('reached')}</p>
<p className={`text-xs sm:text-sm ${theme.textSecondary}`}>{t('deadline')}: {new Date(goal.deadline).toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'fr-FR')}</p>
</div>
</div>
<div className="flex gap-2">
<button
onClick={() => {
const amount = parseFloat(prompt('Montant à ajouter:'));
if (amount) updateSavingsGoal(goal.id, amount);
}}
className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm ${theme.button.success}`}
>
{t('add')}
</button>
<button
onClick={() => {
const amount = parseFloat(prompt('Montant à retirer:'));
if (amount) updateSavingsGoal(goal.id, -amount);
}}
className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm ${theme.button.danger}`}
>
Retirer
</button>
</div>
</div>
);
})}
</div>
</div>
)}

{/* Calendar Tab */}
{activeTab === 'calendar' && (
<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-2 sm:space-y-0">
<h2 className={`text-xl font-bold ${theme.text}`}>{t('calendar')} financier</h2>
<input
type="month"
value={selectedMonth}
onChange={(e) => setSelectedMonth(e.target.value)}
className={`px-3 py-2 border rounded-lg text-base ${theme.input}`}
/>
</div>
<div className="grid grid-cols-7 gap-1 sm:gap-2">
{['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
<div key={day} className={`text-center font-semibold text-xs sm:text-sm py-2 ${theme.text}`}>
{day}
</div>
))}
{calendarDays.map((day, index) => (
<div
key={index}
className={`min-h-[60px] sm:min-h-[80px] border rounded-lg p-1 sm:p-2 ${
day ? `hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'}` : ''
} ${theme.border}`}
>
{day && (
<div>
<p className={`text-xs sm:text-sm font-semibold ${theme.text}`}>{day}</p>
{recurringExpenses.filter(e => e.day === day && e.active).map(expense => (
<div key={expense.id} className="mt-1">
<p className="text-xs text-red-600 dark:text-red-400 truncate">-{expense.amount}{getCurrentCurrency().symbol}</p>
<p className={`text-xs ${theme.textSecondary} truncate`}>{expense.name}</p>
</div>
))}
{expenses.filter(e => {
const expenseDay = new Date(e.date).getDate();
const expenseMonth = e.date.slice(0, 7);
return expenseDay === day && expenseMonth === selectedMonth;
}).map(expense => (
<div key={expense.id} className="mt-1">
<p className="text-xs text-orange-600 dark:text-orange-400 truncate">-{expense.amount}{getCurrentCurrency().symbol}</p>
<p className={`text-xs ${theme.textSecondary} truncate`}>{expense.description}</p>
</div>
))}
</div>
)}
</div>
))}
</div>
</div>
)}

{/* Recurring Tab - Design amélioré */}
{activeTab === 'recurring' && (
<div className="space-y-6">
{/* Header avec design moderne */}
<div className={`${theme.card} rounded-xl p-6 border ${theme.border} shadow-xl bg-gradient-to-r ${darkMode ? 'from-gray-800 to-gray-700' : 'from-white to-gray-50'}`}>
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
<div>
<h2 className={`text-2xl font-bold ${theme.text} flex items-center`}>
<Icons.RefreshCw className="h-7 w-7 mr-3 text-blue-600" />
Dépenses {t('recurring').toLowerCase()}
</h2>
<p className={`text-sm ${theme.textSecondary} mt-2`}>
Gérez vos paiements automatiques et abonnements récurrents
</p>
</div>
<button
onClick={() => setShowRecurringModal(true)}
className={`w-full sm:w-auto px-6 py-3 rounded-xl transition-all transform hover:scale-105 ${theme.button.primary} shadow-lg flex items-center justify-center`}
>
<Icons.PlusCircle className="h-5 w-5 mr-2" />
{t('add')}
</button>
</div>
</div>

{/* Stats récurrents */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
<div className={`${darkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-50 to-blue-100'} p-6 rounded-xl border ${theme.border} shadow-lg`}>
<div className="flex items-center justify-between">
<div>
<p className={`text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>Total mensuel actif</p>
<p className={`text-2xl font-bold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
{showBalances ? `${totalRecurring}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</p>
</div>
<Icons.DollarSign className={`h-8 w-8 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
</div>
</div>

<div className={`${darkMode ? 'bg-gradient-to-br from-green-900 to-green-800' : 'bg-gradient-to-br from-green-50 to-green-100'} p-6 rounded-xl border ${theme.border} shadow-lg`}>
<div className="flex items-center justify-between">
<div>
<p className={`text-sm font-medium ${darkMode ? 'text-green-200' : 'text-green-800'}`}>Abonnements actifs</p>
<p className={`text-2xl font-bold ${darkMode ? 'text-green-100' : 'text-green-900'}`}>
{recurringExpenses.filter(e => e.active).length}
</p>
</div>
<Icons.Check className={`h-8 w-8 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
</div>
</div>

<div className={`${darkMode ? 'bg-gradient-to-br from-orange-900 to-orange-800' : 'bg-gradient-to-br from-orange-50 to-orange-100'} p-6 rounded-xl border ${theme.border} shadow-lg`}>
<div className="flex items-center justify-between">
<div>
<p className={`text-sm font-medium ${darkMode ? 'text-orange-200' : 'text-orange-800'}`}>Abonnements inactifs</p>
<p className={`text-2xl font-bold ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>
{recurringExpenses.filter(e => !e.active).length}
</p>
</div>
<Icons.Pause className={`h-8 w-8 ${darkMode ? 'text-orange-300' : 'text-orange-600'}`} />
</div>
</div>
</div>

{/* Liste des dépenses récurrentes avec design moderne */}
<div className={`${theme.card} rounded-xl p-6 border ${theme.border} shadow-xl`}>
<h3 className={`text-lg font-semibold mb-6 ${theme.text} flex items-center`}>
<Icons.List className="h-5 w-5 mr-2" />
Vos abonnements et charges récurrentes
</h3>
<div className="space-y-4">
{recurringExpenses.map(expense => (
<div key={expense.id} className={`relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg ${
expense.active 
? `${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-green-500/30' : 'bg-gradient-to-r from-green-50 to-white border-green-200'} border-2` 
: `${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600' : 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-300'} border opacity-60`
}`}>
<div className="p-6">
<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
{/* Information principale */}
<div className="flex-1 min-w-0">
<div className="flex items-center space-x-3 mb-2">
<div className={`w-12 h-12 rounded-full flex items-center justify-center ${
expense.active 
? 'bg-green-100 dark:bg-green-900' 
: 'bg-gray-100 dark:bg-gray-700'
}`}>
{expense.category === 'Logement' && <Icons.Home className={`h-6 w-6 ${expense.active ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />}
{expense.category === 'Loisirs' && <Icons.Play className={`h-6 w-6 ${expense.active ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />}
{expense.category === 'Transport' && <Icons.Car className={`h-6 w-6 ${expense.active ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />}
{!['Logement', 'Loisirs', 'Transport'].includes(expense.category) && <Icons.CreditCard className={`h-6 w-6 ${expense.active ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />}
</div>
<div>
<h4 className={`font-bold text-lg ${theme.text}`}>{expense.name}</h4>
<p className={`text-sm ${theme.textSecondary}`}>
Catégorie: {expense.category} • Jour {expense.day} du mois
</p>
</div>
</div>

{/* Date de prélèvement */}
<div className="mt-3">
<label className={`text-xs font-medium ${theme.textSecondary} block mb-1`}>
<Icons.Calendar className="inline h-3 w-3 mr-1" />
Date de prélèvement
</label>
<input
type="text"
value={expense.deductionDate || ''}
onChange={(e) => updateRecurringExpenseDate(expense.id, e.target.value)}
placeholder="JJ/MM"
className={`text-sm px-3 py-2 border rounded-lg ${theme.input} w-32 transition-all focus:ring-2 focus:ring-blue-500/20`}
/>
</div>
</div>

{/* Montant et actions */}
<div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:min-w-max">
<div className="text-center sm:text-right">
<p className={`text-xs ${theme.textSecondary} mb-1`}>Montant mensuel</p>
<span className={`text-2xl font-bold ${expense.active ? 'text-red-600 dark:text-red-400' : 'text-gray-400'}`}>
{showBalances ? `-${expense.amount}${getCurrentCurrency().symbol}` : `-•••${getCurrentCurrency().symbol}`}
</span>
</div>

{/* Boutons d'action */}
<div className="flex items-center space-x-2">
<button
onClick={() => toggleRecurringExpense(expense.id)}
className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
expense.active 
? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-700' 
: 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
}`}
>
{expense.active ? (
<><Icons.Pause className="inline h-4 w-4 mr-1" />{t('active')}</>
) : (
<><Icons.Play className="inline h-4 w-4 mr-1" />{t('inactive')}</>
)}
</button>
<button
onClick={() => editRecurringExpense(expense.id)}
className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
title="Modifier"
>
<Icons.Edit2 className="h-4 w-4" />
</button>
<button
onClick={() => deleteRecurringExpense(expense.id)}
className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
title="Supprimer"
>
<Icons.Trash2 className="h-4 w-4" />
</button>
</div>
</div>
</div>

{/* Barre de statut */}
<div className={`absolute bottom-0 left-0 right-0 h-1 ${
expense.active 
? 'bg-gradient-to-r from-green-400 to-green-600' 
: 'bg-gradient-to-r from-gray-300 to-gray-400'
}`} />
</div>
</div>
))}

{recurringExpenses.length === 0 && (
<div className="text-center py-12">
<Icons.RefreshCw className={`h-16 w-16 mx-auto ${theme.textSecondary} mb-4`} />
<h3 className={`text-lg font-semibold ${theme.text} mb-2`}>Aucune dépense récurrente</h3>
<p className={`${theme.textSecondary} mb-4`}>Ajoutez vos abonnements et charges mensuelles pour un meilleur suivi</p>
<button
onClick={() => setShowRecurringModal(true)}
className={`px-6 py-3 rounded-lg ${theme.button.primary}`}
>
<Icons.Plus className="inline h-4 w-4 mr-2" />
Ajouter ma première dépense récurrente
</button>
</div>
)}
</div>
</div>
</div>
)}

{/* Debts Tab avec calcul mensuel amélioré */}
{activeTab === 'debts' && (
<div className="space-y-6">
{/* Header */}
<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
<div>
<h2 className={`text-xl sm:text-2xl font-bold ${theme.text} flex items-center`}>
<Icons.AlertCircle className="h-6 w-6 mr-2 text-red-500" />
Gestion des {t('debts').toLowerCase()}
</h2>
<p className={`text-sm ${theme.textSecondary} mt-1`}>
Suivez et gérez vos dettes avec intérêts calculés mensuellement
</p>
</div>
<button
onClick={() => setShowDebtModal(true)}
className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${theme.button.primary} shadow-lg`}
>
<Icons.PlusCircle className="inline h-4 w-4 mr-2" />
{t('newDebt')}
</button>
</div>

{/* Résumé global */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
<div className={`${darkMode ? 'bg-gradient-to-br from-red-900 to-red-800' : 'bg-gradient-to-br from-red-50 to-red-100'} p-4 rounded-lg border ${theme.border} shadow-lg`}>
<div className="flex items-center justify-between">
<div>
<p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-red-200' : 'text-red-800'}`}>Dette totale</p>
<p className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-red-100' : 'text-red-900'}`}>
{showBalances ? `${totalDebt.toLocaleString()}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</p>
</div>
<Icons.TrendingDown className={`h-8 w-8 ${darkMode ? 'text-red-300' : 'text-red-600'}`} />
</div>
</div>

<div className={`${darkMode ? 'bg-gradient-to-br from-orange-900 to-orange-800' : 'bg-gradient-to-br from-orange-50 to-orange-100'} p-4 rounded-lg border ${theme.border} shadow-lg`}>
<div className="flex items-center justify-between">
<div>
<p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-orange-200' : 'text-orange-800'}`}>Paiements mensuels</p>
<p className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>
{showBalances ? `${debts.reduce((sum, d) => sum + d.minPayment, 0).toLocaleString()}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</p>
</div>
<Icons.Calendar className={`h-8 w-8 ${darkMode ? 'text-orange-300' : 'text-orange-600'}`} />
</div>
</div>

<div className={`${darkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-50 to-blue-100'} p-4 rounded-lg border ${theme.border} shadow-lg`}>
<div className="flex items-center justify-between">
<div>
<p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>Nombre de dettes</p>
<p className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
{debts.length}
</p>
</div>
<Icons.FileText className={`h-8 w-8 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
</div>
</div>
</div>
</div>

{/* Liste des dettes */}
<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-6 ${theme.text} flex items-center`}>
<Icons.CreditCard className="h-5 w-5 mr-2" />
Détail de vos dettes
</h3>
<div className="space-y-6">
{debts.map(debt => {
// Calcul de la date de fin prévisionnelle avec intérêts mensuels
const calculatePayoffDate = (balance, minPayment, annualRate) => {
if (minPayment <= 0 || balance <= 0) return null;

const monthlyRate = annualRate / 100 / 12;
if (monthlyRate === 0) {
// Pas d'intérêt
const months = Math.ceil(balance / minPayment);
const payoffDate = new Date();
payoffDate.setMonth(payoffDate.getMonth() + months);
return { months, date: payoffDate, totalInterest: 0, totalPaid: balance };
}

// Avec intérêts calculés mensuellement
let remainingBalance = balance;
let months = 0;
let totalInterest = 0;

while (remainingBalance > 0.01 && months < 600) { // Limite de sécurité de 50 ans
const monthlyInterest = remainingBalance * monthlyRate;
const principalPayment = Math.min(minPayment - monthlyInterest, remainingBalance);

if (principalPayment <= 0) {
// Paiement insuffisant pour couvrir les intérêts
return null;
}

remainingBalance -= principalPayment;
totalInterest += monthlyInterest;
months++;
}

const payoffDate = new Date();
payoffDate.setMonth(payoffDate.getMonth() + months);
return { 
months, 
date: payoffDate, 
totalInterest, 
totalPaid: balance + totalInterest,
monthlyInterest: (balance * monthlyRate).toFixed(2)
};
};

const payoffInfo = calculatePayoffDate(debt.balance, debt.minPayment, debt.rate);
const progressPercentage = debt.paymentHistory ? 
((debt.paymentHistory.reduce((sum, p) => sum + p.amount, 0) / (debt.balance + debt.paymentHistory.reduce((sum, p) => sum + p.amount, 0))) * 100) : 0;

return (
<div key={debt.id} className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-50 to-white'} rounded-xl p-6 border ${theme.border} shadow-lg hover:shadow-xl transition-all`}>
{/* En-tête de la dette */}
<div className="flex flex-col sm:flex-row justify-between items-start mb-4 space-y-2 sm:space-y-0">
<div className="flex items-center space-x-3">
<div className={`w-12 h-12 rounded-full flex items-center justify-center ${
debt.type === 'credit_card' ? 'bg-red-100 dark:bg-red-900' :
debt.type === 'auto_loan' ? 'bg-blue-100 dark:bg-blue-900' :
'bg-purple-100 dark:bg-purple-900'
}`}>
{debt.type === 'credit_card' ? (
<Icons.CreditCard className="h-6 w-6 text-red-600 dark:text-red-400" />
) : debt.type === 'auto_loan' ? (
<Icons.Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
) : (
<Icons.Home className="h-6 w-6 text-purple-600 dark:text-purple-400" />
)}
</div>
<div>
<h4 className={`font-bold text-lg ${theme.text}`}>{debt.name}</h4>
<p className={`text-sm ${theme.textSecondary} capitalize`}>
{debt.type?.replace('_', ' ') || 'Dette générale'}
</p>
</div>
</div>
<div className="flex items-center space-x-2">
<button
onClick={() => editDebt(debt.id)}
className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
title="Modifier"
>
<Icons.Edit2 className="h-4 w-4" />
</button>
<button
onClick={() => deleteDebt(debt.id)}
className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
title="Supprimer"
>
<Icons.Trash2 className="h-4 w-4" />
</button>
</div>
</div>

{/* Informations principales */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
<div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-3`}>
<p className={`text-xs ${theme.textSecondary} mb-1`}>Solde actuel</p>
<p className={`font-bold text-lg text-red-600 dark:text-red-400`}>
{showBalances ? `${debt.balance.toLocaleString()}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</p>
</div>
<div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-3`}>
<p className={`text-xs ${theme.textSecondary} mb-1`}>Paiement minimum</p>
<p className={`font-semibold text-lg ${theme.text}`}>
{showBalances ? `${debt.minPayment}${getCurrentCurrency().symbol}` : `•••${getCurrentCurrency().symbol}`}
</p>
</div>
<div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-3`}>
<p className={`text-xs ${theme.textSecondary} mb-1`}>Taux annuel</p>
<p className={`font-semibold text-lg ${theme.text}`}>{debt.rate}%</p>
</div>
<div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-3`}>
<p className={`text-xs ${theme.textSecondary} mb-1`}>Intérêts mensuels</p>
<p className={`font-semibold text-lg text-orange-600 dark:text-orange-400`}>
{payoffInfo ? `${payoffInfo.monthlyInterest}${getCurrentCurrency().symbol}` : 'N/A'}
</p>
</div>
</div>

{/* Date de fin prévisionnelle */}
{payoffInfo && (
<div className={`${darkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-50 to-purple-50'} rounded-lg p-4 mb-4 border ${darkMode ? 'border-indigo-700' : 'border-indigo-200'}`}>
<div className="flex items-center justify-between">
<div>
<p className={`text-sm font-medium ${darkMode ? 'text-indigo-200' : 'text-indigo-800'} mb-1`}>
<Icons.Calendar className="inline h-4 w-4 mr-1" />
Remboursement avec paiements minimums
</p>
<p className={`text-lg font-bold ${darkMode ? 'text-indigo-100' : 'text-indigo-900'}`}>
{payoffInfo.date.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'fr-FR', {
year: 'numeric',
month: 'long'
})}
</p>
<p className={`text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
Dans {payoffInfo.months} mois • Total payé: {payoffInfo.totalPaid.toFixed(0)}${getCurrentCurrency().symbol} 
• Intérêts totaux: {payoffInfo.totalInterest.toFixed(0)}${getCurrentCurrency().symbol}
</p>
</div>
<Icons.Target className={`h-8 w-8 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
</div>
</div>
)}

{/* Actions */}
<div className="flex flex-col sm:flex-row gap-3 mb-4">
<button
onClick={() => {
const payment = parseFloat(prompt('Montant du paiement:'));
if (payment && payment > 0) updateDebt(debt.id, payment);
}}
className={`flex-1 px-4 py-3 rounded-lg transition-all transform hover:scale-105 ${theme.button.success} shadow-md`}
>
<Icons.CreditCard className="inline h-4 w-4 mr-2" />
{t('recordPayment')}
</button>
<button
onClick={() => {
const extraPayment = parseFloat(prompt('Montant du paiement supplémentaire:'));
if (extraPayment && extraPayment > 0) {
updateDebt(debt.id, extraPayment);
showNotification(`Paiement supplémentaire de ${extraPayment}${getCurrentCurrency().symbol} enregistré`);
}
}}
className={`flex-1 px-4 py-3 rounded-lg transition-all transform hover:scale-105 ${theme.button.primary} shadow-md`}
>
<Icons.Plus className="inline h-4 w-4 mr-2" />
Paiement extra
</button>
</div>

{/* Historique des paiements amélioré */}
{debt.paymentHistory && debt.paymentHistory.length > 0 && (
<div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
<div className="flex items-center justify-between mb-3">
<h5 className={`font-medium ${theme.text} flex items-center`}>
<Icons.History className="h-4 w-4 mr-2" />
{t('paymentHistory')}
</h5>
<span className={`text-xs ${theme.textSecondary}`}>
Total payé: {debt.paymentHistory.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}${getCurrentCurrency().symbol}
</span>
</div>
<div className="max-h-40 overflow-y-auto space-y-2">
{debt.paymentHistory.slice(-10).reverse().map((payment, index) => (
<div key={payment.id} className={`flex justify-between items-center p-3 ${darkMode ? 'bg-gray-600' : 'bg-white'} rounded-lg border ${theme.border} hover:shadow-md transition-shadow`}>
<div className="flex items-center space-x-3">
<div className="w-2 h-2 bg-green-500 rounded-full"></div>
<div>
<p className={`text-sm font-medium ${theme.text}`}>
{new Date(payment.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'fr-FR')}
</p>
<p className={`text-xs ${theme.textSecondary}`}>
Solde après: {payment.balanceAfter.toLocaleString()}${getCurrentCurrency().symbol}
</p>
</div>
</div>
<span className="font-bold text-green-600 dark:text-green-400">
-{payment.amount.toLocaleString()}${getCurrentCurrency().symbol}
</span>
</div>
))}
</div>
</div>
)}
</div>
);
})}
{debts.length === 0 && (
<div className="text-center py-12">
<Icons.PiggyBank className={`h-16 w-16 mx-auto ${theme.textSecondary} mb-4`} />
<h3 className={`text-lg font-semibold ${theme.text} mb-2`}>Aucune dette enregistrée</h3>
<p className={`${theme.textSecondary} mb-4`}>Commencez par ajouter vos dettes pour un meilleur suivi financier</p>
<button
onClick={() => setShowDebtModal(true)}
className={`px-6 py-3 rounded-lg ${theme.button.primary}`}
>
<Icons.Plus className="inline h-4 w-4 mr-2" />
Ajouter ma première dette
</button>
</div>
)}
</div>
</div>
</div>
)}

{/* Reports Tab */}
{activeTab === 'reports' && (
<div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<h2 className={`text-xl font-bold mb-6 ${theme.text}`}>{t('financialReports')}</h2>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<Icons.FileText className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 mb-4" />
<h3 className={`font-semibold mb-2 text-sm sm:text-base ${theme.text}`}>{t('monthlyReport')}</h3>
<p className={`text-xs sm:text-sm ${theme.textSecondary} mb-4`}>{t('detailedView')} {new Date(selectedMonth).toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'de' ? 'de-DE' : 'fr-FR', { month: 'long', year: 'numeric' })}</p>
<button
onClick={() => generateReport('monthly')}
className={`w-full px-4 py-2 rounded-lg text-xs sm:text-sm ${theme.button.primary}`}
>
{t('generateReport')}
</button>
</div>
<div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 sm:p-6 border ${theme.border}`}>
<Icons.TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-green-600 mb-4" />
<h3 className={`font-semibold mb-2 text-sm sm:text-base ${theme.text}`}>{t('annualAnalysis')}</h3>
<p className={`text-xs sm:text-sm ${theme.textSecondary} mb-4`}>Analyse complète sur 12 mois avec projections et tendances</p>
<button
onClick={() => generateReport('annual')}
className={`w-full px-4 py-2 rounded-lg text-xs sm:text-sm ${theme.button.success}`}
>
{t('viewAnalysis')}
</button>
</div>
</div>

{/* Preview de l'analyse annuelle avec espacement amélioré */}
<div className="mt-8">
<h3 className={`text-lg font-semibold mb-6 ${theme.text}`}>Aperçu de l'analyse annuelle</h3>
<div className="h-64 sm:h-80">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={annualData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
<CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
<XAxis 
dataKey="month" 
tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
/>
<YAxis 
tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
/>
<Tooltip 
contentStyle={{
backgroundColor: darkMode ? '#1f2937' : '#ffffff',
border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
borderRadius: '8px',
color: darkMode ? '#ffffff' : '#000000'
}}
formatter={(value) => `${value.toFixed(2)}${getCurrentCurrency().symbol}`}
/>
<Line 
type="monotone" 
dataKey="revenue" 
stroke="#3B82F6" 
strokeWidth={3} 
name="Revenus"
dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
/>
<Line 
type="monotone" 
dataKey="expenses" 
stroke="#EF4444" 
strokeWidth={3} 
name="Dépenses"
dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
/>
<Line 
type="monotone" 
dataKey="savings" 
stroke="#10B981" 
strokeWidth={3} 
name="Épargne"
dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
/>
</LineChart>
</ResponsiveContainer>
</div>
</div>
</div>
)}
</main>

{/* Modals */}
{/* Income Modal */}
{showIncomeModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className={`${theme.card} rounded-lg p-4 sm:p-6 w-full max-w-md border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('modifyMonthlyIncome')}</h3>
<input
type="number"
value={monthlyIncome}
onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
className={`w-full px-3 py-2 border rounded-lg mb-4 text-base ${theme.input}`}
placeholder={t('monthlyIncome')}
/>
<div className="flex gap-2">
<button
onClick={() => setShowIncomeModal(false)}
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.secondary}`}
>
{t('cancel')}
</button>
<button
onClick={() => {
setShowIncomeModal(false);
showNotification('Revenus mis à jour');
}}
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.primary}`}
>
{t('save')}
</button>
</div>
</div>
</div>
)}

{/* Currency Modal */}
{showCurrencyModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className={`${theme.card} rounded-lg p-4 sm:p-6 w-full max-w-md border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('addCurrency')}</h3>
<form onSubmit={(e) => {
e.preventDefault();
const formData = new FormData(e.target);
addCurrency({
code: formData.get('code'),
symbol: formData.get('symbol'),
name: formData.get('name')
});
}}>
<input
name="code"
type="text"
placeholder="Code (ex: USD)"
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
maxLength="3"
required
/>
<input
name="symbol"
type="text"
placeholder="Symbole (ex: $)"
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
maxLength="3"
required
/>
<input
name="name"
type="text"
placeholder="Nom (ex: Dollar américain)"
className={`w-full px-3 py-2 border rounded-lg mb-4 text-base ${theme.input}`}
required
/>
<div className="flex gap-2">
<button
type="button"
onClick={() => setShowCurrencyModal(false)}
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.secondary}`}
>
{t('cancel')}
</button>
<button
type="submit"
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.primary}`}
>
{t('add')}
</button>
</div>
</form>
</div>
</div>
)}

{/* Savings Modal */}
{showSavingsModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className={`${theme.card} rounded-lg p-4 sm:p-6 w-full max-w-md border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('newSavingsGoal')}</h3>
<form onSubmit={(e) => {
e.preventDefault();
const formData = new FormData(e.target);
addSavingsGoal({
name: formData.get('name'),
target: parseFloat(formData.get('target')),
deadline: formData.get('deadline')
});
}}>
<input
name="name"
type="text"
placeholder={t('goalName')}
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
/>
<input
name="target"
type="number"
placeholder={t('targetAmount')}
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
/>
<input
name="deadline"
type="date"
className={`w-full px-3 py-2 border rounded-lg mb-4 text-base ${theme.input}`}
required
/>
<div className="flex gap-2">
<button
type="button"
onClick={() => setShowSavingsModal(false)}
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.secondary}`}
>
{t('cancel')}
</button>
<button
type="submit"
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.primary}`}
>
{t('create')}
</button>
</div>
</form>
</div>
</div>
)}

{/* Recurring Expense Modal - Modifié */}
{showRecurringModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className={`${theme.card} rounded-lg p-4 sm:p-6 w-full max-w-md border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('newRecurring')}</h3>
<form onSubmit={(e) => {
e.preventDefault();
const formData = new FormData(e.target);
addRecurringExpense({
name: formData.get('name'),
amount: parseFloat(formData.get('amount')),
category: formData.get('category'),
day: parseInt(formData.get('day')),
deductionDate: formData.get('deductionDate')
});
}}>
<input
name="name"
type="text"
placeholder="Nom"
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
/>
<input
name="amount"
type="number"
step="0.01"
placeholder={t('amount')}
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
/>
<select
name="category"
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
>
{categories.map(cat => (
<option key={cat.id} value={cat.name}>{cat.name}</option>
))}
</select>
<input
name="day"
type="number"
min="1"
max="31"
placeholder={t('dayOfMonth')}
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
/>
<input
name="deductionDate"
type="text"
placeholder={t('deductionDate') + ' (ex: 15/01)'}
className={`w-full px-3 py-2 border rounded-lg mb-4 text-base ${theme.input}`}
/>
<div className="flex gap-2">
<button
type="button"
onClick={() => setShowRecurringModal(false)}
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.secondary}`}
>
{t('cancel')}
</button>
<button
type="submit"
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.primary}`}
>
{t('create')}
</button>
</div>
</form>
</div>
</div>
)}

{/* Debt Modal */}
{showDebtModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div className={`${theme.card} rounded-lg p-4 sm:p-6 w-full max-w-md border ${theme.border}`}>
<h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>{t('newDebt')}</h3>
<form onSubmit={(e) => {
e.preventDefault();
const formData = new FormData(e.target);
addDebt({
name: formData.get('name'),
balance: parseFloat(formData.get('balance')),
minPayment: parseFloat(formData.get('minPayment')),
rate: parseFloat(formData.get('rate'))
});
}}>
<input
name="name"
type="text"
placeholder={t('debtName')}
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
/>
<input
name="balance"
type="number"
step="0.01"
placeholder={t('currentBalance')}
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
/>
<input
name="minPayment"
type="number"
step="0.01"
placeholder={t('minimumPayment')}
className={`w-full px-3 py-2 border rounded-lg mb-3 text-base ${theme.input}`}
required
/>
<input
name="rate"
type="number"
step="0.01"
placeholder={t('interestRate')}
className={`w-full px-3 py-2 border rounded-lg mb-4 text-base ${theme.input}`}
required
/>
<div className="flex gap-2">
<button
type="button"
onClick={() => setShowDebtModal(false)}
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.secondary}`}
>
{t('cancel')}
</button>
<button
type="submit"
className={`flex-1 px-4 py-2 rounded-lg ${theme.button.primary}`}
>
{t('add')}
</button>
</div>
</form>
</div>
</div>
)}
</div>
);
};

export default FinanceDashboard;