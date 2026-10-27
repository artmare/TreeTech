import {z} from 'zod';

import {budgetValues, phonePattern, type BudgetValue} from '@/lib/contact-options';

export {budgetValues, phonePattern};
export type {BudgetValue};

type ContactMessages = {
  name: string;
  email: string;
  phone: string;
  reachable: string;
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
    // Trades often prefer a phone call, so either a phone number or an email is enough.
    email: z.union([z.literal(''), z.string().trim().email(messages.email).max(160)]).optional(),
    phone: z.union([z.literal(''), z.string().trim().regex(phonePattern, messages.phone)]).optional(),
    company: z.string().trim().max(160).optional(),
    budget: z
      .string()
      .min(1, messages.budget)
      .refine((value) => budgetValues.includes(value as BudgetValue), messages.budget),
    message: z.string().trim().max(2000, messages.message).optional(),
    websiteUrl: z.string().max(500).optional(),
    startedAt: z.number().int().positive().optional(),
    metadata: contactMetadataSchema.optional()
  }).refine((value) => Boolean(value.email || value.phone), {
    message: messages.reachable,
    path: ['phone']
  });
}

export const serverContactSchema = createContactSchema({
  name: 'Name is required.',
  email: 'A valid email is required.',
  phone: 'A valid phone number is required.',
  reachable: 'A phone number or an email is required.',
  budget: 'Project type is required.',
  message: 'Message is required.'
});

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
