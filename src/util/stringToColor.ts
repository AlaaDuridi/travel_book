export function stringToColor(string: string): string {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
  }

  const hue = hash % 360;
  const saturation = 60 + (hash % 40); // Saturation between 60% and 100%
  const lightness = 40 + (hash % 20); // Lightness between 40% and 60%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
