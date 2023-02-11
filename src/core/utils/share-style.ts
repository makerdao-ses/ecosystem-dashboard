import { ButtonType } from '@ses/core/enums/button-type.enum';

interface PropsButton {
  textColor?: string;
  textColorDark?: string;
  background?: string;
  backgroundDark?: string;
  borderColor?: string;
  borderColorDark?: string;
  activeColorText?: string;
  activeBackground?: string;
  activeBorderColor?: string;
  activeColorTextDark?: string;
  activeBackgroundDark?: string;
  activeBorderColorDark?: string;
  borderColorMobile?: string;
  borderColorMobileDark?: string;
}

export const customStyles: { [id: string]: PropsButton } = {
  Default: {
    textColor: '#231536',
    textColorDark: '#D2D4EF',
    background: '#FFFFFF',
    backgroundDark: 'transparent',
    borderColor: '#D4D9E1',
    borderColorDark: '#343442',
    activeColorText: '#1AAB9B',
    activeBackground: 'transparent',
    activeBorderColor: '#1AAB9B',
    activeColorTextDark: '#1AAB9B',
    activeBackgroundDark: 'transparent',
    activeBorderColorDark: '#1AAB9B',
    borderColorMobile: '#231536',
    borderColorMobileDark: '#787A9B',
  },
  Primary: {
    textColor: '#1AAB9B',
    textColorDark: '#6EDBD0',
    background: '#E7FCFA',
    backgroundDark: '#06554C',
    borderColor: '#1AAB9B',
    borderColorDark: '#1AAB9B',
    borderColorMobile: '#1AAB9B',
    borderColorMobileDark: '#1AAB9B',
  },
  Secondary: {
    textColor: '#1AAB9B',
    textColorDark: '#1AAB9B',
    background: 'white',
    backgroundDark: 'transparent',
    borderColor: '#1AAB9B',
    borderColorDark: '#1AAB9B',
    borderColorMobile: '#1AAB9B',
    borderColorMobileDark: ' #098C7D',
  },
  Danger: {
    textColor: '#F77249',
    textColorDark: '#FF8237',
    background: 'transparent',
    backgroundDark: 'transparent',
    borderColor: '#F77249',
    borderColorDark: '#FF8237',
    activeColorText: '#F77249',
    activeBackground: '#FDEDE8',
    activeBorderColor: '#F77249',
    activeColorTextDark: '#A83815',
    activeBackgroundDark: '#FDEDE8',
    activeBorderColorDark: '#F77249',
    borderColorMobile: '#F77249',
    borderColorMobileDark: '#FF8237',
  },
};

export const allowsHoverStyleButton = (
  allowsHover: boolean,
  isLight: boolean,
  active: boolean,
  buttonType: ButtonType
) =>
  allowsHover
    ? {
        borderColor: isLight
          ? buttonType === ButtonType.Default
            ? active
              ? '#1AAB9B'
              : '#231536'
            : buttonType === ButtonType.Danger
            ? active
              ? '#F75524'
              : '#FAB6A1'
            : buttonType === ButtonType.Primary
            ? '#1AAB9B'
            : '#098C7D'
          : buttonType === ButtonType.Primary
          ? '#027265'
          : buttonType === ButtonType.Default
          ? '#1AAB9B'
          : buttonType === ButtonType.Danger
          ? '#CB3A0D'
          : '#027265',
        background: isLight
          ? buttonType === ButtonType.Default
            ? active
              ? '#E7FCFA'
              : '#FFFFFF'
            : buttonType === ButtonType.Danger
            ? active
              ? '#FBE1D9'
              : 'transparent'
            : buttonType === ButtonType.Primary
            ? '#B6EDE7'
            : 'white'
          : buttonType === ButtonType.Default
          ? 'transparent'
          : buttonType === ButtonType.Primary
          ? '#042F2A'
          : 'transparent',
      }
    : undefined;

export const allowsHoverText = (allowsHover: boolean, isLight: boolean, active: boolean, buttonType: ButtonType) =>
  allowsHover
    ? {
        borderColor: isLight
          ? buttonType === ButtonType.Default
            ? active
              ? '#1AAB9B'
              : '#231536'
            : buttonType === ButtonType.Danger
            ? active
              ? '#F75524'
              : '#FAB6A1'
            : buttonType === ButtonType.Primary
            ? '#1AAB9B'
            : '#098C7D'
          : buttonType === ButtonType.Primary
          ? '#027265'
          : buttonType === ButtonType.Default
          ? '#1AAB9B'
          : buttonType === ButtonType.Danger
          ? '#CB3A0D'
          : '#027265',
        background: isLight
          ? buttonType === ButtonType.Default
            ? active
              ? '#E7FCFA'
              : '#FFFFFF'
            : buttonType === ButtonType.Danger
            ? active
              ? '#FBE1D9'
              : 'transparent'
            : buttonType === ButtonType.Primary
            ? '#B6EDE7'
            : 'white'
          : buttonType === ButtonType.Default
          ? 'transparent'
          : buttonType === ButtonType.Primary
          ? '#042F2A'
          : 'transparent',
      }
    : undefined;

export const ButtonPickerStyle = (isLight: boolean, selected: boolean) => ({
  background: isLight ? (selected ? '#1AAB9B' : 'transparent') : selected ? '#098C7D' : 'transparent',

  borderColor: isLight ? (selected ? '#1AAB9B' : '#D4D9E1') : selected ? '#098C7D' : '#708390',
  boxShadow: selected ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : 'none',
  textColor: isLight ? (selected ? '#FFFFFF' : '#9FAFB9') : selected ? '#FFFFFF' : '#ADAFD4',
});
