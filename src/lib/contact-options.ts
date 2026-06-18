export const budgetValues = ['automation', 'web', 'app', 'integration', 'workflow'] as const;

export type BudgetValue = (typeof budgetValues)[number];
