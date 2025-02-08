const SEO = ({
  title,
  description,
  keywords = [],
  image,
  canonicalUrl,
  ogType = "website",
  structuredData,
  noindex = false,
  twitterCard = "summary_large_image",
}) => {
  const siteName = "FriendZone";
  const defaultImage = "/favicon.svg";

  const metaTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription =
    description || "Drive More FriendZone, Rank Higher, Grow Faster!";
  const metaImage = image
    ? image
    : new URL(defaultImage, window.location.origin).href;

  return (
    <>
      {/* Basic SEO */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta
        name="robots"
        content={noindex ? "noindex,nofollow" : "index,follow"}
      />

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Structured Data */}
      {structuredData && typeof structuredData === "object" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            ...structuredData,
          })}
        </script>
      )}
    </>
  );
};

export default SEO;
