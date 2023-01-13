import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const MakerBurn = ({ width = 48, height = 48, ...props }: Props) => (
  <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width={48} height={48} rx={24} fill="#14162C" />
    <circle cx={20.8235} cy={14.4706} r={3.88235} fill="#F57E27" />
    <ellipse cx={25.4117} cy={21.5294} rx={6.35294} ry={6} fill="#F9A52F" />
    <circle cx={23.9999} cy={26.1177} r={7.76471} fill="url(#paint0_linear_2674_14380)" />
    <ellipse cx={23.9999} cy={34.9412} rx={6.35294} ry={3.17647} fill="#FED46F" />
    <circle cx={27.1764} cy={10.2353} r={2.47059} fill="url(#paint1_linear_2674_14380)" />
    <ellipse cx={23.9999} cy={38.8235} rx={2.11765} ry={1.41176} fill="#FEEBBE" />
    <defs>
      <linearGradient
        id="paint0_linear_2674_14380"
        x1={20.4705}
        y1={19.0588}
        x2={26.8235}
        y2={33.8824}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FDE09B" />
        <stop offset={0.302895} stopColor="#FCCA51" />
        <stop offset={1} stopColor="#FBC135" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_2674_14380"
        x1={27.1764}
        y1={6.70589}
        x2={27.1764}
        y2={12.7059}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D06417" stopOpacity={0} />
        <stop offset={1} stopColor="#D06417" />
      </linearGradient>
    </defs>
  </svg>
);

export default MakerBurn;
