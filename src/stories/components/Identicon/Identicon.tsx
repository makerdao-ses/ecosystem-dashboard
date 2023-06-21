import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import makeBlockie from 'ethereum-blockies-base64';
import { useMemo } from 'react';
import type { ReactElement, CSSProperties } from 'react';

export interface IdenticonProps {
  address: string;
  size?: CSSProperties['width'];
  className?: string;
}

const Identicon = ({ address, size, className }: IdenticonProps): ReactElement => {
  const style = useMemo<CSSProperties | null>(() => {
    try {
      const blockie = makeBlockie(address);
      return {
        backgroundImage: `url(${blockie})`,
        ...(size && {
          width: size,
          height: size,
        }),
      };
    } catch (e) {
      return null;
    }
  }, [address, size]);

  return !style ? (
    <Skeleton variant="circular" width={size} height={size} />
  ) : (
    <Icon className={className} style={style} />
  );
};

export default Identicon;

const Icon = styled.div({
  width: 'auto',
  height: '100%',
  borderRadius: '50%',
  backgroundSize: 'cover',
});
