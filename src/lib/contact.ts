import {z} from 'zod';

export const budgetValues = ['landing', 'website', 'business', 'custom'] as const;
export type BudgetValue = (typeof budgetValues)[number];

type ContactMessages = {
  name: string;
  email: string;
  budget: string;
  message: string;
};

export function createContactSchema(messages: ContactMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.name).max(120),
    email: z.string().trim().email(messages.email).max(160),
    company: z.string().trim().max(160).optional(),
    budget: z
      .string()
      .min(1, messages.budget)
      .refine((value) => budgetValues.includes(value as BudgetValue), messages.budget),
    message: z.string().trim().min(20, messages.message).max(2000),
    websiteUrl: z.string().max(500).optional()
  });
}

export const serverContactSchema = createContactSchema({
  name: 'Name is required.',
  email: 'A valid email is required.',
  budget: 'Budget is required.',
  message: 'Message is required.'
});

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
