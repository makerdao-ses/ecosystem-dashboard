import styled from '@emotion/styled';
import { Box, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import ArrowRight from '../svg/ArrowRight';
interface Props {
  description: string;
  image?: string;
  icon?: string;
  list?: string[];
  title: string;
  titleLinkPage?: string;
  onClick?: () => void;
}

export const NavigationCard = ({
  description,
  image,
  list = [],
  title,
  titleLinkPage = '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}: Props) => (
  <div>
    <ArrowTittleStyle>
      <Typography
        color="#231536"
        fontSize={24}
        lineHeight="29px"
        fontWeight={500}
        letterSpacing="0.4px"
        fontFamily={'Inter, sans-serif'}
      >
        {title}
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography
          textAlign="right"
          fontStyle="normal"
          fontWeight={400}
          fontSize={14}
          color="#231536"
          letterSpacing="0.4px"
          fontFamily={'Inter, sans-serif'}
        >
          {titleLinkPage}
        </Typography>
        <ArrowRight width={16} height={16} style={{ marginLeft: '22px' }} onClick={onClick} />
      </div>
    </ArrowTittleStyle>
    <Box
      sx={{
        height: '293px',
        width: '405px',
        '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
          borderRadius: '6px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
        },
      }}
    >
      <CardContainer
        sx={{
          p: '15px',
        }}
      >
        <FiCardActionArea>
          <FiCardMedia
            sx={{
              borderRadius: '6px',
              padding: '0px',
            }}
            image={image}
          />
          <FiCardContent
            sx={{
              p: '0px',
            }}
          >
            <UnorderedList>
              {list.map((item, index) => (
                <ListItemStyle key={index}>{item}</ListItemStyle>
              ))}
            </UnorderedList>
          </FiCardContent>
        </FiCardActionArea>
        <FiCardActions>
          <TypographyStyle>{description}</TypographyStyle>
        </FiCardActions>
      </CardContainer>
    </Box>
  </div>
);

const CardContainer = styled(Card, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  position: 'relative',
});

const FiCardActionArea = styled(CardActionArea)({
  position: 'relative',
  width: '373px',
});

const FiCardMedia = styled(CardMedia)({
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100%',
  width: '100%',
});

const FiCardContent = styled(CardContent)({
  position: 'relative',
  backgroundColor: 'transparent',
  color: '#ffffff',
});
const FiCardActions = styled(CardActions)({
  position: 'relative',
});

const ListItemStyle = styled.li({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  marginBottom: '19px',
  '&:first-of-type': {
    marginTop: '24px',
  },
  '&:last-child': {
    marginBottom: '24px',
  },
});

const UnorderedList = styled.ul({
  marginTop: '0px',
  marginBottom: '0px',
});

const TypographyStyle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  marginTop: '16px',
  color: '#231536',
});

const ArrowTittleStyle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'end',
  marginBottom: '32px',
});

export default NavigationCard;
