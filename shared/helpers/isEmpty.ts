export const isEmpty = (content: any): boolean => {
  if (!content) {
    return true;
  } else if (typeof content === 'string' && content.trim() === '') {
    return true;
  } else if (Array.isArray(content) && content.length === 0) {
    return true;
  }
  return false;
};
