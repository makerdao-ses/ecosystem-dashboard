import { DateTime } from 'luxon';

export const useTransparencyAudit = () => {
  const getDate = (timestamp: string) => DateTime.fromSeconds(Number(timestamp) / 1000).toFormat('dd-MMM-y');

  const getTime = (timestamp: string) => DateTime.fromSeconds(Number(timestamp) / 1000).toFormat('hh:mm');

  const getFilenameFromUrl = (url: string) => {
    if (!url) return '';
    const parts = url.split('/');

    return parts[parts.length - 1];
  };

  return {
    getDate,
    getTime,
    getFilenameFromUrl,
  };
};
