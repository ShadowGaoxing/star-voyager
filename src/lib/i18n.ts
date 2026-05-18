import zh from "../../public/locales/zh.json";
import en from "../../public/locales/en.json";

export type Lang = "zh" | "en";

const translations: Record<Lang, Record<string, any>> = { zh, en };

function getNestedValue(obj: Record<string, any>, path: string): any {
  const keys = path.split(".");
  let current: any = obj;
  for (const key of keys) {
    if (current[key] === undefined) return path;
    current = current[key];
  }
  return current;
}

export function t(lang: Lang, key: string): any {
  return getNestedValue(translations[lang], key);
}
