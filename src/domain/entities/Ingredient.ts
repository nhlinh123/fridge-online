export type Unit = 'kg' | 'g' | 'mg' | 'L' | 'ml' | 'cái' | 'quả' | 'bó' | 'hộp' | 'gói' | 'lon' | 'muỗng' | 'relative';

export interface Ingredient {
  id: string;
  name: string;
  nameNormalized: string;
  quantity?: number;
  unit: Unit;
  addedAt: Date;
}
