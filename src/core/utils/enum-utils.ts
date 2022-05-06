export const getEnumValuesForSelect = (enumType: any) => {
  const result = Object.values(enumType);

  return result as string[];
};
