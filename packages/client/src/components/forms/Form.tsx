import { styled } from '@mui/material'
import { ComponentProps, useEffect } from 'react'
import { FieldErrors, FormProvider } from 'react-hook-form'
import { UseFormReturn } from 'react-hook-form/dist/types'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form/dist/types/form'

const StyledForm = styled('form')({})

export type FormProps<T> = ComponentProps<typeof StyledForm> & {
  onSuccess: SubmitHandler<T>
  onError?: SubmitErrorHandler<T>
  methods: UseFormReturn<T, any>
}

function useScrollToError(errors: FieldErrors) {
  useEffect(() => {
    const flattenedErrors = Object.values(errors)
      .flat(Infinity)
      .reduce((all, curr) => [...all, ...(curr?.ref ? [curr] : Object.values(curr))], [])
    for (const error of flattenedErrors) {
      if (error?.ref) {
        try {
          const el = document.querySelector<HTMLElement>(`[name="${error.ref.name}"]`)
          if (el) {
            el.focus()
          }
        } catch (e) {}
        break
      }
    }
  }, [errors])
}

function Form<T>({ methods, onSuccess, onError, ...props }: FormProps<T>) {
  useScrollToError(methods.formState.errors)
  return (
    <FormProvider {...methods}>
      <StyledForm noValidate {...props} onSubmit={methods.handleSubmit(onSuccess, onError)} />
    </FormProvider>
  )
}

export default Form
