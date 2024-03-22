export const supportedLanguages = [
  { id: "fr", title: "Français", isDefault: true },
  // { id: 'no', title: 'Norwegian' },
  { id: "en", title: "English" },
];

export const defaultLanguage = supportedLanguages.filter((language) => language.isDefault === true);
export const uiLanguage = { id: "fr", title: "Français" };
