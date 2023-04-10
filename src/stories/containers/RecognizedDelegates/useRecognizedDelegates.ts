export const useRecognizedDelegates = () => {
  const totalDAI = Math.trunc(17892312 || 0).toLocaleString('es-US');
  const startMonth = 'Nov 2021';
  const endMonth = 'Jun 2023';

  return {
    totalDAI,
    startMonth,
    endMonth,
  };
};
