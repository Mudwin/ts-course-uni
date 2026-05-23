import { validateDate } from './validateDate';
import { errors } from '../utils/dictionarty';

describe('validateDate', () => {
  it('Должен принимать корректную дату в формате ДД.ММ.ГГГГ', () => {
    const futureDate = '01.01.2030';
    const result = validateDate(futureDate);

    expect(result.isValid).toBe(true);
    expect(result.message).toBe(errors.date.valid);
  });

  it('Должен не пропускать дату со специальными символами', () => {
    const invalidDate = '01.01.2030?';
    const result = validateDate(invalidDate);

    expect(result.isValid).toBe(false);
    expect(result.message).toBe(errors.date.invalidCharacters);
  });

  it('Должен не пропускать дату с буквами', () => {
    const invalidDate = '01.01.ABCD';
    const result = validateDate(invalidDate);

    expect(result.isValid).toBe(false);
    expect(result.message).toBe(errors.date.invalidCharacters);
  });

  it('Должен выдавать предупреждение о прошедшей дате', () => {
    const pastDate = '01.01.2003';
    const result = validateDate(pastDate);

    expect(result.isValid).toBe(false);
    expect(result.message).toBe(errors.date.past);
  });
});
