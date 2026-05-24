import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './ui/layouts/AppLayout';
import { FridgePage } from './ui/pages/Fridge/FridgePage';
import { RecipesPage } from './ui/pages/Recipes/RecipesPage';
import { SuggestPage } from './ui/pages/Suggest/SuggestPage';

export default function App() {
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
