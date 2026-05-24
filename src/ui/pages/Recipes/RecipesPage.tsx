import { useState } from 'react';
import { useFridgeStore } from '../../../application/store/useFridgeStore';

export function RecipesPage() {
  const [name, setName] = useState('');
  const [rawIngredients, setRawIngredients] = useState('');
  const recipes = useFridgeStore((s) => s.recipes);
  const addRecipe = useFridgeStore((s) => s.addRecipe);

  return (
    <section>
      <p className="page-sub">Recipe manager</p>
      <h2 className="page-title">Món ăn của bạn</h2>
      <form className="glass card" onSubmit={(e) => {
        e.preventDefault();
        const parts = rawIngredients.split(',').map((p) => p.trim()).filter(Boolean);
        if (!name.trim() || parts.length === 0) return;
        addRecipe(name.trim(), parts);
        setName('');
        setRawIngredients('');
      }}>
        <div className="row" style={{ flexDirection: 'column' }}>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên món" />
          <input className="input" value={rawIngredients} onChange={(e) => setRawIngredients(e.target.value)} placeholder="trứng, cà chua" />
          <button className="button" type="submit">Thêm recipe</button>
        </div>
      </form>
      <div className="glass card">
        <ul className="list">{recipes.map((r) => <li key={r.id}>{r.name}</li>)}</ul>
      </div>
    </section>
  );
}
