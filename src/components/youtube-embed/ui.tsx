import React from "react";
import {
  buildYouTubeEmbedUrl,
  getYouTubeVideoIdFromLink,
  sanitizeLink,
} from "shared/helpers/string";

export const YoutubeEmbed: React.FC<{
  url: string;
  options?: string;
  fallbackSrc: string;
  fallbackClassName?: string;
}> = ({ url, options, fallbackSrc, fallbackClassName }) => {
  const videoId = getYouTubeVideoIdFromLink(sanitizeLink(url) || "");

  const emberIframe = () => {
    const url = buildYouTubeEmbedUrl(videoId || "", options || "");
    if (!url)
      return (
        <img
          width="100%"
          height="100%"
          className=""
          src={fallbackSrc}
          alt="youtube fallback"
        />
      );
    return <iframe className="w-full aspect-[4/3]" src={url} frameBorder="0" />;
  };

  return videoId ? (
    emberIframe()
  ) : (
    <img
      width="100%"
      height="100%"
      className={fallbackClassName || ""}
      src={fallbackSrc}
      alt="youtube fallback"
    />
  );
};
