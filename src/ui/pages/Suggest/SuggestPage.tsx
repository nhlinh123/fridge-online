import { useFridgeStore } from '../../../store/useFridgeStore';

const tierLabel = {
  ready: 'Nấu được ngay',
  'missing-few': 'Thiếu vài nguyên liệu',
  'low-match': 'Xếp cuối'
};

export function SuggestPage() {
  const suggestions = useFridgeStore((state) => state.suggestions);
  const recompute = useFridgeStore((state) => state.recompute);
  const ingredientNameForRef = useFridgeStore((state) => state.ingredientNameForRef);

  return (
    <section>
      <p className="page-sub">Gợi ý hôm nay</p>
      <h2 className="page-title">Smart Suggest</h2>
      <button className="button" onClick={() => void recompute()} style={{ marginBottom: 12 }}>Re-compute matches</button>
      <ul className="list">
        {suggestions.map((suggestion) => (
          <li className="glass card" key={suggestion.recipe.id}>
            <div className="item">
              <strong>{suggestion.recipe.name}</strong>
              <span className="badge">{suggestion.score}%</span>
            </div>
            <div className="muted">
              {tierLabel[suggestion.tier]}
              {suggestion.missingIngredientRefs.length
                ? ` · Thiếu: ${suggestion.missingIngredientRefs.map(ingredientNameForRef).join(', ')}`
                : ' · Đủ nguyên liệu'}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
