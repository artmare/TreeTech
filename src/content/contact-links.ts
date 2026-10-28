/**
 * Phone and WhatsApp details in a tiny module, so client components
 * (contact bar, assistant) do not pull the whole site content into the bundle.
 */
export const contactPhone = {
  /** Displayed phone number. */
  display: '+43 660 9557357',
  /** Digits only, international format, used for tel: and wa.me links. */
  digits: '436609557357'
};

export const contactEmail = 'office@treetech.at';

export const phoneHref = `tel:+${contactPhone.digits}`;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${contactPhone.digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
