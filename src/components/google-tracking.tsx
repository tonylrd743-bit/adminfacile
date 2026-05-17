"use client";

import Script from "next/script";

export function GoogleTracking() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <>
      {gtmId ? (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
            `}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`} strategy="afterInteractive" />
        </>
      ) : null}

      {adsId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`} strategy="afterInteractive" />
          <Script id="google-ads-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${adsId}');
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
