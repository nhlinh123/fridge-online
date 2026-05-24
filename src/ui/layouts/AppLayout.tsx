import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="logo">🧊 Fridge<span>OS</span></div>
      </header>
      {children}
      <nav className="bottom-nav">
        <NavLink to="/fridge" className={({ isActive }) => (isActive ? "active" : "")}>🧊<br />Tủ lạnh</NavLink>
        <NavLink to="/recipes" className={({ isActive }) => (isActive ? "active" : "")}>📖<br />Recipes</NavLink>
        <NavLink to="/suggest" className={({ isActive }) => (isActive ? "active" : "")}>✦<br />Gợi ý</NavLink>
      </nav>
    </div>
  );
}
