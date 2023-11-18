export function trimString(input: string, maxLength: number): string {
  if (input.length > maxLength) {
    return input.substring(0, maxLength).trimEnd() + "...";
  }
  return input;
}
