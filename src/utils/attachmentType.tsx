export const attachmentType = (file: string) => {
  if (['png', 'jpg', 'svg', 'jpeg', 'gif'].some(item => file === item))
    return 'image';
  if (
    ['mp4', 'mov', 'wmv', 'avi', 'flv', 'mkv', '3gp'].some(
      item => file === item,
    )
  )
    return 'video';
};
