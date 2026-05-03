import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import './BudgetTracker.css';

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
    <div className="budget-tracker">
      <h3>💵 Monthly Budget</h3>
      
      <div className={`budget-display ${isOverBudget ? 'over-budget' : ''}`}>
        <div className="budget-info">
          <div className="budget-amount">
            {isEditingBudget ? (
              <div className="budget-edit">
                <input
                  type="number"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  min="0"
                  step="10"
                />
                <button onClick={handleSaveBudget} className="btn-check">✓</button>
                <button onClick={() => setIsEditingBudget(false)} className="btn-x">✕</button>
              </div>
            ) : (
              <>
                <span className="budget-label">Budget</span>
                <span className="budget-value">${monthlyBudget.toFixed(2)}</span>
                <button 
                  onClick={() => setIsEditingBudget(true)}
                  className="btn-edit-budget"
                  title="Edit budget"
                >
                  ✏️
                </button>
              </>
            )}
          </div>
          
          <div className="spending-info">
            <span className="spending-label">Spent</span>
            <span className="spending-value ${isOverBudget ? 'over' : ''}">${monthlyTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="budget-bar-container">
          <div className="budget-bar">
            <div
              className={`budget-bar-fill ${isOverBudget ? 'over' : ''}`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            ></div>
          </div>
          <span className={`budget-percentage ${isOverBudget ? 'over' : ''}`}>
            {percentageUsed.toFixed(0)}%
          </span>
        </div>

        {isOverBudget ? (
          <div className="budget-alert">
            ⚠️ Over budget by ${Math.abs(remaining).toFixed(2)}
          </div>
        ) : (
          <div className="budget-remaining">
            ✓ ${remaining.toFixed(2)} remaining
          </div>
        )}
      </div>
    </div>
  );
}
