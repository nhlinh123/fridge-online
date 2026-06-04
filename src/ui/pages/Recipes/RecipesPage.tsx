import { useState } from 'react';
import { useFridgeStore } from '../../../store/useFridgeStore';

export function RecipesPage() {
  const [name, setName] = useState('');
  const [rawIngredients, setRawIngredients] = useState('');
  const recipes = useFridgeStore((state) => state.recipes);
  const addRecipe = useFridgeStore((state) => state.addRecipe);
  const deleteRecipe = useFridgeStore((state) => state.deleteRecipe);
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
      <ul className="list">
        {recipes.map((recipe) => (
          <li className="glass card" key={recipe.id}>
            <div className="item">
              <strong>{recipe.name}</strong>
              <span className="badge">{recipe.items.length} nguyên liệu</span>
            </div>
            <div className="chip-list" aria-label={`Nguyên liệu cho ${recipe.name}`}>
              {recipe.items.map((item) => (
                <span className="chip" key={item.ingredientRef}>{ingredientNameForRef(item.ingredientRef)}</span>
              ))}
            </div>
            <button className="button button-danger" type="button" onClick={() => void deleteRecipe(recipe.id)}>
              Xóa món
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
