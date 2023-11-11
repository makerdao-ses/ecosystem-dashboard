import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { DeliverableViewMode } from '../ProjectCard/ProjectCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface DeliverableViewModeToggleProps {
  deliverableViewMode: DeliverableViewMode;
  onChangeDeliverableViewMode: (deliverableViewMode: DeliverableViewMode) => void;
}

const DeliverableViewModeToggle: React.FC<DeliverableViewModeToggleProps> = ({
  deliverableViewMode,
  onChangeDeliverableViewMode,
}) => {
  const { isLight } = useThemeContext();

  return (
    <ViewModeContainer>
      <Button
        isLight={isLight}
        active={deliverableViewMode === 'compacted'}
        onClick={() => onChangeDeliverableViewMode('compacted')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3.6C3 3.26863 3.26863 3 3.6 3H9.9C10.2314 3 10.5 3.26863 10.5 3.6V9.9C10.5 10.2314 10.2314 10.5 9.9 10.5H3.6C3.26863 10.5 3 10.2314 3 9.9V3.6Z" />
          <path d="M13.5 3.6C13.5 3.26863 13.7686 3 14.1 3H20.4C20.7314 3 21 3.26863 21 3.6V9.9C21 10.2314 20.7314 10.5 20.4 10.5H14.1C13.7686 10.5 13.5 10.2314 13.5 9.9V3.6Z" />
          <path d="M3 14.1C3 13.7686 3.26863 13.5 3.6 13.5H9.9C10.2314 13.5 10.5 13.7686 10.5 14.1V20.4C10.5 20.7314 10.2314 21 9.9 21H3.6C3.26863 21 3 20.7314 3 20.4V14.1Z" />
          <path d="M13.5 14.1C13.5 13.7686 13.7686 13.5 14.1 13.5H20.4C20.7314 13.5 21 13.7686 21 14.1V20.4C21 20.7314 20.7314 21 20.4 21H14.1C13.7686 21 13.5 20.7314 13.5 20.4V14.1Z" />
        </svg>
      </Button>
      <Button
        isLight={isLight}
        active={deliverableViewMode === 'detailed'}
        onClick={() => onChangeDeliverableViewMode('detailed')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.59922 7.79961C9.59922 7.46824 9.86785 7.19961 10.1992 7.19961H19.7992C20.1306 7.19961 20.3992 7.46824 20.3992 7.79961V8.99961C20.3992 9.33098 20.1306 9.59961 19.7992 9.59961H10.1992C9.86785 9.59961 9.59922 9.33098 9.59922 8.99961V7.79961ZM9.59922 4.19961C9.59922 3.86824 9.86785 3.59961 10.1992 3.59961H22.1992C22.5306 3.59961 22.7992 3.86824 22.7992 4.19961V5.39961C22.7992 5.73098 22.5306 5.99961 22.1992 5.99961H10.1992C9.86785 5.99961 9.59922 5.73098 9.59922 5.39961V4.19961ZM1.19922 4.19961C1.19922 3.86824 1.46785 3.59961 1.79922 3.59961H7.79922C8.13059 3.59961 8.39922 3.86824 8.39922 4.19961V10.1996C8.39922 10.531 8.13059 10.7996 7.79922 10.7996H1.79922C1.46785 10.7996 1.19922 10.531 1.19922 10.1996V4.19961ZM9.59922 17.3996C9.59922 17.0682 9.86785 16.7996 10.1992 16.7996H19.7992C20.1306 16.7996 20.3992 17.0682 20.3992 17.3996V18.5996C20.3992 18.931 20.1306 19.1996 19.7992 19.1996H10.1992C9.86785 19.1996 9.59922 18.931 9.59922 18.5996V17.3996ZM9.59922 13.7996C9.59922 13.4682 9.86785 13.1996 10.1992 13.1996H22.1992C22.5306 13.1996 22.7992 13.4682 22.7992 13.7996V14.9996C22.7992 15.331 22.5306 15.5996 22.1992 15.5996H10.1992C9.86785 15.5996 9.59922 15.331 9.59922 14.9996V13.7996ZM1.19922 13.7996C1.19922 13.4682 1.46785 13.1996 1.79922 13.1996H7.79922C8.13059 13.1996 8.39922 13.4682 8.39922 13.7996V19.7996C8.39922 20.131 8.13059 20.3996 7.79922 20.3996H1.79922C1.46785 20.3996 1.19922 20.131 1.19922 19.7996V13.7996Z" />
        </svg>
      </Button>
    </ViewModeContainer>
  );
};

export default DeliverableViewModeToggle;

const ViewModeContainer = styled.div({
  display: 'flex',
  gap: 8,
});

const Button = styled.div<WithIsLight & { active: boolean }>(({ isLight, active }) => ({
  display: 'flex',
  cursor: 'pointer',

  '& path': {
    fill: active ? (isLight ? '#546978' : '#D1DEE6') : isLight ? '#D1DEE6' : '#546978',
  },
}));
