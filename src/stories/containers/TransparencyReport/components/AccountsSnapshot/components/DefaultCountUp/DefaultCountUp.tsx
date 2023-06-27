import CountUp from 'react-countup';
import type { CountUpProps } from 'react-countup/build/CountUp';

export default function DefaultCountUp({ duration = 1, preserveValue = true, ...props }: CountUpProps) {
  return <CountUp duration={duration} preserveValue={preserveValue} {...props} />;
}
