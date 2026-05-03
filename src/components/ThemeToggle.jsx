import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <div className="theme-toggle-inner">
        <label className="theme-option">
          <input
            type="radio"
            name="theme"
            value="light"
            checked={!isDarkMode}
            onChange={() => !isDarkMode || toggleTheme()}
            style={{ display: 'none' }}
          />
          Light
        </label>
        <label className="theme-option">
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={isDarkMode}
            onChange={() => isDarkMode || toggleTheme()}
            style={{ display: 'none' }}
          />
          Dark
        </label>
      </div>
    </div>
  );
}
