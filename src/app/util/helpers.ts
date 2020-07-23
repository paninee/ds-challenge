/**
 * Convert CSV string to JSOn
 * @return JSON array;
 */
const csvJSON = (csv): any[] => {
  const lines = csv.split("\n");
  let headers = lines[0].split(",");
  let result = [];
  

  for(var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for(var j = 0; j < headers.length; j++){
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }
  return result;
}


export {
  csvJSON
};