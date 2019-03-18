export class HSLColor {
  hue: number;
  saturation: number;
  lightness: number;

  constructor(h, s, l) {
    this.hue = h;
    this.saturation = s;
    this.lightness = l;
  }

  toString() {
    return `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`;
  }

  static getLightened(color: HSLColor) {
    // bound the transform so that it only produces valid colors
    return new HSLColor(color.hue, Math.max(color.saturation - 15, 0), Math.min(color.lightness + 10, 90));
  }

  static getDarkened(color: HSLColor) {
    return new HSLColor(color.hue, Math.min(color.saturation + 15, 100), Math.max(color.lightness - 15, 50));
  }

}
