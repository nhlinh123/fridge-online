export type Unit = 'kg' | 'g' | 'mg' | 'L' | 'ml' | 'cái' | 'quả' | 'bó' | 'hộp' | 'gói' | 'lon' | 'muỗng' | 'relative';

export interface Ingredient {
  id: string;
  name: string;
  nameNormalized: string;
  quantity?: number;
  unit: Unit;
  addedAt: Date;
  expiresAt?: Date;
}

export type ExpiryStatus = 'fresh' | 'expires-today' | 'expired';

export function getExpiryStatus(ingredient: Ingredient, now: Date = new Date()): ExpiryStatus {
  if (!ingredient.expiresAt) return 'fresh';

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const expiryDay = new Date(
    ingredient.expiresAt.getFullYear(),
    ingredient.expiresAt.getMonth(),
    ingredient.expiresAt.getDate()
  ).getTime();

  if (expiryDay < today) return 'expired';
  if (expiryDay === today) return 'expires-today';
  return 'fresh';
}
