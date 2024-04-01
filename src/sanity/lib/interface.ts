export function getColor(color: colorSanityType): colorBgType {
  switch (color) {
    case "blue":
      return "bg-nu-blue";
    case "peach":
      return "bg-nu-peach";
    case "green":
      return "bg-nu-green";
    case "purple":
      return "bg-nu-purple";
    case "yellow":
      return "bg-nu-yellow";
  }
  return "bg-nu-peach";
}

export type colorBgType = "bg-nu-yellow" | "bg-nu-green" | "bg-nu-blue" | "bg-nu-peach" | "bg-nu-purple";
export type colorSanityType = "yellow" | "green" | "blue" | "peach" | "purple";
export type localeType = "en" | "fr";
export type localeStringType = { en: string; fr: string };
export type buttonType = { ext: boolean; text: localeStringType; url: string };
export type altImageType = {
  alt: localeStringType;
  image: {
    url: string;
    metadata: {
      lqip: string;
    };
  };
};
