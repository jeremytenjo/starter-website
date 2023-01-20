import React, { useEffect } from 'react'
import Box from '@useweb/ui/Box'
import Form from '@useweb/ui/Form'
import { useRouter } from 'next/router'
import Select from '@useweb/ui/Select'
import selectDefaults from '../../useweb/forms/fields/Select/Select.defaults'

const selectDefaultStyles: any = selectDefaults?.styleOverrides

export type RouterLinkedSelectProps = {
  defaultValue: () => string
  label: string
  onChange: (props: { value: any }) => any
  options: { label: string; value: string }[]
  onRouteChange?: (props: { url: string }) => any
}

export default function RouterLinkedSelect(props: RouterLinkedSelectProps) {
  const router = useRouter()

  const handleOnRouteChange = (url) => {
    props.onRouteChange && props.onRouteChange({ url })
  }

  useEffect(() => {
    if (props.onRouteChange) {
      router.events.on('routeChangeComplete', handleOnRouteChange)

      return () => {
        router.events.off('routeChangeComplete', handleOnRouteChange)
      }
    }
  }, [props.onRouteChange])

  return (
    <>
      {!router.isReady && (
        <Box
          sx={{
            mb: '20px',
            height: '47px',
            ...selectCommonStyles,
            ...(selectDefaultStyles?.root || {}),
          }}
        />
      )}

      {router.isReady && (
        <Form
          onSubmit={() => null}
          sx={{
            mb: '20px',
            width: '100%',
          }}
          defaultValues={{
            select: props.defaultValue(),
          }}
        >
          <Select
            onChange={props.onChange}
            name='select'
            label={props.label}
            options={props.options}
            sx={{
              ...selectCommonStyles,
              textTransform: 'capitalize',
            }}
          />
        </Form>
      )}
    </>
  )
}

const selectCommonStyles = {
  width: ['100%', , '179px'],
}
