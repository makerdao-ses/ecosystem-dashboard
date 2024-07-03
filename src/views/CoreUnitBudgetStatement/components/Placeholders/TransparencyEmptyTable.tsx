import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { MAKER_BURN_LINK } from '@ses/core/utils/const';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';

interface TransparencyEmptyTableProps {
  breakdown?: boolean;
  longCode: string;
  shortCode: string;
  resource?: ResourceType;
}

// TODO: move this component to the global components folder as it is going to be reused in other places
export const TransparencyEmptyTable: React.FC<TransparencyEmptyTableProps> = ({
  breakdown = false,
  longCode,
  shortCode,
  resource = ResourceType.CoreUnit,
}) => {
  const { isLight } = useThemeContext();
  const isTable = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  let title: string;
  switch (resource) {
    case ResourceType.Delegates:
      title = 'No data reported by the Delegates Administrator';
      break;
    case ResourceType.EcosystemActor:
      title = `No data reported by ${shortCode} Ecosystem Actor`;
      break;
    default:
      // handle as a core unit
      title = `No data reported by ${shortCode} Core Unit`;
  }

  return (
    <>
      <Wrapper>
        {!breakdown ? (
          <Container isLight={isLight}>
            <Row>
              <CellBlock
                style={{
                  marginRight: '111px',
                }}
              />
              <CellBlock />
              <CellBlock />
              <CellBlock />
              <CellBlock />
              <CellBlock />
            </Row>
            <Line isLight={isLight} />
            {new Array(3).fill('').map((_, i) => (
              <Row key={`key-${i}`} style={{ marginBottom: i === 2 ? '17px' : '30px' }}>
                <Row
                  style={{
                    gap: '0',
                    maxWidth: '238px',
                  }}
                >
                  <CellBlock
                    style={{
                      borderRadius: '50%',
                      minWidth: '42px',
                      maxWidth: '42px',
                      height: '42px',
                      marginRight: '5px',
                    }}
                  />
                  <div
                    style={{
                      marginRight: '20px',
                      maxWidth: '126px',
                      minWidth: '126px',
                      width: '100%',
                    }}
                  >
                    <CellBlock
                      style={{
                        height: '22px',
                        marginBottom: '6px',
                        marginRight: '0',
                      }}
                    />
                    <CellBlock
                      style={{
                        height: '16px',
                        marginRight: '0',
                      }}
                    />
                  </div>
                </Row>
                <CellBlock />
                <CellBlock />
                <CellBlock />
                <CellBlock />
                <CellBlock
                  style={{
                    maxWidth: '262px',
                  }}
                />
              </Row>
            ))}
            <Row>
              <CellBlock
                style={{
                  marginRight: '111px',
                }}
              />
              <CellBlock />
              <CellBlock />
              <CellBlock />
              <CellBlock />
              <CellBlock
                style={{
                  maxWidth: '262px',
                }}
              />
            </Row>
          </Container>
        ) : (
          <Container isLight={isLight}>
            <Row>
              <CellBlock
                style={{
                  maxWidth: '137px',
                  minWidth: '137px',
                  marginRight: '151px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '105px',
                  marginRight: '55px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '106px',
                  marginRight: '54px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '105px',
                  marginRight: '21px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '109px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '109px',
                  marginRight: '188px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '126px',
                }}
              />
            </Row>
            <Line isLight={isLight} />
            <Row style={{ marginBottom: '26px' }}>
              <CellBlock
                style={{
                  maxWidth: '230px',
                  height: '20px',
                }}
              />
            </Row>
            <Row
              style={{
                justifyContent: 'space-between',
                marginBottom: '34px',
              }}
            >
              <CellBlock
                style={{
                  maxWidth: '137px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '190px',
                }}
              />
            </Row>

            <Row
              style={{
                marginBottom: '4px',
              }}
            >
              <CellBlock
                style={{
                  maxWidth: '230px',
                  height: '20px',
                }}
              />
            </Row>

            <Row
              style={{
                marginBottom: '10px',
              }}
            >
              <CellBlock
                style={{
                  width: '79px',
                  height: '20px',
                }}
              />
            </Row>

            <Row style={{ marginBottom: '18px' }}>
              <CellBlock
                style={{
                  maxWidth: '158px',
                  marginRight: '116px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '199px',
                  marginRight: '37px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '180px',
                }}
              />
            </Row>

            <Row>
              <CellBlock
                style={{
                  maxWidth: '114px',
                  marginRight: '160px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  marginRight: '24px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '199px',
                  marginRight: '37px',
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '180px',
                }}
              />
            </Row>
          </Container>
        )}
        <ContainerIndications>
          <Title>{title}</Title>

          <Description>View On-Chain transfers on makerburn.com </Description>

          <ContainerButton>
            <LinkButton
              href={
                resource === ResourceType.Delegates
                  ? 'https://makerburn.com/#/expenses/core-units/DELEGATES'
                  : `${MAKER_BURN_LINK}/${longCode}`
              }
              label="Go to Makerburn"
              styleText={{
                fontSize: '16px',
                lineHeight: '19px',
                borderRadius: '22px',
              }}
              buttonType={ButtonType.Default}
              style={{
                padding: '14px 61px 14px 60px',
              }}
              allowsHover={!isTable}
            />
          </ContainerButton>
        </ContainerIndications>
      </Wrapper>
      <MobileWrapper breakdown={breakdown}>
        {!breakdown ? (
          <Container isLight={isLight}>
            <Row
              style={{
                gap: '0',
                maxWidth: '238px',
              }}
            >
              <CellBlock
                style={{
                  borderRadius: '50%',
                  minWidth: '42px',
                  maxWidth: '42px',
                  height: '42px',
                  marginRight: '5px',
                }}
              />
              <div
                style={{
                  marginRight: '20px',
                  maxWidth: '126px',
                  minWidth: '126px',
                  width: '100%',
                  marginBottom: '21px',
                }}
              >
                <CellBlock
                  style={{
                    height: '22px',
                    marginBottom: '6px',
                    marginRight: '0',
                  }}
                />
                <CellBlock
                  style={{
                    height: '16px',
                    marginRight: '0',
                  }}
                />
              </div>
            </Row>
            {new Array(4).fill('').map((_, i) => (
              <Row
                key={`key-${i}`}
                style={{
                  justifyContent: 'space-between',
                }}
              >
                <CellBlock
                  style={{
                    maxWidth: '105px',
                    height: '24px',
                    marginBottom: i === 3 ? 0 : '15px',
                    borderRadius: 0,
                  }}
                />
                <CellBlock
                  style={{
                    maxWidth: '105px',
                    height: '24px',
                    borderRadius: 0,
                    marginBottom: i === 3 ? 0 : '15px',
                    marginRight: 0,
                  }}
                />
              </Row>
            ))}
          </Container>
        ) : (
          <Container isLight={isLight}>
            <Row>
              <CellBlock
                style={{
                  maxWidth: '152px',
                  height: '24px',
                  marginBottom: '18px',
                  borderRadius: 0,
                }}
              />
            </Row>
            {new Array(3).fill('').map((_, i) => (
              <Row
                key={`key-${i}`}
                style={{
                  justifyContent: 'space-between',
                }}
              >
                <CellBlock
                  style={{
                    maxWidth: '105px',
                    height: '24px',
                    borderRadius: 0,
                  }}
                />
                <CellBlock
                  style={{
                    maxWidth: '105px',
                    height: '24px',
                    borderRadius: 0,
                    marginRight: '0',
                  }}
                />
              </Row>
            ))}
            <Row
              style={{
                marginBottom: '15px',
                justifyContent: 'space-between',
              }}
            >
              <CellBlock
                style={{
                  maxWidth: '105px',
                  height: '24px',
                  marginRight: '23px',
                  borderRadius: 0,
                }}
              />
              <CellBlock
                style={{
                  maxWidth: '167px',
                  height: '24px',
                  borderRadius: 0,
                  marginRight: '0',
                }}
              />
            </Row>
          </Container>
        )}
        <ContainerIndications>
          <TitleMobile>{title}</TitleMobile>

          <Description>View On-Chain transfers on makerburn.com </Description>
          <ContainerButton>
            <LinkButton
              href={
                resource === ResourceType.Delegates
                  ? 'https://makerburn.com/#/expenses/core-units/DELEGATES'
                  : `${MAKER_BURN_LINK}/${longCode}`
              }
              label="Go to Makerburn"
              styleText={{
                fontSize: '16px',
                lineHeight: '19px',
                borderRadius: '22px',
                height: 'none',
              }}
              style={{
                padding: '8px 24px',
              }}
              allowsHover={!isTable}
            />
          </ContainerButton>
        </ContainerIndications>
      </MobileWrapper>
    </>
  );
};

const MobileWrapper = styled.div<{ breakdown: boolean }>(({ breakdown = false }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  height: breakdown ? '215px' : '253px',

  '@media (min-width: 834px)': {
    display: 'none',
  },
}));

const Wrapper = styled.div({
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: '329px',
  width: '100%',

  '@media (min-width: 834px)': {
    display: 'flex',
  },
});

const ContainerIndications = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const ContainerButton = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: '44px',
  zIndex: 1,
  '@media (min-width: 834px)': {
    marginBottom: '86px',
  },
});

const Title = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: '#9FAFB9',
  marginTop: '46px',
  marginRight: '46px',
  zIndex: 1,
  '@media (min-width: 834px)': {
    fontSize: '32px',
    lineHeight: '39px',
  },
});

const TitleMobile = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: '#9FAFB9',
  paddingLeft: '19px',
  paddingRight: '14px',
  paddingTop: '49px',
  zIndex: 1,
  '@media (min-width: 834px)': {
    fontSize: '32px',
    lineHeight: '39px',
  },
});

const Description = styled.p({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#9FAFB9',
  paddingLeft: '19px',
  marginTop: '24px',
  flex: 1,
  zIndex: 1,
  '@media (min-width: 834px)': {
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '27px',
    textAlign: 'center',
    letterSpacing: '0.4px',
    marginTop: '32px',
  },
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'block',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  padding: '16px 0px 13px 16px',
  '@media (max-width: 833px)': {
    boxSizing: 'border-box',
    padding: '16px 24px',
    background: isLight ? 'white' : 'black',
    borderRadius: '6px',
    filter: isLight
      ? 'drop-shadow(0px 20px 40px rgba(219, 227, 237, 0.4)) drop-shadow(0px 1px 3px rgba(190, 190, 190, 0.25))'
      : 'none',
  },
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: isLight
      ? 'radial-gradient(white, rgba(255,255,255, 1), rgba(255,255,255,0.9), rgba(255,255,255,0.8), rgba(255,255,255,0.4))'
      : 'radial-gradient(black, rgba(16, 25, 31,0.9) 60%, rgba(16, 25, 31,0.9) 40%, rgba(16, 25, 31,0.9) 40%, rgba(16, 25, 31,0.1))',
    backgroundRepeat: 'no-repeat',
  },
}));

const Row = styled.div({
  display: 'flex',
  flex: 1,
});

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  height: '1px',
  width: '100%',
  margin: '14px -16px',
  background: isLight ? '#D4D9E1' : '#405361',
}));

const CellBlock = styled.div({
  boxSizing: 'border-box',
  display: 'flex',
  width: '100%',
  flex: 1,
  maxWidth: '126px',
  height: '32px',
  background: 'rgba(45, 193, 177, 0.4)',
  borderRadius: '6px',
  marginRight: '32px',
  '@media (max-width: 833px)': {
    marginBottom: '15px',
  },
});
