import { describe, expect, it } from 'vitest';
import { getExpiryStatus, type Ingredient } from './Ingredient';

const baseIngredient: Ingredient = {
  id: 'ca-chua',
  name: 'Cà chua',
  nameNormalized: 'ca chua',
  unit: 'relative',
  addedAt: new Date('2026-06-01T00:00:00.000Z')
};

describe('getExpiryStatus', () => {
  it('derives fresh, same-day, and expired states from the domain model', () => {
    const now = new Date('2026-06-04T12:00:00.000Z');

    expect(getExpiryStatus(baseIngredient, now)).toBe('fresh');
    expect(getExpiryStatus({ ...baseIngredient, expiresAt: new Date('2026-06-04T01:00:00.000Z') }, now)).toBe('expires-today');
    expect(getExpiryStatus({ ...baseIngredient, expiresAt: new Date('2026-06-03T23:00:00.000Z') }, now)).toBe('expired');
  });
});
