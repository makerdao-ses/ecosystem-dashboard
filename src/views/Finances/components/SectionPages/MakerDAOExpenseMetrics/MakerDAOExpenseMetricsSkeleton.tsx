import { Skeleton, styled, useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { Fragment } from 'react';
import type { Theme } from '@mui/material';

const MakerDAOExpenseMetricsSkeleton: React.FC = () => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const fill = isLight ? '#fff' : '#000';
  const stroke = isLight ? '#D1DEE6' : '#546978';

  const yAxisLabelHeight = isMobile ? 8.75 : 12.25;

  return (
    <SectionContainer>
      <LinesContainer>
        {isMobile ? (
          <svg width="294" height="154" viewBox="0 0 294 154" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.5 149L30.5 138L56.5 140.5L82.5 137.5L108.5 127.5L134.5 133L160.5 130L186.5 127.5L212 110L238.5 117.5L264.5 116L290.5 123"
              stroke={stroke}
            />
            <circle cx="31" cy="137.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="56" cy="140.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="137.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="109" cy="127.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="135" cy="133.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="161" cy="129.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="187" cy="127.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="212" cy="110.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="239" cy="117.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="265" cy="115.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="290" cy="123.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="4" cy="149.5" r="3.5" fill={fill} stroke={stroke} />
            <path
              d="M4.5 98L30.5 105L56.5 90.5L82.5 94.5L108.5 89.5L134.5 80L160.5 95L186.5 92.5L212 96L238.5 92.5L264.5 86L290.5 69"
              stroke={stroke}
            />
            <circle cx="31" cy="104.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="56" cy="90.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="93.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="109" cy="88.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="135" cy="79.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="161" cy="94.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="187" cy="92.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="212" cy="95.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="239" cy="91.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="265" cy="84.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="290" cy="69.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="4" cy="96.5" r="3.5" fill={fill} stroke={stroke} />
            <path
              d="M4.5 80L30.5 82L56.5 58.5L82.5 69.5L108.5 48.5L134.5 67L160.5 60L186.5 52.5L212 67L238.5 73.5L264.5 72L290.5 46"
              stroke={stroke}
            />
            <circle cx="31" cy="81.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="56" cy="58.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="68.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="109" cy="48.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="135" cy="67.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="161" cy="59.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="187" cy="52.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="212" cy="67.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="239" cy="73.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="265" cy="71.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="290" cy="46.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="4" cy="79.5" r="3.5" fill={fill} stroke={stroke} />
            <path
              d="M4.5 89L30.5 71L56.5 50.5L82.5 48.5L108.5 27.5L134.5 31L160.5 45L186.5 38.5L212 84L238.5 59.5L264.5 42L290.5 28"
              stroke={stroke}
            />
            <circle cx="31" cy="70.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="56" cy="50.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="48.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="109" cy="27.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="135" cy="31.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="161" cy="44.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="187" cy="39.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="212" cy="82.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="239" cy="59.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="265" cy="41.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="290" cy="28.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="4" cy="89.5" r="3.5" fill={fill} stroke={stroke} />
            <path
              d="M4.5 33L30.5 35L56.5 25.5L82.5 29.5L108.5 23.5L134.5 16L160.5 30L186.5 21.5L212 29L238.5 24.5L264.5 19L290.5 5"
              stroke={stroke}
            />
            <circle cx="31" cy="34.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="56" cy="25.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="29.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="109" cy="22.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="135" cy="15.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="161" cy="29.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="187" cy="21.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="212" cy="28.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="239" cy="24.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="265" cy="18.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="290" cy="4.5" r="3.5" fill={fill} stroke={stroke} />
            <circle cx="4" cy="32.5" r="3.5" fill={fill} stroke={stroke} />
          </svg>
        ) : isTablet ? (
          <svg width="630" height="295" viewBox="0 0 630 295" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.99952 194L61.9995 200.5L116 179.5L170 183.125L224 174L278 158L332 183.125L386 175L440 183L494 177L548 165.5L602 139"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="194" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="62" cy="200" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="116" cy="179" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="170" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="224" cy="174" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="278" cy="158" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="332" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="386" cy="175" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="440" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="494" cy="177" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="548" cy="165" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="601.734" cy="138" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99953 154L61.9995 170.5L116 119.5L170 133.125L224 93.9998L278 128L332 113.125L386 94.9998L440 133L494 147L548 145.5L602 79"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="153" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="62" cy="170" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="116" cy="119" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="170" cy="133" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="224" cy="94" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="278" cy="127" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="332" cy="113" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="386" cy="95" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="440" cy="132" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="494" cy="147" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="548" cy="145" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="601.734" cy="79" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99953 174L61.9995 140.5L116 99.4999L170 93.1249L224 54L278 57.9999L332 93.1249L386 75L440 153L494 107L548 85.5L602 59.0001"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="174" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="62" cy="140" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="116" cy="99" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="170" cy="92" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="224" cy="54" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="278" cy="58" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="332" cy="92" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="386" cy="75" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="440" cy="152" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="494" cy="107" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="548" cy="85" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="601.734" cy="59" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99952 63.9996L61.9995 70.4998L116 49.4997L170 53.1248L224 43.9998L278 27.9998L332 53.1248L386 44.9998L440 52.9998L494 46.9998L548 35.4998L602 8.99998"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="64" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="62" cy="70" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="116" cy="49" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="170" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="224" cy="44" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="278" cy="28" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="332" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="386" cy="45" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="440" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="494" cy="47" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="548" cy="35" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="601.734" cy="8" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M8.00378 286.5L62.0038 276L116.004 280.5L170.004 272L224.004 253.5L278.004 264L332.004 255L386.004 249L440.004 228.5L494.004 240L548.004 231L602.004 235.5"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="170" cy="272" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="224" cy="253" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="278" cy="264" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="332" cy="255" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="386" cy="249" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="440" cy="228" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="494" cy="240" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="548" cy="231" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="602" cy="235" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="8" cy="287" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="62" cy="276" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="116" cy="281" r="4.5" fill={fill} stroke={stroke} />
          </svg>
        ) : isDesktop1024 ? (
          <svg width="668" height="295" viewBox="0 0 668 295" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.99952 194L59.9995 200.5L118 179.5L176 183.125L234 174L292 158L350 183.125L408 175L466 183L524 177L582 165.5L640 139"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="194" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="60" cy="200" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="118" cy="179" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="176" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="234" cy="174" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="292" cy="158" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="350" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="175" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="466" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="524" cy="177" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="582" cy="165" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="639.734" cy="138" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99953 154L59.9995 170.5L118 119.5L176 133.125L234 93.9998L292 128L350 113.125L408 94.9998L466 133L524 147L582 145.5L640 79"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="153" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="60" cy="170" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="118" cy="119" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="176" cy="133" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="234" cy="94" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="292" cy="127" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="350" cy="113" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="95" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="466" cy="132" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="524" cy="147" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="582" cy="145" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="639.734" cy="79" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99953 174L59.9995 140.5L118 99.4999L176 93.1249L234 54L292 57.9999L350 93.1249L408 75L466 153L524 107L582 85.5L640 59.0001"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="174" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="60" cy="140" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="118" cy="99" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="176" cy="92" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="234" cy="54" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="292" cy="58" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="350" cy="92" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="75" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="466" cy="152" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="524" cy="107" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="582" cy="85" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="639.734" cy="59" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99952 63.9996L59.9995 70.4998L118 49.4997L176 53.1248L234 43.9998L292 27.9998L350 53.1248L408 44.9998L466 52.9998L524 46.9998L582 35.4998L640 8.99997"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="64" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="60" cy="70" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="118" cy="49" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="176" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="234" cy="44" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="292" cy="28" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="350" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="45" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="466" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="524" cy="47" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="582" cy="35" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="639.734" cy="8" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M8.00385 286.5L60.0038 276L118.004 280.5L176.004 272L234.004 253.5L292.004 264L350.004 255L408.004 249L466.004 228.5L524.004 240L582.004 231L640.004 235.5"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="176" cy="272" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="234" cy="253" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="292" cy="264" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="350" cy="255" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="249" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="466" cy="228" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="524" cy="240" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="582" cy="231" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="640" cy="235" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="8" cy="287" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="60" cy="276" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="118" cy="281" r="4.5" fill={fill} stroke={stroke} />
          </svg>
        ) : (
          <svg width="916" height="295" viewBox="0 0 916 295" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.99952 194L87.9995 200.5L168 179.5L249 183.125L328 174L408 158L488 183.125L568 175L648 183L728 177L808 165.5L888 139"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="194" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="88" cy="200" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="168" cy="179" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="249" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="328" cy="174" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="158" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="488" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="568" cy="175" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="648" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="728" cy="177" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="808" cy="165" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="887.734" cy="138" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99953 154L87.9995 170.5L168 119.5L249 133.125L328 93.9998L408 128L488 113.125L568 94.9998L648 133L728 147L808 145.5L888 79"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="153" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="88" cy="170" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="168" cy="119" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="249" cy="133" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="328" cy="94" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="127" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="488" cy="113" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="568" cy="95" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="648" cy="132" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="728" cy="147" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="808" cy="145" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="887.734" cy="79" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99955 174L87.9995 140.5L168 99.4999L249 93.1249L328 54L408 57.9999L488 93.1249L568 75L648 153L728 107L808 85.4999L888 59.0001"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="174" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="88" cy="140" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="168" cy="99" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="249" cy="92" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="328" cy="54" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="58" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="488" cy="92" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="568" cy="75" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="648" cy="152" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="728" cy="107" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="808" cy="85" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="887.734" cy="59" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99952 63.9996L87.9995 70.4998L168 49.4998L249 53.1248L328 43.9999L408 27.9998L488 53.1248L568 44.9998L648 52.9998L728 46.9998L808 35.4998L888 9"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="64" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="88" cy="70" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="168" cy="49" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="249" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="328" cy="44" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="28" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="488" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="568" cy="45" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="648" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="728" cy="47" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="808" cy="35" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="887.734" cy="8" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M8.00385 286.5L88.0038 276L168.004 280.5L249.004 272L328.004 253.5L408.004 264L488.004 255L567.504 249L648.004 228.5L728.004 240L808.004 231L888.004 235.5"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="249" cy="272" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="328" cy="253" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="264" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="488" cy="255" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="568" cy="249" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="648" cy="228" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="728" cy="240" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="808" cy="231" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="888" cy="235" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="8" cy="287" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="88" cy="276" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="168" cy="281" r="4.5" fill={fill} stroke={stroke} />
          </svg>
        )}
      </LinesContainer>
      <ChartCanvas>
        {Array.from({ length: 4 }).map((_, index) => (
          <Fragment key={index}>
            <HorizontalLineContainer>
              <YAxisLabel>
                <Skeleton variant="rounded" width={isMobile ? 16 : 23} height={yAxisLabelHeight} />
              </YAxisLabel>
              <YLine />
            </HorizontalLineContainer>
            <HorizontalLineContainer>
              <YAxisLabel>
                <Skeleton variant="rounded" width={isMobile ? 25 : 36} height={yAxisLabelHeight} />
              </YAxisLabel>
              <YLine />
            </HorizontalLineContainer>
          </Fragment>
        ))}
        <HorizontalLineContainer>
          <YAxisLabel>
            <Skeleton variant="rounded" width={isMobile ? 16 : 23} height={yAxisLabelHeight} />
          </YAxisLabel>
          <YLine />
        </HorizontalLineContainer>
      </ChartCanvas>
      <XAxisContainer>
        {isMobile &&
          [5, 6, 9, 7, 9, 5, 5, 7, 6, 7, 7, 7].map((width, index) => (
            <XAxisLabel key={index}>
              <Skeleton variant="rounded" width={width} height={7.88} />
            </XAxisLabel>
          ))}
        {!isMobile &&
          [27, 25, 30, 27, 30, 27, 25, 29, 25, 29, 29, 27].map((width, index) => (
            <XAxisLabel key={index}>
              <Skeleton variant="rounded" width={width} height={10.5} />
              <Skeleton variant="rounded" width={34} height={10.5} />
            </XAxisLabel>
          ))}
      </XAxisContainer>
      <YearXAxis>
        <YearBox>
          <Skeleton variant="rounded" width={28} height={13} />
        </YearBox>
      </YearXAxis>

      <LabelsContainer>
        {(isMobile ? [41, 50, 43, 128, 129] : [37, 33, 52, 154, 225]).map((width, index) => (
          <Label key={index}>
            <Skeleton variant="circular" width={isMobile ? 12 : 16} height={isMobile ? 12 : 16} />
            <Skeleton variant="rounded" width={width} height={isMobile ? 10.5 : 14} />
          </Label>
        ))}
      </LabelsContainer>
    </SectionContainer>
  );
};

export default MakerDAOExpenseMetricsSkeleton;

const SectionContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  maxWidth: 343,
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 32,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
    maxWidth: 704,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 770,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1024,
  },
}));

const LinesContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 3,
  right: 6,

  [theme.breakpoints.up('tablet_768')]: {
    top: 6,
    right: -5,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    right: 5,
  },
}));

const ChartCanvas = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 17.3,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 39,
  },
}));

const HorizontalLineContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 7,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 24,
  },
}));

const YAxisLabel = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: 29,
  minWidth: 29,
  marginTop: -1.69,

  [theme.breakpoints.up('tablet_768')]: {
    width: 48,
    minWidth: 48,
  },
}));

const YLine = styled('div')(({ theme }) => ({
  width: '100%',
  height: 1,
  background: theme.palette.mode === 'light' ? '#ECF1F3' : '#1E2C37',
}));

const XAxisContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 10,
  marginTop: 4,
  marginLeft: 38,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 20,
    marginLeft: 70,
    marginTop: 12,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: 85,
    gap: 24,
    paddingRight: 13,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 91,
    paddingRight: 19,
  },
}));

const XAxisLabel = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: 16,
  minWidth: 16,

  [theme.breakpoints.up('tablet_768')]: {
    width: 34,
    minWidth: 34,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4.5,
  },
}));

const YearXAxis = styled('div')(({ theme }) => {
  const border = `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : '#1E2C37'}`;

  return {
    position: 'relative',
    marginTop: 8,
    marginLeft: 40,
    minHeight: 11,
    borderLeft: border,
    borderRight: border,
    borderBottom: border,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,

    [theme.breakpoints.up('tablet_768')]: {
      display: 'none',
    },
  };
});

const YearBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 4,
  left: 'calc(50% - 26px)',
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  width: 52,
  background: theme.palette.mode === 'light' ? '#fff' : '#000',
}));

const LabelsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 24,
  rowGap: 19,
  marginTop: 33.5,

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 668,
    margin: '48px auto 0',
    gap: 55,
    rowGap: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 909,
    width: 909,
    marginLeft: -69.5,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 'auto',
    gap: 72,
  },
}));

const Label = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
}));
