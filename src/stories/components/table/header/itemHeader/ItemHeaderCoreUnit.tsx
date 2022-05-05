import React from 'react';
import ArrowDown from '../../../svg/ArrowDown';
import ArrowUp from '../../../svg/ArrowUp';
import './ItemHeaderCoreUnit.scss';

interface Props {
  title?: string;
  onClick?: () => void;
  isSelectArrowUp?: boolean;
  isSelectArrowDown?: boolean;
  onClickArrowUp?: () => void;
  onClickArrowDow?: () => void;
}
const ItemHeaderCoreUnit = ({
  title = '',
  onClickArrowUp,
  onClickArrowDow,
  isSelectArrowUp = true,
  isSelectArrowDown = true,
}: Props) => {
  return (
    <div className='container'>
      <p className='title'>{title}</p>
      <div className='arrows'>
        <ArrowUp onClick={onClickArrowUp} isSelect={isSelectArrowUp} />
        <ArrowDown onClick={onClickArrowDow} isSelect={isSelectArrowDown} />
      </div>
    </div>
  );
};

export default ItemHeaderCoreUnit;
