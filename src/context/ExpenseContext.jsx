import { createContext, useEffect, useMemo, useState, useContext } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('date-desc');
  const [dateRange, setDateRange] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      liked: false,
    };
    setExpenses([newExpense, ...expenses]);
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const updateExpense = (id, updatedData) => {
    setExpenses(expenses.map(e =>
      e.id === id ? { ...e, ...updatedData } : e
    ));
  };

  const toggleLike = (id) => {
    setExpenses(expenses.map(e =>
      e.id === id ? { ...e, liked: !e.liked } : e
    ));
  };

  const filteredExpenses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const getDateRange = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      switch (dateRange) {
        case 'today':
          return {
            start: today,
            end: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          };
        case 'week': {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          return {
            start: weekStart,
            end: new Date(),
          };
        }
        case 'month':
          return {
            start: new Date(now.getFullYear(), now.getMonth(), 1),
            end: new Date(),
          };
        case 'year':
          return {
            start: new Date(now.getFullYear(), 0, 1),
            end: new Date(),
          };
        case 'custom':
          return {
            start: customStartDate ? new Date(customStartDate) : null,
            end: customEndDate ? new Date(customEndDate) : null,
          };
        default:
          return null;
      }
    };

    const dateFilter = getDateRange();
    const result = expenses.filter((expense) => {
      if (categoryFilter !== 'all' && expense.category !== categoryFilter) {
        return false;
      }

      if (favoritesOnly && !expense.liked) {
        return false;
      }

      if (normalizedQuery && !expense.title.toLowerCase().includes(normalizedQuery)) {
        return false;
      }

      if (dateFilter && (dateFilter.start || dateFilter.end)) {
        const expenseDate = new Date(expense.date);
        if (dateFilter.start && expenseDate < dateFilter.start) {
          return false;
        }
        if (dateFilter.end && expenseDate >= dateFilter.end) {
          return false;
        }
      }

      return true;
    });

    return [...result].sort((left, right) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(right.date) - new Date(left.date);
        case 'date-asc':
          return new Date(left.date) - new Date(right.date);
        case 'amount-desc':
          return right.amount - left.amount;
        case 'amount-asc':
          return left.amount - right.amount;
        default:
          return 0;
      }
    });
  }, [categoryFilter, customEndDate, customStartDate, dateRange, expenses, favoritesOnly, query, sortBy]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        filteredExpenses,
        query,
        setQuery,
        categoryFilter,
        setCategoryFilter,
        favoritesOnly,
        setFavoritesOnly,
        sortBy,
        setSortBy,
        dateRange,
        setDateRange,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        addExpense,
        removeExpense,
        updateExpense,
        toggleLike,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
