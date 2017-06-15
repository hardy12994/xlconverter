 Nowdays everything is easly maintain if we are dealing with objects .As I have face many problems while in uploading excel file ,taking data from excel and play with each Cell of excel file .This Converter is just a interface which helps to get objects from excel Or excel from objects.
 
 Here are the two Converters present in it :

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
-  Will be of Objects in Array i.e [ { } ] .
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




