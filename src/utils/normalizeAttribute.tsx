export const normalizeAttribute = (attribute: string): string => {
  return attribute.replace(/-([a-z])/g, (_: string, letter: string) =>
    letter.toUpperCase(),
  );
};
