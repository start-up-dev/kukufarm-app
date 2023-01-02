export const sliceText = (text: string, sliceNumber = 14) => {
  if (!text) return null;
  if (text?.length < sliceNumber) return text;
  return text?.slice(0, sliceNumber) + '...';
};
