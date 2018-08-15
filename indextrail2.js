// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $DateTimeInput = document.querySelector("#Date");
var $CityInput = document.querySelector("#City"); // adding city in the search category
var $StateInput = document.querySelector("#State"); 
var $CountryInput = document.querySelector("#Country"); 
var $ShapeInput = document.querySelector("#Shape"); 
var $searchBtn = document.querySelector("#search");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set Filtered Data to data initially
var filtered_data = dataSet;

// Set starting index and results per page

var startingIndex = 0;
var resultsPerPage = 1000;

// renderTable renders the filtered Data to the tbody
function renderTable() {

  
  $tbody.innerHTML = "";
  var endingIndex = startingIndex + resultsPerPage;
  for (var i = 0; i < filtered_data.length; i++) {
    // Get get the current address object and its fields
    var sighting = filtered_data[i];
    var fields = Object.keys(sighting);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}


function handleSearchButtonClick() {
  
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDateTime = $DateTimeInput.value.trim().toLowerCase();
  var filterCity = $CityInput.value.trim().toLowerCase();
  var filterState = $StateInput.value.trim().toLowerCase();
  var filterCountry = $CountryInput.value.trim().toLowerCase();
  var filterShape = $ShapeInput.value.trim().toLowerCase();
  
 
  // Set filteredAddresses to an array of all sightings 
  filtered_data = dataSet.filter (function(sighting) 
    {
    var SightingDateTime = sighting.datetime.toLowerCase();
    var SightingCity = sighting.city.toLowerCase();
    var SightingState = sighting.state.toLowerCase();
    var SightingCountry = sighting.country.toLowerCase();
    var SightingShape = sighting.shape.toLowerCase();


    var filtered_data = filterDateTime ? (SightingDateTime === filterDateTime) : true;
    //console.log('date time**************************')
    //console.log(filtered_data);
        filtered_data = filterCity ? (SightingCity === filterCity) && filtered_data : filtered_data;
        filtered_data = filterState ? (SightingState === filterState) && filtered_data : filtered_data;
        filtered_data = filterCountry ? (SightingCountry === filterCountry) && filtered_data : filtered_data;
        filtered_data = filterShape ? (SightingShape === filterShape) && filtered_data : filtered_data;
    return filtered_data;
    });  
 
renderTable();
}

// Render the table for the first time on page load
renderTable();


//Add pagination to the table to show 10 -100 entries per page


// $('#table').easyPaginate({
// 	paginateElement: 'img',
// 	elementsPerPage: 3,
// 	effect: 'climb'
// });
