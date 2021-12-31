let id = 0;
export function uniqueId() {
  return (id++).toString();
}


/**
 * Converts a RMF coordinate to SVG
 * @param pos
 */
 export function fromRmfCoords(pos) {
  return [pos[0], -pos[1]];
}