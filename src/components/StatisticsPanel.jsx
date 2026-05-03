import { useExpenses } from '../context/ExpenseContext';
import BudgetTracker from './BudgetTracker';


const categoryEmojis = {
  food: '🍔',
  transport: '🚗',
  entertainment: '🎬',
  utilities: '💡',
  shopping: '🛍️',
  health: '🏥',
  other: '📌',
};

const categoryNames = {
  food: 'Food',
  transport: 'Transport',
  entertainment: 'Entertainment',
  utilities: 'Utilities',
  shopping: 'Shopping',
  health: 'Health',
  other: 'Other',
};

export default function StatisticsPanel() {
  const { expenses } = useExpenses();

  if (expenses.length === 0) {
    return null;
  }

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const averageExpense = totalAmount / expenses.length;

  // Calculate category breakdown
  const categoryBreakdown = {};
  expenses.forEach(expense => {
    if (!categoryBreakdown[expense.category]) {
      categoryBreakdown[expense.category] = {
        count: 0,
        total: 0,
      };
    }
    categoryBreakdown[expense.category].count += 1;
    categoryBreakdown[expense.category].total += expense.amount;
  });

  // Find top category
  let topCategory = null;
  let maxAmount = 0;
  Object.entries(categoryBreakdown).forEach(([category, data]) => {
    if (data.total > maxAmount) {
      maxAmount = data.total;
      topCategory = category;
    }
  });

  // Calculate month breakdown
  const monthBreakdown = {};
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!monthBreakdown[month]) {
      monthBreakdown[month] = 0;
    }
    monthBreakdown[month] += expense.amount;
  });

  const sortedMonths = Object.entries(monthBreakdown).sort((a, b) => {
    return new Date(a[0]) - new Date(b[0]);
  });

  const recentMonths = sortedMonths.slice(-3);

  return (
    <div className="statistics-panel">
      <h2>📊 Statistics</h2>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value">${totalAmount.toFixed(2)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Average per expense</div>
          <div className="stat-value">${averageExpense.toFixed(2)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total expenses</div>
          <div className="stat-value">{expenses.length}</div>
        </div>

        {topCategory && (
          <div className="stat-card highlight">
            <div className="stat-label">Top spending</div>
            <div className="stat-value">{categoryEmojis[topCategory]} {categoryNames[topCategory]}</div>
          </div>
        )}
      </div>

      <div className="category-breakdown">
        <h3>By Category</h3>
        <div className="category-items">
          {Object.entries(categoryBreakdown).map(([category, data]) => (
            <div key={category} className="category-item">
              <div className="category-info">
                <span className="category-label">{categoryEmojis[category]} {categoryNames[category]}</span>
                <span className="category-count">{data.count}</span>
              </div>
              <div className="category-amount">${data.total.toFixed(2)}</div>
              <div className="category-bar">
                <div
                  className="category-bar-fill"
                  style={{ width: `${(data.total / totalAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {recentMonths.length > 0 && (
        <div className="monthly-trend">
          <h3>Recent Months</h3>
          <div className="month-items">
            {recentMonths.map(([month, amount]) => (
              <div key={month} className="month-item">
                <span className="month-label">{month}</span>
                <span className="month-amount">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <BudgetTracker />
    </div>
  );
}
