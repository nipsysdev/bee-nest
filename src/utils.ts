export function formatBeeId(id: number): string {
  return `${id}`.padStart(2, '0');
}
