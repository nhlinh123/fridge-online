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
  const removeIngredient = useFridgeStore((state) => state.removeIngredient);

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
      <h3 className="section-title">Nguyên liệu hiện có</h3>
      <ul className="list">
        {ingredients.map((ingredient) => (
          <li className="glass card" key={ingredient.id}>
            <div className="item">
              <span>{ingredient.name}</span>
              <span className={`badge ${ingredient.expiryStatus}`}>{expiryLabel[ingredient.expiryStatus]}</span>
            </div>
            <button className="button button-danger" type="button" onClick={() => void removeIngredient(ingredient.id)}>
              Xóa nguyên liệu
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
