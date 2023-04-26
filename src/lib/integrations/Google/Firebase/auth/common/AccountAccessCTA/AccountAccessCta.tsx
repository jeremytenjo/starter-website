import React from 'react';
import Button from '@useweb/ui/Button';

export type AccountAccessCtaProps = { loading?: boolean; text: string };

export default function AccountAccessCta(props: AccountAccessCtaProps) {
  return (
    <Button
      name={`${props.text} button`}
      type="submit"
      disabled={props.loading}
      variant="outlined"
      sx={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'gray.med',
        color: 'black.main',
        fontWeight: 600,
      }}
    >
      {props.loading ? 'Loading...' : props.text}
    </Button>
  );
}
