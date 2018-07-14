import * as React from 'react';
import { TextField } from '@material-ui/core';

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
  <TextField
    id="mui-theme-provider-input"
    label={props.label}
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
