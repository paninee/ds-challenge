/**
 * Set of utility methods to transform data according to the graphs input
 * @return JSON array;
 */

const threatLevel = (data, filters): any[] => {

  return {
    label: 'high',
    score: 60
  };
};

export {
  threatLevel
};
