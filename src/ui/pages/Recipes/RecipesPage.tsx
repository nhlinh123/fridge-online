import { useState } from 'react';
import { useFridgeStore } from '../../../application/store/useFridgeStore';

export function RecipesPage() {
  const [name, setName] = useState('');
  const [rawIngredients, setRawIngredients] = useState('');
  const recipes = useFridgeStore((s) => s.recipes);
  const addRecipe = useFridgeStore((s) => s.addRecipe);

  return (
    <section className="card">
      <h2>Recipe Manager</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const parts = rawIngredients.split(',').map((p) => p.trim()).filter(Boolean);
        if (!name.trim() || parts.length === 0) return;
        addRecipe(name.trim(), parts);
        setName('');
        setRawIngredients('');
      }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên món" />
        <input value={rawIngredients} onChange={(e) => setRawIngredients(e.target.value)} placeholder="trứng, cà chua" />
        <button type="submit">Thêm recipe</button>
      </form>
      <ul>{recipes.map((r) => <li key={r.id}>{r.name}</li>)}</ul>
    </section>
  );
}
