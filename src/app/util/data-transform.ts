import { FilterInterface } from './interface';
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

  private applyFilter(filter: FilterInterface){
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

  public newCases(filter: FilterInterface){
    if(filter){
      this.applyFilter(filter);
    }
    return dl.count(this.data);
  }

  public ages(filter: FilterInterface){
    if(filter){
      this.applyFilter(filter);
    }
    return (dl.groupby('Age_Group').count().execute(this.data)).sort(dl.comparator('Age_Group'));
  };

  public acquisitions(filter: FilterInterface){
    if(filter){
      this.applyFilter(filter);
    }
    return (dl.groupby('Case_AcquisitionInfo').count().execute(this.data)).sort(dl.comparator('Case_AcquisitionInfo'));
  }

  public outbreakRelates(filter: FilterInterface){
    if(filter){
      this.applyFilter(filter);
    }
    let returnData = (dl.groupby('Outbreak_Related').count().execute(this.data)).sort(dl.comparator('Outbreak_Related'));
    returnData[0].Outbreak_Related = 'No';
    return returnData;
  }

  public genders(filter: FilterInterface){
    if(filter){
      this.applyFilter(filter);
    }

    let groupedData = dl.groupby('Client_Gender').count().execute(this.data);
    let newCaseCount = this.newCases(null);

    return {
      male: Math.round(groupedData.find(gd => gd.Client_Gender === 'MALE').count / newCaseCount * 20),
      female: Math.round(groupedData.find(gd => gd.Client_Gender === 'FEMALE').count / newCaseCount * 20),
      other: Math.round(groupedData.find(gd => !(gd.Client_Gender === 'MALE' || gd.Client_Gender === 'FEMALE')).count / newCaseCount * 20)
    };
  }

  public outcomes(filter: FilterInterface){
    if(filter){
      this.applyFilter(filter);
    }

    let groupedData = (dl.groupby('Outcome1').count().execute(this.data)).sort(dl.comparator('Outcome1'));
    let newCaseCount = this.newCases(null);

    return {
      data: groupedData,
      fatalPercentage: Math.round(groupedData.find(gd => gd.Outcome1 === 'Fatal').count / newCaseCount * 100)
    };
  }
};
