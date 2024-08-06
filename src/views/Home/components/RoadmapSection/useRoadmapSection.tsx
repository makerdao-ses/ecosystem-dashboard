import { useLayoutEffect, useRef, useState } from 'react';

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

  const coordinatorsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    coordinatorsRef.current.sort(
      (prevDiv: HTMLDivElement, nextDiv: HTMLDivElement) => nextDiv.clientHeight - prevDiv.clientHeight
    );
    for (const coordinatorDiv of coordinatorsRef.current) {
      coordinatorDiv.style.height = `${coordinatorsRef.current[0].getBoundingClientRect().height}px`;
    }
  });

  return {
    tabs,
    activeRoadmapRef,
    swiperRef,
    activeTab,
    handleActiveTab,
    coordinatorsRef,
  };
};

export default useRoadmapSection;
