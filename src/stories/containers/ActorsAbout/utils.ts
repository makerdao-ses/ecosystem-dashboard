export const removeDuplicateNames = (path: string) => {
  const parts = path.split('/');
  const uniqueParts: string[] = [];

  parts.forEach((part) => {
    if (!uniqueParts.includes(part)) {
      uniqueParts.push(part);
    }
  });

  return uniqueParts.join('/');
};
