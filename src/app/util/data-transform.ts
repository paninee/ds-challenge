/**
 * Set of utility methods to transform data according to the graphs input
 * @return JSON array;
 */

import { DataFrame } from 'pandas-js';

const threatLevel = (data, filters): any => {
  return {
    label: 'high',
    score: 60
  };
};

const newCases = (data, filters): number => {
  return 189;
};

const ages = (data, filters): number => {
  return 189;
};

export {
  threatLevel,
  newCases,
  ages
};
