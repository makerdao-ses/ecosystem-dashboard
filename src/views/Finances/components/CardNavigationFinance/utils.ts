export const truncateDescription = (description: string, wordLimit = 15) => {
  const words = description.split(' ');
  if (words.length > wordLimit) {
    return `${words.slice(0, wordLimit).join(' ')}...`;
  }
  return description;
};
