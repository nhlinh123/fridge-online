import { useFridgeStore } from '../../../application/store/useFridgeStore';

export function SuggestPage() {
  const matches = useFridgeStore((s) => s.matches);
  const recompute = useFridgeStore((s) => s.recompute);
  return (
    <section className="card">
      <h2>Smart Suggest</h2>
      <button onClick={recompute}>Re-compute matches</button>
      <ul>
        {matches.map((m) => (
          <li key={m.recipe.id}>{m.recipe.name} — {m.score}% ({m.type}) {m.missingIngredients.length ? `Thiếu: ${m.missingIngredients.join(', ')}` : ''}</li>
        ))}
      </ul>
    </section>
  );
}
