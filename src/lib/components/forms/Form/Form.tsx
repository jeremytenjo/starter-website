import React, { forwardRef, useEffect } from 'react'
import Box from '@mui/material/Box'
// http://localhost:6006/?path=/story/api-tiktok-watermark-remover--test
import {
  FormProvider,
  useForm,
  useFormContext,
  type UseFormReturn,
} from 'react-hook-form'

type FormProps = {
  children: any
  onSubmit: (data: any) => any
  defaultValues?: object
  sx?: object
  resetOnSubmission?: boolean
  getUseFormData?: (d: UseFormReturn) => any
}

const Form = forwardRef(
  (
    {
      children,
      onSubmit,
      defaultValues = {},
      sx = {},
      resetOnSubmission,
      getUseFormData,
    }: FormProps,
    ref,
  ) => {
    const methods = useForm({ defaultValues })

    useEffect(() => {
      getUseFormData && getUseFormData(methods)
    }, [])

    return (
      <FormProvider {...methods}>
        <FormElement
          onSubmit={onSubmit}
          ref={ref}
          sx={sx}
          resetOnSubmission={resetOnSubmission}
        >
          {children}
        </FormElement>
      </FormProvider>
    )
  },
)

const FormElement = forwardRef(
  ({ children, onSubmit, sx, resetOnSubmission }: FormProps, ref) => {
    const { handleSubmit, register, reset } = useFormContext()

    const handleSumbit = (props) => {
      resetOnSubmission && reset()
      onSubmit(props)
    }

    return (
      <Box component='form' ref={ref} onSubmit={handleSubmit(handleSumbit)} sx={sx}>
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register,
                      key: child.props.name,
                    },
                  })
                : child
            })
          : children}
      </Box>
    )
  },
)

export default Form
