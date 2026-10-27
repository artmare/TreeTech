import type {Locale} from '@/i18n/routing';

export type TeamMember = {
  name: string;
  /** Path under /public, e.g. '/team/artem.webp' (square, at least 600x600). */
  photo: string;
  role: Record<Locale, string>;
  bio: Record<Locale, string>;
};

/**
 * The "Wer steckt dahinter" section on the home page is only shown when this
 * list is not empty, so the live site never shows placeholder people.
 * Add both members (photo, name, role, 2–3 sentences) to make it appear.
 */
export const teamMembers: TeamMember[] = [];
