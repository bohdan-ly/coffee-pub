export const getYouTubeVideoIdFromLink = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

export const buildYouTubeEmbedUrl = (id: string, options: string) => {
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}${!options ? "" : `?${options}`}`;
};

export const sanitizeLink = (link: string) => {
  if (!link) return null;
  let _link = link;
  if (_link.indexOf("http") !== 0) {
    _link = `http://${link}`;
  }
  return _link;
};
