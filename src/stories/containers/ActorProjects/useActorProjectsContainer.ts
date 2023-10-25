import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

const useActorProjectsContainer = () => {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, router.query.code as string);

  const statuses = [
    {
      id: '1',
      content: 'To Do',
      count: 1,
    },
    {
      id: '2',
      content: 'In Progress',
      count: 1,
    },
    {
      id: '3',
      content: 'Done',
      count: 1,
    },
  ] as MultiSelectItem[];

  const [activeStatuses, setActiveStatuses] = useState<string[]>([]);
  const handleStatusChange = (items: string[]) => {
    setActiveStatuses(items);
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearchChange = (value: string) => {
    console.log('>>>', value);
    setSearchQuery(value);
  };

  const handleResetFilters = () => {
    setActiveStatuses([]);
    setSearchQuery('');
  };

  return {
    ref,
    height,
    showHeader,
    isLight,
    statuses,
    activeStatuses,
    handleStatusChange,
    searchQuery,
    handleSearchChange,
    handleResetFilters,
  };
};

export default useActorProjectsContainer;
