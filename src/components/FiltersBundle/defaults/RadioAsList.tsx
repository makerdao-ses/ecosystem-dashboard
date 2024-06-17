import { styled } from '@mui/material';
import FilterAsListBase from './FilterAsListBase';
import type { RadioOption, RadioFilter } from '../types';

interface RadioAsListProps {
  filter: RadioFilter;
}

const RadioAsList: React.FC<RadioAsListProps> = ({ filter }) => {
  const name = `radio-${filter.id}`;

  const groupedOptions = filter.options.reduce((acc, option) => {
    const group = option.group === true ? 'true' : option.group?.toString() || 'default';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {} as Record<string, RadioOption[]>);

  return (
    <FilterAsListBase label={filter.label}>
      {Object.entries(groupedOptions).map(([group, options]) =>
        group !== 'false' && group !== 'default' ? (
          <Group key={group}>
            <fieldset>
              <legend>{group}</legend>
              {options.map((option) => (
                <Option key={option.value}>
                  <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={option.selected || false}
                    onChange={() => filter.onChange(option.value)}
                  />
                  <span>{option.label}</span>
                </Option>
              ))}
            </fieldset>
          </Group>
        ) : (
          options.map((option) => (
            <Option key={option.value}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={option.selected || false}
                onChange={() => filter.onChange(option.value)}
              />
              <span>{option.label}</span>
            </Option>
          ))
        )
      )}
    </FilterAsListBase>
  );
};

export default RadioAsList;

const Group = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  overflow: 'hidden',
  background: 'transparent',
  border: 'none',
  outline: 'none',
}));

const Option = styled('label')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 8px',
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',

  '& input[type="radio"]': {
    marginRight: '8px',
  },

  '&[selected]': {
    fontWeight: 700,
  },
}));
