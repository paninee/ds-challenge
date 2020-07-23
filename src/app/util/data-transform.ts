/**
 * Set of utility methods to transform data according to the graphs input
 * @return JSON array;
 */

import dl from 'datalib';

export class DataTransformation {
  private _data: any;

  constructor(data: any) {
    this._data = data;
  }

  public threatLevel(filter) {
    return {
      label: 'high',
      score: 60
    };
  }

  public newCases(filter){
    if(filter && filter.acquisition){
      this._data.filter(d => d.Case_AcquisitionInfo == filter.acquisition);
    }
    return dl.count(this._data);
  }

  public ages(filter){
    return dl.groupby('Age_Group').count().execute(this._data);
  };

  public acquisitions(filter){
    return dl.groupby('Case_AcquisitionInfo').count().execute(this._data);
  }
};
