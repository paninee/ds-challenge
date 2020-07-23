/**
 * Set of utility methods to transform data according to the graphs input
 * @return JSON array;
 */

import dl from 'datalib';

const threatLevel = (data, filters): any => {
  return {
    label: 'high',
    score: 60
  };
};

const newCases = (data, filters): any => {
  return dl.format.summary(data);
};

const ages = (data, filters): number => {
  return 189;
};

export {
  threatLevel,
  newCases,
  ages
};
