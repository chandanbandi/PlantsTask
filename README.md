# Plant Finder Dashboard

- Implementation of Plant Finder Dashboard using data acquired through San Francisco Plant Finder API.

## Implementation details

- First, I created a two column layout with:
  - The first column contains a table placeholder for creating a base for data gathered through the API.
  - The second column consists of a list of options for filtering the data.
After creating the table, an AJAX call is made to the API with the help jQuery.ajax method. The response gathered from the API is binded to the Plants table which has functionality of DataTable .

- The next step was to consume click event from the Plants table's row and reveal a new section below the table. This details section is contains the whole information of the selected cell from the Plant's table.

- Finally, I've added a filter functionality to process data presented in the Plants table. I have enlisted list of conditions for filtering based on the data and columns showed up in plants table. In order to do this, I created multiple queries based on the user selections and with the help of API's SoQL clauses.

### Technologies used for developing this app

- HTML5
- CSS3
- JS
- jQuery
- Bootstrap
- DataTable
