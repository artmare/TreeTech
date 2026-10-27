import {z} from 'zod';

import {budgetValues, type BudgetValue} from '@/lib/contact-options';

export {budgetValues};
export type {BudgetValue};

type ContactMessages = {
  name: string;
  email: string;
  budget: string;
  message: string;
};

const contactMetadataSchema = z
  .object({
    source: z.enum(['assistant', 'free_analysis', 'website_form']).optional(),
    locale: z.enum(['de', 'en', 'ru']).optional(),
    bookingIntent: z.boolean().optional(),
    qualification: z
      .object({
        businessType: z.string().trim().max(120).optional(),
        projectType: z.string().trim().max(120).optional(),
        urgency: z.string().trim().max(120).optional()
      })
      .strict()
      .optional(),
    transcript: z
      .array(
        z
          .object({
            role: z.enum(['assistant', 'user']),
            content: z.string().trim().min(1).max(1200)
          })
          .strict()
      )
      .max(12)
      .optional()
  })
  .strict();

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
    websiteUrl: z.string().max(500).optional(),
    startedAt: z.number().int().positive().optional(),
    metadata: contactMetadataSchema.optional()
  });
}

export const serverContactSchema = createContactSchema({
  name: 'Name is required.',
  email: 'A valid email is required.',
  budget: 'Project type is required.',
  message: 'Message is required.'
});

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
