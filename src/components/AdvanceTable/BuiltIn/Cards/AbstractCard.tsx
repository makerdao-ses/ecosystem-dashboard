import Card from '@/components/Card/Card';

interface AbstractCardProps extends React.PropsWithChildren {
  className?: string;
}

const AbstractCard: React.FC<AbstractCardProps> = ({ children, className }) => (
  <Card className={className}>{children}</Card>
);

export default AbstractCard;
