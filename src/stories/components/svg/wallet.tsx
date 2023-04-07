import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const Wallet: React.FC<Props> = ({ fill = '#231536', width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5 11.875C12.5 10.8395 13.3395 10 14.375 10C15.4105 10 16.25 10.8395 16.25 11.875C16.25 12.9105 15.4105 13.75 14.375 13.75C13.3395 13.75 12.5 12.9105 12.5 11.875Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.125 0C1.39911 0 0 1.39911 0 3.125C0 3.25485 0.00792505 3.38285 0.0233001 3.50854C0.00801255 3.58666 0 3.6674 0 3.75V17.5C0 18.8808 1.11929 20 2.5 20H17.5C18.8808 20 20 18.8808 20 17.5V6.25C20 4.86929 18.8808 3.75 17.5 3.75H16.25V1.25C16.25 0.55965 15.6904 0 15 0H3.125ZM13.75 2.5H3.125C2.77982 2.5 2.5 2.77982 2.5 3.125C2.5 3.47018 2.77982 3.75 3.125 3.75H13.75V2.5ZM2.5 6.25V17.5H17.5V6.25H2.5Z"
      fill={fill}
    />
  </svg>
);

export default Wallet;
