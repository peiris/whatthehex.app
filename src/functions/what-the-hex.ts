import colors from "@/data/colors.json";
import Color from "color";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface ClosestColor {
  color: string;
  name: string;
}

interface ColorDetails {
  id?: number;
  requested: string;
  returned?: string;
  isExact?: boolean;
  name?: string;
  rgb?: number[];
  variable?: string;
  message?: string;
}

const colorMap = colors as Record<string, string>;

/*
 * Validate color input
 */
function isValidHexCode(hex: string): boolean {
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
  return Boolean(hex && hex.length >= 4 && regex.test(hex));
}

/*
 * Convert HEX color to RGB
 */
function hexToRGB(hex: string): RGB | false {
  if (isValidHexCode(hex) !== true) {
    return false;
  }

  if (hex.charAt(0) === "#") {
    hex = hex.substr(1);
  }

  const values = hex.split("");
  let r: number, g: number, b: number;

  if (hex.length === 2) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = r;
    b = r;
  } else if (hex.length === 3) {
    r = parseInt(values[0].toString() + values[0].toString(), 16);
    g = parseInt(values[1].toString() + values[1].toString(), 16);
    b = parseInt(values[2].toString() + values[2].toString(), 16);
  } else if (hex.length === 6) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = parseInt(values[2].toString() + values[3].toString(), 16);
    b = parseInt(values[4].toString() + values[5].toString(), 16);
  } else {
    return false;
  }
  return { r, g, b };
}

/*
 * Find closest color name
 */
function findClosestColor(color: string): ClosestColor {
  const rgb = hexToRGB(color);
  if (!rgb) {
    return { color: "#000000", name: "Black" };
  }

  const { r, g, b } = rgb;
  const result = Object.keys(colorMap).reduce(
    (acc, c) => {
      const cRgb = hexToRGB(`#${c}`);
      if (!cRgb) return acc;

      const { r: cr, g: cg, b: cb } = cRgb;
      const rd = r - cr;
      const gd = g - cg;
      const bd = b - cb;
      const d = Math.sqrt(rd * rd + gd * gd + bd * bd);

      if (d < acc.min) {
        acc.min = d;
        acc.color = c;
      }

      return acc;
    },
    {
      min: Number.MAX_SAFE_INTEGER,
      color: "",
    }
  );

  return {
    color: `#${result.color}`,
    name: colorMap[result.color],
  };
}

/*
 * Generate color details
 */
export function generateColorDetails(hexval: string): ColorDetails {
  const hex = `#${hexval}`;
  if (isValidHexCode(hex)) {
    const closestColor = findClosestColor(hex);
    const isExact = closestColor.color.toLowerCase() === hex.toLowerCase();
    const color = Color(hex);

    const normalize = closestColor.name.normalize("NFD");
    const removeSpecialChars = normalize.replace(
      /[\u0300-\u036f-&/\\#,+()$~%.'":*?<>{}]/g,
      ""
    );

    const convertSpaceToHyphen = removeSpecialChars
      .replace(/\s+/g, "-")
      .toLowerCase();

    return {
      id: Math.ceil(Math.random() * 10),
      requested: hex,
      returned: closestColor.color,
      isExact,
      name: closestColor.name,
      rgb: color.rgb().array(),
      variable: convertSpaceToHyphen,
    };
  } else {
    return { requested: hexval, message: `Invalid hex code` };
  }
}

export { isValidHexCode, hexToRGB, findClosestColor };
