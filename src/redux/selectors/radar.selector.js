export const getConfirmedTech = (state) => {
  const { techList } = state.radar;

  if (!Array.isArray(techList)) return [];
  return techList.filter((tech) => {
    return tech.confirmed;
  });
};

export const getUnconfirmedTech = (state) => {
  const { techList } = state.radar;

  if (!Array.isArray(techList)) return [];
  return techList.filter((tech) => {
    return !tech.confirmed;
  });
};
