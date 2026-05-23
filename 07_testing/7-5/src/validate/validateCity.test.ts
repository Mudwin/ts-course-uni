import { validateCityName } from './validateCity';
import { errors } from '../utils/dictionarty';

describe('validateCityName', () => {
  it('Должен выдавать предупреждение, если есть экранирование', () => {
    const city = 'city<name';
    const result = validateCityName(city);

    expect(result.isValid).toBe(false);
    expect(result.message).toBe(errors.city.escape);
  });

  it('Должен пропускать название с восклицательными знаками или дефисами', () => {
    const city = 'Saint-Louis-du-Ha! Ha!';
    const result = validateCityName(city);

    expect(result.isValid).toBe(true);
    expect(result.message).toBe(errors.city.valid);
  });

  it('Должен пропускать название со спецсимволами', () => {
    const city = 'Ağrı';
    const result = validateCityName(city);

    expect(result.isValid).toBe(true);
    expect(result.message).toBe(errors.city.valid);
  });

  it('Должен пропускать название из одной буквы', () => {
    const city = 'A';
    const result = validateCityName(city);

    expect(result.isValid).toBe(true);
    expect(result.message).toBe(errors.city.valid);
  });
});
