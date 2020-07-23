$.get('OntarioCovid19Cases.csv', function(data) {
  var html = '<table class="table table-bordered">';
  var rows = data.split("\n");
  rows.forEach( function getvalues(ourrow) {
    html += "<tr>";
    var columns = ourrow.split(",");
    html += "<td>" + columns[0] + "</td>";
    html += "<td>" + columns[1] + "</td>";
    html += "<td>" + columns[2] + "</td>";
    html += "<td>" + columns[3] + "</td>";
    html += "<td>" + columns[4] + "</td>";
    html += "<td>" + columns[5] + "</td>";
    html += "<td>" + columns[6] + "</td>";
    html += "</tr>";
  })
  html += "</table>";
  $('#container').append(html);
});