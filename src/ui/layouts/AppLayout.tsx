import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="container">
      <h1>🥦 FridgeOS</h1>
      <nav>
        <NavLink to="/fridge">Tủ lạnh</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/suggest">Gợi ý</NavLink>
      </nav>
      <hr />
      {children}
    </div>
  );
}
