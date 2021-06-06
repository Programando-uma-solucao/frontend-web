export function getContrastColor(hex: string) {
  let hexAux = hex;
  if (hexAux.indexOf('#') === 0) {
    hexAux = hexAux.slice(1);
  }
  if (hexAux.length === 3) {
    hexAux =
      hexAux[0] + hexAux[0] + hexAux[1] + hexAux[1] + hexAux[2] + hexAux[2];
  }
  if (hexAux.length !== 6) {
    throw new Error('Invalid hexAux color.');
  }
  const r = parseInt(hexAux.slice(0, 2), 16);
  const g = parseInt(hexAux.slice(2, 4), 16);
  const b = parseInt(hexAux.slice(4, 6), 16);

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
}
