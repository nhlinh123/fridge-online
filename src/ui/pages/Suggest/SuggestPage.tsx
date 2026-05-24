import { useFridgeStore } from '../../../application/store/useFridgeStore';

export function SuggestPage() {
  const matches = useFridgeStore((s) => s.matches);
  const recompute = useFridgeStore((s) => s.recompute);

  return (
    <section>
      <p className="page-sub">Gợi ý hôm nay</p>
      <h2 className="page-title">Smart Suggest</h2>
      <button className="button" onClick={recompute} style={{ marginBottom: 12 }}>Re-compute matches</button>
      <ul className="list">
        {matches.map((m) => (
          <li className="glass card" key={m.recipe.id}>
            <div className="item">
              <strong>{m.recipe.name}</strong>
              <span className="badge">{m.score}%</span>
            </div>
            <div className="muted">{m.type} {m.missingIngredients.length ? `· Thiếu: ${m.missingIngredients.join(', ')}` : '· Đủ nguyên liệu'}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
