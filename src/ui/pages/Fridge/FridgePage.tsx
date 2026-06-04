import { useState } from 'react';
import { useFridgeStore } from '../../../store/useFridgeStore';

const expiryLabel = {
  fresh: 'còn',
  'expires-today': 'hết hôm nay',
  expired: 'đã hết hạn'
};

export function FridgePage() {
  const [name, setName] = useState('');
  const ingredients = useFridgeStore((state) => state.ingredientViews());
  const addIngredient = useFridgeStore((state) => state.addIngredient);

  return (
    <section>
      <p className="page-sub">Tủ lạnh của tôi</p>
      <h2 className="page-title">Hôm nay nấu món gì nhỉ?</h2>
      <form
        className="glass card"
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim()) return;
          void addIngredient(name.trim()).then(() => setName(''));
        }}
      >
        <div className="row">
          <input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="VD: Cà chua" />
          <button className="button" type="submit">Thêm</button>
        </div>
      </form>
      <div className="glass card">
        <h3>Nguyên liệu hiện có</h3>
        <ul className="list">
          {ingredients.map((ingredient) => (
            <li className="item" key={ingredient.id}>
              <span>{ingredient.name}</span>
              <span className={`badge ${ingredient.expiryStatus}`}>{expiryLabel[ingredient.expiryStatus]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
