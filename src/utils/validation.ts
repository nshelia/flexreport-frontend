export function isValidConnectionString(str: string) {
  // Updated regular expression to match more variations of SQL Server connection string format
  const regex =
    /Server=[^;]+;(Initial Catalog|Database)=[^;]+;(User ID|User Id)=[^;]+;Password=[^;]+;/i;

  return regex.test(str);
}
