# Plant Finder Dashboard

- Implementation of Plant Finder Dashboard using data acquired through San Francisco Plant Finder API.

## Implementation details

- First, I created two sections in the web page:
  - The first section consists of a list of options for filtering the data.
  - The second column contains a table placeholder for creating a base for data gathered through the API.
    After creating the table, an AJAX call is made to the API with the help jQuery.ajax GET method. The response gathered from the API is binded to the Plants table.

- The next step consists consuming a click event from the Plants table's row and reveal a new section which contains the detailed characteristics of the selected cell from Plants table.

- Finally, I've added a filter functionality to process data presented in the Plants table and I have enlisted a set of conditions for filtering based on the data and columns showed up in plants table. In order to do this, I created multiple queries based on the user selections and with the help of API's SoQL clauses.

### Technologies used for developing this app

- HTML5
- CSS3
- JS
- jQuery
- Bootstrap
- DataTable
