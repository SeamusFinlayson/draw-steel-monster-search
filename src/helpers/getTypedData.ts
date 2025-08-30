export default async function getTypedData<T>(
  url: string,
  typeGuard: (json: unknown) => T
): Promise<T> {
  const response = await fetch(url);
  const json = await response.json();
  return typeGuard(json);
}
