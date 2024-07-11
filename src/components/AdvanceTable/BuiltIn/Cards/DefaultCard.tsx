import AbstractCard from './AbstractCard';
import SectionTitleCard from './SectionTitleCard';
import StandardCard from './StandardCard';
import type { CardConfiguration, RowProps } from '../../types';

interface DefaultCardProps {
  cardProps?: CardConfiguration;
  row?: RowProps;
}

const DefaultCard: React.FC<DefaultCardProps> = ({ cardProps = {}, row }) => {
  const { type = 'normal', render, cardPadding = 'normal' } = cardProps;
  if (render) {
    return render({
      type,
      cells: row?.cells,
      cardPadding,
    });
  }

  switch (type) {
    case 'normal':
    case 'total':
      return <StandardCard cells={row?.cells} type={row?.rowToCardConfig?.type} />;
    case 'title':
    case 'groupTitle':
      return (
        <SectionTitleCard
          title={row?.cells[0].value as string}
          groupTitle={(row?.extraProps as { groupTitle: string })?.groupTitle}
        />
      );
    default:
      return <AbstractCard>default</AbstractCard>;
  }
};

export default DefaultCard;
