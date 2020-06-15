const colors = require('./../data/colors.json');
const Color = require('color');

/* 
 * Validate color input 
 */
function isValidHexCode(hex) {
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
  return (hex & (hex.length < 7) || !regex.test(hex)) ? false : true;
}

/* 
 * Convert HEX color to RGB
 */
function hexToRGB(hex) {
  if (isValidHexCode(hex) !== true) {
    return 'false';
  }

  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }

  let values = hex.split(''),
    r,
    g,
    b;

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
function findClosestColor(color) {
  let closestColor = null;
  const { r, g, b } = hexToRGB(color);
  const result = Object.keys(colors).reduce((acc, c) => {
    const { r: cr, g: cg, b: cb } = hexToRGB(`#${c}`);
    const rd = r - cr;
    const gd = g - cg;
    const bd = b - cb;
    const d = Math.sqrt((rd * rd) + (gd * gd) + (bd * bd));

    if (d < acc.min) {
      acc.min = d;
      acc.color = c;
    }

    return acc;
  }, {
    min: Number.MAX_SAFE_INTEGER,
    color: null,
  });
  closestColor = result.color;

  return {
    color: `#${closestColor}`,
    name: colors[closestColor],
  };
}

/* 
 * Generate color details
 */
function generateColorDetails(hex) {
  if (isValidHexCode(hex)) {
    let closestColor = findClosestColor(hex);
    let isExact = (closestColor.color === hex) ? true : false;
    let color = Color(hex);

    let normalize = closestColor.name.normalize('NFD');
    let removeSpecialChars = normalize.replace(/[\u0300-\u036f]/g, "");

    let convertSpaceToHyphen = removeSpecialChars.replace(/\s+/g, '-').toLowerCase();
    // let removeSpecialChars = convertSpaceToHyphen.replace(/[^a-zA-Z0-9-]/g, "");

    return {
      requested: hex,
      returned: closestColor.color,
      isExact,
      name: closestColor.name,
      rgb: color.rgb().array(),
      variable: convertSpaceToHyphen,
    }
  } else {
    return { message: `Invalid hex code` }
  }
}

module.exports = {
  isValidHexCode: isValidHexCode,
  hexToRGB: hexToRGB,
  findClosestColor: findClosestColor,
  generateColorDetails: generateColorDetails
};