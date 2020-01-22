import {User} from '../model/user';

export const ConfigUserKey = 'currentConfigUser';
export const UserKey = 'currentUser';
export const LanguageKey = 'currentLanguage';
export const ThemeKey = 'currentTheme';
export const TorrentListPageSize = 'currentTorrentListPageSize';

export function saveObj(key = ConfigUserKey, data: any): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getObj(key = ConfigUserKey): any {
  const json = localStorage.getItem(key);
  if (json && typeof json === 'string') {
    return JSON.parse(json);
  }
  return null;
}

export function removeObj(key = ConfigUserKey): void {
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
