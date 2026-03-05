import { CREDIT_WEIGHTS, MAX_SGPA, MIN_SGPA, TOTAL_CREDITS } from './constants';

export const parseSgpaInput = (input_value: string): number | null => {
  if (input_value.trim() === '') {
    return null;
  }

  const parsed_value = parseFloat(input_value);
  return Number.isNaN(parsed_value) ? null : parsed_value;
};

export const createSgpaErrorFlags = (sgpa_values: Array<number | null>): boolean[] =>
  sgpa_values.map((sgpa_value) => {
    if (sgpa_value === null) {
      return false;
    }
    return sgpa_value < MIN_SGPA || sgpa_value > MAX_SGPA;
  });

export const calculateCgpaValue = (sgpa_values: Array<number | null>): number | null => {
  if (sgpa_values.includes(null)) {
    return null;
  }

  const total_weighted_score = sgpa_values.reduce<number>((credit_total, sgpa_value, index) => {
    const current_sgpa = sgpa_value ?? 0;
    return credit_total + current_sgpa * CREDIT_WEIGHTS[index];
  }, 0);

  const cgpa_value = total_weighted_score / TOTAL_CREDITS;
  return Number.isFinite(cgpa_value) ? cgpa_value : null;
};

export const hasInvalidEntries = (error_flags: boolean[]): boolean => error_flags.includes(true);
