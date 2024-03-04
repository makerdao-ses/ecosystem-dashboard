import { styled } from '@mui/material';
import React from 'react';

const mobileBarsValues = [
  {
    height: 148,
    percentFilled: 148,
  },
  {
    height: 150,
    percentFilled: 150,
  },
  {
    height: 155,
    percentFilled: 155,
  },
  {
    height: 139,
    percentFilled: 139,
  },
  {
    height: 150,
    percentFilled: 98,
  },
  {
    height: 156,
    percentFilled: 82,
  },
  {
    height: 162,
    percentFilled: 62,
  },
  {
    height: 166,
    percentFilled: 45,
  },
  {
    height: 164,
    percentFilled: 36,
  },
  {
    height: 162,
    percentFilled: 23,
  },
  {
    height: 169,
    percentFilled: 15,
  },
  {
    height: 168,
    percentFilled: 7,
  },
];
const tabletBarsValues = [
  {
    height: 297,
    percentFilled: 297,
  },
  {
    height: 296,
    percentFilled: 296,
  },
  {
    height: 299,
    percentFilled: 299,
  },
  {
    height: 274,
    percentFilled: 274,
  },
  {
    height: 296,
    percentFilled: 192,
  },
  {
    height: 306,
    percentFilled: 160,
  },
  {
    height: 316,
    percentFilled: 124,
  },
  {
    height: 332,
    percentFilled: 101,
  },
  {
    height: 338,
    percentFilled: 70,
  },
  {
    height: 345,
    percentFilled: 50,
  },
  {
    height: 353,
    percentFilled: 30,
  },
  {
    height: 376,
    percentFilled: 16,
  },
];

const BarSkeletonItems: React.FC = () => (
  <ContainerBars>
    <Mobile>
      {mobileBarsValues.map((item, index) => (
        <WrapperBox height={item.height} key={index}>
          <InsideBox height={item.percentFilled} />
        </WrapperBox>
      ))}
    </Mobile>
    <Table>
      {tabletBarsValues.map((item, index) => (
        <WrapperBox height={item.height} key={index}>
          <InsideBox height={item.percentFilled} />
        </WrapperBox>
      ))}
    </Table>
  </ContainerBars>
);
export default BarSkeletonItems;

const ContainerBars = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  gap: 10,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 13,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
}));
const WrapperBox = styled('div')<{ height: number }>(({ theme, height }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  backgroundColor: theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E',
  width: 16,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  overflow: 'hidden',
  height,

  [theme.breakpoints.up('tablet_768')]: {
    width: 40,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 56,
  },
}));

const InsideBox = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#D1DEE6' : '#47616f80',
  width: 16,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  position: 'absolute',
  height,
  [theme.breakpoints.up('tablet_768')]: {
    width: 40,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 56,
  },
}));

const Mobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  gap: 10,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Table = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 13,
  },

  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 24,
  },
}));
