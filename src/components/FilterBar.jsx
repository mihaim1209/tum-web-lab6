import { useExpenses } from '../context/ExpenseContext';

export default function FilterBar() {
  const {
    categoryFilter,
    setCategoryFilter,
    query,
    setQuery,
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
  } = useExpenses();

  return (
    <section className="card filter-bar">
      <h2 className="card-title">Filters</h2>

      <div className="filter-grid">
        <label className="field">
          <span className="field-label">Category</span>
          <select
            className="input"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All categories</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="field">
          <span className="field-label">Search</span>
          <input
            className="input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search expenses"
          />
        </label>

        <label className="field">
          <span className="field-label">Sort</span>
          <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="amount-desc">Highest amount</option>
            <option value="amount-asc">Lowest amount</option>
          </select>
        </label>

        <label className="field">
          <span className="field-label">Period</span>
          <select className="input" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="all">All time</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="year">This year</option>
            <option value="custom">Custom range</option>
          </select>
        </label>

        <label className="field field-checkbox field-span-2">
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={(e) => setFavoritesOnly(e.target.checked)}
          />
          <span>Favorites only</span>
        </label>
      </div>

      {dateRange === 'custom' ? (
        <div className="custom-date-range">
          <input
            className="input"
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
            aria-label="Custom start date"
          />
          <span className="muted">to</span>
          <input
            className="input"
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
            aria-label="Custom end date"
          />
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setCustomStartDate('');
              setCustomEndDate('');
              setDateRange('all');
            }}
          >
            Reset
          </button>
        </div>
      ) : null}
    </section>
  );
}