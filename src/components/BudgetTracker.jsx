import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';


export default function BudgetTracker() {
  const { expenses } = useExpenses();
  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const saved = localStorage.getItem('monthlyBudget');
    return saved ? JSON.parse(saved) : 500;
  });
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyBudget);

  const currentMonth = new Date();
  const currentMonthExpenses = expenses.filter(e => {
    const expenseDate = new Date(e.date);
    return expenseDate.getMonth() === currentMonth.getMonth() &&
           expenseDate.getFullYear() === currentMonth.getFullYear();
  });

  const monthlyTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = monthlyBudget - monthlyTotal;
  const percentageUsed = (monthlyTotal / monthlyBudget) * 100;
  const isOverBudget = remaining < 0;

  const handleSaveBudget = () => {
    const newBudget = parseFloat(budgetInput);
    if (newBudget > 0) {
      setMonthlyBudget(newBudget);
      localStorage.setItem('monthlyBudget', JSON.stringify(newBudget));
      setIsEditingBudget(false);
    }
  };

  return (
    <section className={`card budget-card ${isOverBudget ? 'is-over-budget' : ''}`}>
      <div className="budget-header">
        <div>
          <p className="summary-label">Budget</p>
          <h3 className="card-title">Monthly budget</h3>
        </div>

        {isEditingBudget ? (
          <div className="budget-edit-actions">
            <input
              className="input budget-input"
              type="number"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              min="0"
              step="10"
            />
            <button type="button" onClick={handleSaveBudget} className="btn btn-primary">
              Save
            </button>
            <button type="button" onClick={() => setIsEditingBudget(false)} className="btn btn-ghost">
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setIsEditingBudget(true)} className="btn btn-ghost">
            Edit budget
          </button>
        )}
      </div>

      <div className="summary-bar budget-summary">
        <div className="summary-card">
          <span className="summary-label">Limit</span>
          <span className="summary-value">${monthlyBudget.toFixed(2)}</span>
          <span className="summary-hint">current budget</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Spent</span>
          <span className="summary-value subtle">${monthlyTotal.toFixed(2)}</span>
          <span className="summary-hint">this month</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Remaining</span>
          <span className="summary-value subtle">${Math.max(remaining, 0).toFixed(2)}</span>
          <span className="summary-hint">before you reach the limit</span>
        </div>
      </div>

      <div className="budget-bar-wrap">
        <div className="budget-bar" aria-hidden="true">
          <div
            className={`budget-bar-fill ${isOverBudget ? 'over' : ''}`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
        </div>
        <span className={`budget-percentage ${isOverBudget ? 'over' : ''}`}>
          {percentageUsed.toFixed(0)}% used
        </span>
      </div>

      {isOverBudget ? (
        <p className="budget-alert">Over budget by ${Math.abs(remaining).toFixed(2)}</p>
      ) : (
        <p className="budget-remaining">${remaining.toFixed(2)} remaining this month</p>
      )}
    </section>
  );
}
