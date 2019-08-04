import React from 'react';
import PropTypes from 'prop-types';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import useTheme from '@material-ui/core/styles/useTheme';
import ReactSelect from 'react-select';
import AsyncReactSelect from 'react-select/async';
import CreatableReactSelect from 'react-select/creatable';
import AsyncCreatableReactSelect from 'react-select/async-creatable';

import Control from './Control';
import Menu from './Menu';
import MultiValue from './MultiValue';
import NoOptionsMessage from './NoOptionsMessage';
import Option from './Option';
import Placeholder from './Placeholder';
import SingleValue from './SingleValue';
import ValueContainer from './ValueContainer';
import DropdownIndicator from './DropdownIndicator';
import ClearIndicator from './ClearIndicator';
import IndicatorSeparator from './IndicatorSeparator';

const Select = ({ id, label, helperText, error, isAsync, isCreatable, components, ...otherProps }) => {
  const theme = useTheme();
  const selectStyles = {
    input: base => ({
      ...base,
      'color': theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  };

  const SelectControl = isAsync
    ? isCreatable
      ? AsyncCreatableReactSelect
      : AsyncReactSelect
    : isCreatable
      ? CreatableReactSelect
      : ReactSelect;

  return (
    <NoSsr
      // prettier-ignore
      fallback={(
        <TextField
          id={id}
          label={label}
          variant="outlined"
          fullWidth
          value="..."
          error={error}
          helperText={helperText}
          disabled
        />
      )}
    >
      <SelectControl
        styles={selectStyles}
        inputId={id}
        TextFieldProps={{
          label,
          fullWidth: true,
          variant: 'outlined',
          error,
          helperText,
          InputLabelProps: {
            htmlFor: id,
            shrink: true
          }
        }}
        components={{
          Control,
          Menu,
          MultiValue,
          NoOptionsMessage,
          Option,
          Placeholder,
          SingleValue,
          ValueContainer,
          DropdownIndicator,
          ClearIndicator,
          IndicatorSeparator,
          ...components
        }}
        {...otherProps}
      />
    </NoSsr>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  isAsync: PropTypes.bool,
  isCreatable: PropTypes.bool,
  components: PropTypes.shape()
};

Select.defaultProps = {
  helperText: null,
  error: false,
  isAsync: false,
  isCreatable: false,
  components: null
};

export default Select;
