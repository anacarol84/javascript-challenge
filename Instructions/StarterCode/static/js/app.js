// create more explicit variable
var tableData = data;

// Create tbody variable
var tbody = d3.select('tbody');

// Function to display information
function tableDisplay(ufoSightings) {
    var tbody = d3.select("tbody");
    ufoSightings.forEach((ufoRecord) => {
      var row = tbody.append("tr");
      Object.entries(ufoRecord).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.html(value);
      });
    });
  };
  
  // Cleasing the table for new data
  function deleteTbody() {
    d3.select("tbody")
      .selectAll("tr").remove()
      .selectAll("td").remove();
  };
    

// Appending objects from data.js into new table rows inside table body
tableData.forEach(item => {
    var tr = tbody.append('tr');
    tr.append('td').text(item.datetime);
    tr.append('td').text(item.city);
    tr.append('td').text(item.state);
    tr.append('td').text(item.country);
    tr.append('td').text(item.shape);
    tr.append('td').text(item.durationMinutes);
    tr.append('td').text(item.comments);
});

// Filter button for the table
var button = d3.select('#filter-btn');

// Create a botton to filter the data 
button.on("click", function(event) {
  
    d3.event.preventDefault();
    deleteTbody();
    
    var filteredData = tableData;
    var inputId = document.getElementsByClassName("form-control");
    
    // Create interaction with all the input fields
    for (var i = 0; i < inputId.length; i++) {
      
      var idName = inputId[i].id;
      var field = d3.select("#" + idName).property("value");
      
      // Treat empty fields as a search for ALL for that field
      if (field.trim() !== "") {
        var filteredData = filteredData.filter(ufoSighting =>
          ufoSighting[idName].toUpperCase().trim() ===
          field.toUpperCase().trim());
      };
    };
   
    // Display message if no records found
    if (filteredData.length == 0) {
      d3.select("tbody")
        .append("tr")
        .append("td")
          .html("<h4>No Records Found</h4>");
    };
    
    console.log(filteredData);
    tableDisplay(filteredData);
  });
 

