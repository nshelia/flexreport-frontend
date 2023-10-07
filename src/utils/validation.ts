export function isValidConnectionString(str: string) {
  // Regular expression for typical SQL Server connection string format
  const regex = /^Server=[^;]+;Database=[^;]+;User Id=[^;]+;Password=[^;]+;$/i;

  return regex.test(str);
}
