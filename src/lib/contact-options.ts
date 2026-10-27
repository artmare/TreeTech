export const budgetValues = ['automation', 'web', 'app', 'integration', 'workflow'] as const;

export type BudgetValue = (typeof budgetValues)[number];

/** Accepts Austrian and international numbers such as "0660 955 73 57" or "+43 660 9557357". */
export const phonePattern = /^\+?[0-9][0-9 ()/-]{5,24}$/;
