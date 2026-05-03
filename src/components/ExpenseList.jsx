import { useExpenses } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';
export default function ExpenseList() {
  const { expenses, filteredExpenses } = useExpenses();
  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  if (expenses.length === 0) {
    return (
      <section className="card empty-state">
        <h2 className="card-title">No expenses yet</h2>
        <p className="muted">Add your first expense to start tracking spending.</p>
      </section>
    );
  }

  if (filteredExpenses.length === 0) {
    return (
      <section className="card empty-state">
        <h2 className="card-title">No expenses match</h2>
        <p className="muted">Try clearing filters or widening the date range.</p>
      </section>
    );
  }

  return (
    <section className="card expense-list-card">
      <div className="summary-bar">
        <div className="summary-card">
          <span className="summary-label">Filtered total</span>
          <span className="summary-value">${totalAmount.toFixed(2)}</span>
          <span className="summary-hint">from {filteredExpenses.length} matching items</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Showing</span>
          <span className="summary-value subtle">{filteredExpenses.length}</span>
          <span className="summary-hint">of {expenses.length} total expenses</span>
        </div>
      </div>

      <div className="expense-list">
        {filteredExpenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </section>
  );
}
