 Nowdays everything is easly maintain if we are dealing with objects .As I have face many problems while in uploading excel file ,taking data from excel and play with each Cell of excel file .This Converter is just a interface which helps to get objects from excel Or excel from objects.
 
 Here are the two Converters and Some Getters (define below) present in it :

- Excel to Objects
- Objects to Excel

### Excel to objects
   
- Purpose - convert Excel Rows to objects.   
- xlToObjects function is use for it.
- Parameters required - `filePath` the path of excel file from where to get it.
- It returns the rows in the form of objects , with related keys.

### Objects to Excel

- Purpose - convert excel to objects.
- objectsToXl function is use for it.
- It returns callback will be err Or data as string.
  - For resolve `sheetName` sheet successfully created.
  - For reject `sheetName` sheet not created.

- Parameters required - `headers`,`objects`,`path`,`fileName`,`sheetName`.

#### headers
-  Will be of Array.
-  They are headers of your excel sheet.
-  Write the sequence you want it in excel.

#### objects
-  Will be of Objects in Array i.e `[ { } ]` .
-  They are Rows of your excel sheet.

#### path
-  Will be of String.
-  Path where you want to save it.

#### fileName
-  Will be of String.
-  Name of file, Eg:Sample (`.xlsx is by default`)

#### sheetName
-  Will be of String.
-  Name of Sheet i.e which will be by default `sheet1`.

## Getters

We can use Excel Sheet as a very small Database as we can do
Extractions from that by putting some queries,
The query can be made in form of Objects, Arrays
 Thing can be achive like:
- Any Perticular Row.
- Any Perticular Column.
- Get Number of Rows.
- Get Number of Columns.
- Get Data as Objects of Perticular Columns.

### Get Row
- Function Used: getRow.
- Parameters needed :filePath,query.
- Accept Query as Object Eg- `{name:"Jhon",age:"21"}`.
- `and` type of query will be done.
- Return Single Row which matches both Conditions `First`.

### Get Rows
- Function Used: getRows.
- Parameters needed :filePath,query.
- Accept Parameters as Object Eg- `{name:"Jhon",age:"21"}`.
- `and` type of query will be done.
- Return Multiple Rows which matches both Conditions.

### Get Column
- Function Used: getColumn.
- Parameters needed :filePath,query.
- Accept Parameters as String Eg- `"name"`.
- Return Array of Strings which is Present in that Column.


### Get Columns
- Function Used: getColumns.
- Parameters needed :filePath,queries.
- Accept Parameters as String in Array Eg- `["name","age"]`.
- Return Object with Keys name and age and both of them have Array
 of Strings which is Present in respective Column.

### Get Rows from Selective Columns
- Function Used: getRowsOfCols.
- Parameters needed :filePath,queries.
- Accept Parameters as String in Array Eg- `["name","age"]`.
- Return all Rows with Selected Columns name and age as Objects in Array