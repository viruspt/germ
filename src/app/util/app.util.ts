import {User} from '../model/user';

export const ConfigKey = 'config';
export const UserKey = 'currentUser';
export const LanguageKey = 'currentLanguage';
export const ThemeKey = 'currentTheme';

export function saveObj(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getObj(key = ConfigKey): any {
  const json = localStorage.getItem(key);
  if (json && typeof json === 'string') {
    return JSON.parse(json);
  }
  return null;
}

export function removeObj(key = ConfigKey): void {
  localStorage.removeItem(key);
}

// user
export function saveUser(data: any): void {
  saveObj(UserKey, data);
}

export function getUser(): User {
  return getObj(UserKey);
}

export function removeUser(): void {
  removeObj(UserKey);
}

// language
export function saveLanguage(data: any): void {
  saveObj(LanguageKey, data);
}

export function getLanguage(): string {
  return getObj(LanguageKey);
}

export function removeLanguage(): void {
  removeObj(LanguageKey);
}

export function changeTheme(theme): void {
  const style = document.getElementById('themeAsset') as HTMLLinkElement;
  style.href = `assets/static/css/${theme}.css`;
  localStorage.setItem(ThemeKey, theme);
}
