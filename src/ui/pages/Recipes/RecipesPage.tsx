import { useState } from 'react';
import { useFridgeStore } from '../../../store/useFridgeStore';

export function RecipesPage() {
  const [name, setName] = useState('');
  const [rawIngredients, setRawIngredients] = useState('');
  const recipes = useFridgeStore((state) => state.recipes);
  const addRecipe = useFridgeStore((state) => state.addRecipe);
  const ingredientNameForRef = useFridgeStore((state) => state.ingredientNameForRef);

  return (
    <section>
      <p className="page-sub">Recipe manager</p>
      <h2 className="page-title">Món ăn của bạn</h2>
      <form
        className="glass card"
        onSubmit={(event) => {
          event.preventDefault();
          const parts = rawIngredients.split(',').map((part) => part.trim()).filter(Boolean);
          if (!name.trim() || parts.length === 0) return;
          void addRecipe(name.trim(), parts).then(() => {
            setName('');
            setRawIngredients('');
          });
        }}
      >
        <div className="row" style={{ flexDirection: 'column' }}>
          <input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Tên món" />
          <input className="input" value={rawIngredients} onChange={(event) => setRawIngredients(event.target.value)} placeholder="trứng, cà chua" />
          <button className="button" type="submit">Thêm recipe</button>
        </div>
      </form>
      <div className="glass card">
        <ul className="list">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <strong>{recipe.name}</strong>
              <div className="muted">{recipe.items.map((item) => ingredientNameForRef(item.ingredientRef)).join(', ')}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
