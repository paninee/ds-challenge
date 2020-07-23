/**
 * Set of utility methods to transform data according to the graphs input
 * @return JSON array;
 */

import dl from 'datalib';

export class DataTransformation {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  private applyFilter(filter){
    if(filter.acquisition){
      this.data = this.data.filter(d => d.Case_AcquisitionInfo == filter.acquisition);
    }
    if(filter.gender){
      this.data = this.data.filter(d => d.Client_Gender == filter.gender);
    }
    if(filter.outcome){
      this.data = this.data.filter(d => d.Outcome1 == filter.outcome);
    }
    if(filter.isOutbreakRelated){
      this.data = this.data.filter(d => d.Outbreak_Related == filter.isOutbreakRelated ? 'Yes' : '(blank)');
    }
  }

  public threatLevel(filter) { //TODO: needs actual implementation
    return {
      label: 'high',
      score: 60
    };
  }

  public newCases(filter){
    if(filter){
      this.applyFilter(filter);
    }
    return dl.count(this.data);
  }

  public ages(filter){
    if(filter){
      this.applyFilter(filter);
    }
    return dl.groupby('Age_Group').count().execute(this.data);
  };

  public acquisitions(filter){
    if(filter){
      this.applyFilter(filter);
    }
    return dl.groupby('Case_AcquisitionInfo').count().execute(this.data);
  }

  public outbreakRelates(filter){
    if(filter){
      this.applyFilter(filter);
    }
    return dl.groupby('Outbreak_Related').count().execute(this.data);
  }
};
