# Plants Dashboard

-A coding task for show casing list of plants from San Francisco Plant Finder API.

## Approach followed for implementing the task

-First step was to create a two column layout with one column containing a table placeholder for creating a base for data coming from API. Next, in the second column I created a section containing list of options for filtering the data gathered from API.

-Second step involved selection of making an AJAX call to the API with the help jQuery.ajax method. The response gathered from the API was binded to the Plants table which has funcionality of DataTable .

-Third step was to consume click event from the Plants table's row and reveal a new section below the table. This details section is contains the whole information of the selected cell from the Plant's table.

-The final step involved adding filter functionality to data presented in the Plants table. I have enllisted list of conditions for filtering based on the data and columns showed up in plants table. In order to do this, I created multiple queries based on the user selections and with the help of API's SoQL clauses.

### List of tecnologies used for creating the project.

-HTML5
-CSS3
-JS
-jQuery
-Bootstrap
-DataTable
