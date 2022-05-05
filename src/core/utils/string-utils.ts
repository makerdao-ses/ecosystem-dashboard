export const getTwoInitials = (name: string) => {
  if (!name) return '';

  name = name.toUpperCase().trim();

  const pieces = name.split(' ');

  return pieces.length > 1 ? pieces[0][0] + pieces[1][0] : pieces[0][0];
};

export const getMipTitle = (title: string) => {
  if (!title) return '';
  const pieces = title.trim().split(':');
  return pieces;
};
