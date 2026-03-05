export const SEMESTER_COUNT = 8;
export const CREDIT_WEIGHTS = [20, 20, 25, 25, 25, 25, 19, 16] as const;
export const TOTAL_CREDITS = CREDIT_WEIGHTS.reduce((credit_total, weight) => credit_total + weight, 0);
export const MIN_SGPA = 0;
export const MAX_SGPA = 10;
