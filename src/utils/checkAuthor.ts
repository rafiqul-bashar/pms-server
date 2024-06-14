export const isAuthor = (crudId: string, userId: string) => {
  if (crudId === userId) return true;
  return false;
};
