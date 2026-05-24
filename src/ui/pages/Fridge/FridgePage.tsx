import { useState } from 'react';
import { useFridgeStore } from '../../../application/store/useFridgeStore';

export function FridgePage() {
  const [name, setName] = useState('');
  const ingredients = useFridgeStore((s) => s.ingredients);
  const addIngredient = useFridgeStore((s) => s.addIngredient);
  return (
    <section className="card">
      <h2>Fridge Manager</h2>
      <form onSubmit={(e) => { e.preventDefault(); if (!name.trim()) return; addIngredient(name.trim()); setName(''); }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="VD: Cà chua" />
        <button type="submit">Thêm</button>
      </form>
      <ul>{ingredients.map((i) => <li key={i.id}>{i.name}</li>)}</ul>
    </section>
  );
}
