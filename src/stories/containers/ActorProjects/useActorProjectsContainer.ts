import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { ProjectStatus } from '@ses/core/models/interfaces/projects';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { Project } from '@ses/core/models/interfaces/projects';

const useActorProjectsContainer = (projects: Project[]) => {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, router.query.code as string);

  const statuses = [
    {
      id: ProjectStatus.TODO,
      content: 'To Do',
      count: 1,
    },
    {
      id: ProjectStatus.INPROGRESS,
      content: 'In Progress',
      count: 1,
    },
    {
      id: ProjectStatus.FINISHED,
      content: 'Finished',
      count: 1,
    },
  ] as MultiSelectItem[];

  const [activeStatuses, setActiveStatuses] = useState<string[]>([]);
  const handleStatusChange = (items: string[]) => {
    setActiveStatuses(items);
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleResetFilters = () => {
    setActiveStatuses([]);
    setSearchQuery('');
  };

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.title.toLocaleLowerCase().includes(searchQuery) &&
          (activeStatuses.length === 0 || activeStatuses.includes(project.status))
      ),
    [activeStatuses, projects, searchQuery]
  );

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
    filteredProjects,
  };
};

export default useActorProjectsContainer;
