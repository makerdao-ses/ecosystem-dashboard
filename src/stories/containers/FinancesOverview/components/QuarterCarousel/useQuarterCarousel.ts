import { useThemeContext } from '@ses/core/context/ThemeContext';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { isQuarter4, parseQuarter } from '../../utils/quarters';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type SwiperCore from 'swiper';
import type { SwiperProps } from 'swiper/react';

const useQuarterCarousel = (quarters: ExpenseDto[]) => {
  const { isLight } = useThemeContext();
  const [showDivider, setShowDivider] = useState<boolean>(false);

  const handleDivider = (swiper: SwiperCore) => {
    const slidesOnScreen = (swiper.params.slidesPerView as number) - 1;
    let canShowDivider = false;

    for (let i = swiper.activeIndex; i < swiper.activeIndex + slidesOnScreen; i++) {
      if (i < quarters.length && isQuarter4(quarters[i].period)) {
        canShowDivider = true;
        break;
      }
    }

    setShowDivider(canShowDivider);
  };

  const moveToRightQuarter = (swiper: SwiperCore) => {
    const currentDate = DateTime.now();
    const currentQuarter = currentDate.quarter;

    const monthOfQuarter = ((currentDate.month - 1) % 3) + 1;
    const shouldShowCurrentQuarter = monthOfQuarter === 2 || monthOfQuarter === 3;
    const index = quarters.findIndex((expense) => {
      const [year, quarter] = parseQuarter(expense.period);
      const targetYear = shouldShowCurrentQuarter
        ? currentDate.year
        : currentQuarter === 1
        ? currentDate.year - 1
        : currentDate.year;
      const targetQuarter = shouldShowCurrentQuarter ? currentQuarter : currentQuarter === 1 ? 4 : currentQuarter - 1;
      return year === targetYear && quarter === targetQuarter;
    });
    let targetIndex = quarters.length - 1; // last quarter by default
    if (index !== -1) {
      const newIndex = index - ((swiper.params.slidesPerView as number) ?? 2) + 1;
      targetIndex = newIndex >= 0 ? newIndex : targetIndex;
    }
    swiper.slideTo(targetIndex, 0);

    handleDivider(swiper);
  };

  const swiperOptions = {
    spaceBetween: 0,
    slidesPerView: 2,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
    onActiveIndexChange: (swiper: SwiperCore) => handleDivider(swiper),
    onAfterInit: (swiper: SwiperCore) => moveToRightQuarter(swiper),
    onBreakpoint: (swiper: SwiperCore) => moveToRightQuarter(swiper),
    onSliderMove: () => setShowDivider(true),
    onTouchEnd: (swiper: SwiperCore) => handleDivider(swiper),
  } as SwiperProps;

  return {
    swiperOptions,
    showDivider,
    isLight,
  };
};

export default useQuarterCarousel;
