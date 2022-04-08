import { DatePicker, DatePickerProps } from '@mui/lab'
import { TextField, TextFieldProps } from '@mui/material'
import { Moment } from 'moment'
import { useState } from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import { FieldPath, FieldValues } from 'react-hook-form/dist/types'
import { DEFAULT_DATE_FORMAT } from '../../routes/Invoices/utils/dateFormats'

export type FormDatepickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Partial<DatePickerProps> &
  UseControllerProps<TFieldValues, TName> &
  Pick<TextFieldProps, 'margin' | 'sx' | 'size' | 'variant'>

function FormDatepicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control: _control,
  margin,
  sx,
  size,
  variant,
  ...props
}: FormDatepickerProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Controller<TFieldValues, TName>
      name={name}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      control={_control || control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <>
          <DatePicker
            views={['day']}
            inputFormat={DEFAULT_DATE_FORMAT}
            {...props}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            value={value}
            onChange={(date) => onChange(date ? (date as Moment).toISOString() : '')}
            renderInput={(params) => (
              <TextField
                fullWidth
                margin={margin}
                sx={sx}
                size={size}
                variant={variant}
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: '',
                  readOnly: true
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: null
                }}
                name={name}
                onBlur={onBlur}
                error={invalid}
                helperText={error ? error.message : null}
                onClick={handleOpen}
              />
            )}
          />
        </>
      )}
    />
  )
}

export default FormDatepicker
