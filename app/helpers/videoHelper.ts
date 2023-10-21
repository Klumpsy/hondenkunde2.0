export function extractVideoID(url: string) {
  const videoIDRegex =
    /(?:www\.youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const matches = url.match(videoIDRegex);

  return matches ? matches[1] : null;
}
