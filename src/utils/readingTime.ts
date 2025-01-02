export function readingTime(text: string, wpm = 200) {
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;

  // Calculate reading time in minutes
  const readingTime = wordCount / wpm;
  return readingTime.toFixed(2);
}
