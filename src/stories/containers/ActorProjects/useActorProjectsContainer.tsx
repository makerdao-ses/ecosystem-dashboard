import { useMediaQuery } from '@mui/material';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { ProjectStatus } from '@ses/core/models/interfaces/projects';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import ProjectStatusChip from './components/ProjectStatusChip/ProjectStatusChip';
import type { Theme } from '@mui/material';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { Project } from '@ses/core/models/interfaces/projects';

const useActorProjectsContainer = (projects: Project[]) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, router.query.code as string);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  const [isFilterCollapsedOnMobile, setIsFilterCollapsedOnMobile] = useState<boolean>(true);
  const handleToggleFilterOnMobile = () => setIsFilterCollapsedOnMobile((prev) => !prev);

  const statuses = [
    {
      id: ProjectStatus.TODO,
      content: <ProjectStatusChip status={ProjectStatus.TODO} isSmall />,
      count: projects.filter((project) => project.status === ProjectStatus.TODO).length,
    },
    {
      id: ProjectStatus.INPROGRESS,
      content: <ProjectStatusChip status={ProjectStatus.INPROGRESS} isSmall />,
      count: projects.filter((project) => project.status === ProjectStatus.INPROGRESS).length,
    },
    {
      id: ProjectStatus.FINISHED,
      content: <ProjectStatusChip status={ProjectStatus.FINISHED} isSmall />,
      count: projects.filter((project) => project.status === ProjectStatus.FINISHED).length,
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

  const filteredSupporterProjects = useMemo(
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
    isMobile,
    isFilterCollapsedOnMobile,
    handleToggleFilterOnMobile,
    statuses,
    activeStatuses,
    handleStatusChange,
    searchQuery,
    handleSearchChange,
    handleResetFilters,
    filteredProjects,
    filteredSupporterProjects,
  };
};

export default useActorProjectsContainer;
