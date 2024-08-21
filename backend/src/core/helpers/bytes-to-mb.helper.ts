export const byteToMb = (byte: number): number => {
  return Math.round(byte / 10_000) / 100;
};
