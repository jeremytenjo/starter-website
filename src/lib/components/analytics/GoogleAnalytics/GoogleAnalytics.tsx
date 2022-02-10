import React from 'react'

export type GoogleAnalyticsProps = { measurementId: string | undefined }

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return measurementId ? (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  ) : null
}
