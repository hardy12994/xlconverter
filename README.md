 Nowdays everything is easly maintain if we are dealing with objects .As I have face many problems while in uploading excel file ,taking data from excel and play with each Cell of excel file .This Converter is just a interface which helps to get objects from excel Or excel from objects.

 
 link  https://github.com/hardy12994/xlconverter
 
 Here are the two Converters and Some Getters (define below) present in it :

- Excel to Objects
- Objects to Excel

### Excel to Objects
   
   ```sh

   let xlconverter = require('xlconverter');

    let path="abv/cac/ac/ac.xlsx";
    let sheet="sheet1";


    // xlToObjects, will provide objects of all the sheets present in xl sheet;

     xlconverter.xlToObjects(path, function (err, data) {
         console.log(err);
         console.log(data);
     });


    /**
    * data-
    *
    * [{},{},{}]
    * // object as rows
    */


    // xlToObjectsOfSheet, will provide objects of perticular sheet present in xl sheet;

     xlconverter.xlToObjectsOfSheet(path, sheet, function (err, data) {
         console.log(err);
         console.log(data);
     });

      /**
      * data -
      * {
      *   sheet1: [{},{},{}],
      *   sheet2: [{},{},{}]
      * }
      * // object as rows
      */
     

   ```

### Objects to Excel

```sh

     let headers=["name","age"];
     let rows=[{ name:"hardy",age:21 },{ name:"hardy",age:21 }];
     let path="abc/cac/";
     let fileName="myNewSheet"; //.xlsx is by default
     let sheetName="sheet1";

     xlconverter.objectsToXl(headers, rows, path, fileName, sheetName, function (err, data) {
         console.log(err);
         console.log(data); 
     });

      /**
      * if error -`sheetName` sheet not created
      * data -
      * `sheetName` sheet successfully created.
      */

```

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

- Accept Query as Object Eg- `{name:"Jhon",age:"21"}`.
- `and` type of query will be done.
- Return Single Row which matches both Conditions `First`.

```sh

     let rowQuery= {name:"Jhon",age:"21"};
     let filePath="abc/cac/";
     let sheetName="sheet1";
     
     xlconverter.getters.row(filePath, rowQuery, sheetName, function (err, data) {
         console.log(err);
         console.log(data); 
     });

    /**
    * data-
    *
    * {name:"Jhon", age:"21", f_name:"D_Jhon"}
    * // object as rows
    */


```


### Get Rows
- Accept Parameters as Object Eg- `{name:"Jhon",age:"21"}`.
- `and` type of query will be done.
- Return Multiple Rows which matches both Conditions.


```sh

     let rowQuery= {name:"Jhon",age:"21"};
     let filePath="abc/cac/";
     let sheetName="sheet1";
     
     xlconverter.getters.rows(filePath, rowQuery, sheetName, function (err, data) {
         console.log(err);
         console.log(data); 
     });

    /**
    * data-
    *
    * [{name:"Jhon", age:"21", f_name:"D_Jhon"},
    * {name:"Jhon", age:"21", f_name:"D_Jhonee"}]
    * // object as rows
    */

```


### Get Column
- Accept Parameters as String Eg- `"name"`.
- Return Array of Strings which is Present in that Column.


```sh

     let colQuery= "name";
     let filePath="abc/cac/";
     let sheetName="sheet1";
     
     xlconverter.getters.coloumn(filePath, colQuery, sheetName, function (err, data) {
         console.log(err);
         console.log(data); 
     });

    /**
    * data-
    *
    * ["Jhon","Jhon2","Jhon3"]
    * // as coloumn cells
    */

```


### Get Columns
- Accept Parameters as String in Array Eg- `["name","age"]`.
- Return Object with Keys name and age and both of them have Array
 of Strings which is Present in respective Column.


```sh

     let colQuery= ["name","age"];
     let filePath="abc/cac/";
     let sheetName="sheet1";
     
     xlconverter.getters.coloumns(filePath, colQuery, sheetName, function (err, data) {
         console.log(err);
         console.log(data); 
     });

    /**
    * data-
    *
    * {
    *  name:["Jhon","Jhon2","Jhon3"],
    *  age:[21,33,13]
    * }
    * // as coloumn cells
    */

```


### Get Rows from Selective Columns
- Accept Parameters as String in Array Eg- `["name","age"]`.
- Return all Rows with Selected Columns name and age as Objects in Array
- Getting Selective Coloumns of Rows. 

```sh

     let colQuery= ["name","age"];
     let filePath="abc/cac/";
     let sheetName="sheet1";
     
     xlconverter.getters.selectiveColoumnsOfRows(filePath, colQuery, sheetName, function (err, data) {
         console.log(err);
         console.log(data); 
     });

    /**
    * data-
    *
    * [
    *   {name: "hardy", age: 12},
    *   {name: "pery", age: 41},
    *   {name: "bob", age: 42}
    *  ]
    * // 
    */

```

**N O T E** :
- `callback` function is required in all methods.
- `getters` are using `xlToObjectsOfSheet` function that's why sheet name is required.

**Contributions are most wellcome**