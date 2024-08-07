import { useEffect, useRef, useState } from 'react';

import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { SwiperRef } from 'swiper/react';

const useRoadmapSection = (roadmapsData: Roadmap[]) => {
  const tabs = roadmapsData.map((roadmap) => ({
    id: roadmap.id,
    title: roadmap.title,
  }));

  const activeRoadmapRef = useRef(0);
  const swiperRef = useRef<SwiperRef>(null);

  const [activeTab, setActiveTab] = useState(roadmapsData[0]?.id);
  const handleActiveTab = (tabId: string) => {
    activeRoadmapRef.current = roadmapsData.findIndex((roadmap) => roadmap.id === tabId);
    setActiveTab(tabId);
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(0);
    }
  };

  useEffect(() => {
    const titleContainer = document.getElementsByClassName('title-container');
    const coordinatorsContainer = document.getElementsByClassName('coordinators-container');
    const latestKeyResultsContainer = document.getElementsByClassName('latest-key-results-container');

    const titles = Array.from(titleContainer).sort((prevDiv, nextDiv) => nextDiv.clientHeight - prevDiv.clientHeight);
    const coordinators = Array.from(coordinatorsContainer).sort(
      (prevDiv, nextDiv) => nextDiv.clientHeight - prevDiv.clientHeight
    );
    const latestKeyResults = Array.from(latestKeyResultsContainer).sort(
      (prevDiv, nextDiv) => nextDiv.clientHeight - prevDiv.clientHeight
    );

    for (const titleDiv of titles) {
      (titleDiv as HTMLDivElement).style.minHeight = `${titles[0].getBoundingClientRect().height}px`;
    }
    for (const coordinatorDiv of coordinators) {
      (coordinatorDiv as HTMLDivElement).style.minHeight = `${coordinators[0].getBoundingClientRect().height}px`;
    }
    for (const keyResultDiv of latestKeyResults) {
      (keyResultDiv as HTMLDivElement).style.minHeight = `${latestKeyResults[0].getBoundingClientRect().height}px`;
    }
  }, []);

  return {
    tabs,
    activeRoadmapRef,
    swiperRef,
    activeTab,
    handleActiveTab,
  };
};

export default useRoadmapSection;
