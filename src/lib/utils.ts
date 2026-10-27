export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const softHyphenWords: Array<[string, string]> = [
  ['Niederösterreich', 'Nieder\u00ADösterreich'],
  ['Webentwicklung', 'Web\u00ADentwicklung'],
  ['Automatisierung', 'Automati\u00ADsierung'],
  ['Unternehmen', 'Unter\u00ADnehmen'],
  ['Tourismusbetriebe', 'Tourismus\u00ADbetriebe']
];

/** Adds soft hyphens to long German words so big headlines break at sensible places on phones. */
export function softHyphens(text: string) {
  return softHyphenWords.reduce((value, [word, hyphenated]) => value.replaceAll(word, hyphenated), text);
}
