export type Locale = "en" | "ar";

export enum Languages {
  English = "en",
  Arabic = "ar",
}

export enum Directions {
  LTR = "ltr",
  RTL = "rtl",
}

export type LocalizedMessage = {
  en: string;
  ar: string;
};
