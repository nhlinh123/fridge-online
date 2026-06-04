import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './ui/layouts/AppLayout';
import { FridgePage } from './ui/pages/Fridge/FridgePage';
import { RecipesPage } from './ui/pages/Recipes/RecipesPage';
import { SuggestPage } from './ui/pages/Suggest/SuggestPage';
import { useFridgeStore } from './store/useFridgeStore';

export default function App() {
  const initialize = useFridgeStore((state) => state.initialize);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/fridge" replace />} />
        <Route path="/fridge" element={<FridgePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/suggest" element={<SuggestPage />} />
      </Routes>
    </AppLayout>
  );
}
