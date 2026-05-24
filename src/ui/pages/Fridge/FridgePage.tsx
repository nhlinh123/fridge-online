import { useState } from 'react';
import { useFridgeStore } from '../../../application/store/useFridgeStore';

export function FridgePage() {
  const [name, setName] = useState('');
  const ingredients = useFridgeStore((s) => s.ingredients);
  const addIngredient = useFridgeStore((s) => s.addIngredient);

  return (
    <section>
      <p className="page-sub">Tủ lạnh của tôi</p>
      <h2 className="page-title">Hôm nay nấu món gì nhỉ?</h2>
      <form className="glass card" onSubmit={(e) => { e.preventDefault(); if (!name.trim()) return; addIngredient(name.trim()); setName(''); }}>
        <div className="row">
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="VD: Cà chua" />
          <button className="button" type="submit">Thêm</button>
        </div>
      </form>
      <div className="glass card">
        <h3>Nguyên liệu hiện có</h3>
        <ul className="list">
          {ingredients.map((i) => (
            <li className="item" key={i.id}>
              <span>{i.name}</span>
              <span className="badge">còn</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
