import * as React from 'react';
import { RegisterInput } from '../StyledComponents/Register';

interface Props {
  id?: string;
  label?: string | null;
  InputLabelProps?: object;
  placeholder?: string;
  helperText?: string;
  type?: string;
  fullWidth?: boolean;
  margin?: string;
  value: string;
  name: string;
  error?: boolean | undefined;
  style?: object | string;
  changed: (event: React.FormEvent<HTMLInputElement>) => void;
}

export default (props: Props) => (
  <RegisterInput
    id="full-width"
    label={props.label}
    InputLabelProps={{
      shrink: true
    }}
    placeholder={props.placeholder}
    fullWidth={true}
    margin="normal"
    type={props.type}
    onChange={props.changed}
    value={props.value}
    name={props.name}
    error={props.error}
  />
);
