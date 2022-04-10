import { Autocomplete, AutocompleteProps, TextField, TextFieldProps } from '@mui/material'
import { Controller, FieldError, UseControllerProps, useFormContext } from 'react-hook-form'
import { FieldPath, FieldValues } from 'react-hook-form/dist/types'

export type FormAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> &
  UseControllerProps<TFieldValues, TName> &
  Pick<TextFieldProps, 'label' | 'variant' | 'InputProps' | 'margin'>

export function EnhancedAutocomplete({
  label,
  variant,
  InputProps,
  margin,
  invalid,
  error,
  ...props
}: Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> &
  Pick<TextFieldProps, 'label' | 'variant' | 'InputProps' | 'margin'> & {
    invalid?: boolean
    error?: FieldError
  }) {
  return (
    <Autocomplete
      fullWidth
      size="small"
      autoHighlight
      autoComplete
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={props.placeholder}
          label={label}
          variant={variant}
          InputProps={{
            ...InputProps,
            ...params.InputProps
          }}
          margin={margin}
          error={invalid}
          helperText={error?.message}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password'
          }}
          InputLabelProps={{ ...params.InputLabelProps, shrink: true }}
        />
      )}
    />
  )
}

function FormAutocomplete<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control: _control,
  ...props
}: FormAutocompleteProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()
  return (
    <Controller<TFieldValues, TName>
      name={name}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      control={_control || control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <>
          <EnhancedAutocomplete
            {...props}
            value={value || ''}
            onChange={(...options) => {
              onChange(options[1])
              props.onChange?.(...options)
            }}
            onBlur={onBlur}
            invalid={invalid}
            error={error}
          />
        </>
      )}
    />
  )
}

export default FormAutocomplete
