import { useExpenses } from '../context/ExpenseContext';
import BudgetTracker from './BudgetTracker';

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
    <section className="statistics-panel">
      <div className="summary-bar">
        <div className="summary-card">
          <span className="summary-label">Total spent</span>
          <span className="summary-value">${totalAmount.toFixed(2)}</span>
          <span className="summary-hint">all recorded expenses</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Average</span>
          <span className="summary-value subtle">${averageExpense.toFixed(2)}</span>
          <span className="summary-hint">per expense</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Count</span>
          <span className="summary-value subtle">{expenses.length}</span>
          <span className="summary-hint">tracked items</span>
        </div>
        {topCategory && (
          <div className="summary-card">
            <span className="summary-label">Top category</span>
            <span className="summary-value subtle">{categoryNames[topCategory]}</span>
            <span className="summary-hint">${maxAmount.toFixed(2)} total</span>
          </div>
        )}
      </div>

      <div className="two-col stats-grid">
        <section className="card stat-section">
          <h3 className="card-title">By category</h3>
          <div className="category-list">
            {Object.entries(categoryBreakdown).map(([category, data]) => (
              <div key={category} className="category-row">
                <div className="category-row-head">
                  <span className="category-name">{categoryNames[category]}</span>
                  <span className="category-count">{data.count}</span>
                </div>
                <div className="category-row-foot">
                  <span className="category-amount">${data.total.toFixed(2)}</span>
                  <div className="category-bar">
                    <div
                      className="category-bar-fill"
                      style={{ width: `${(data.total / totalAmount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {recentMonths.length > 0 && (
          <section className="card stat-section">
            <h3 className="card-title">Recent months</h3>
            <div className="month-list">
              {recentMonths.map(([month, amount]) => (
                <div key={month} className="month-row">
                  <span className="month-label">{month}</span>
                  <span className="month-amount">${amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <BudgetTracker />
    </section>
  );
}
