// var excel = require('exceljs');

// export default function convertJsonToXlsx(currentRadarObj) {

//     let workbook = new excel.Workbook(); //creating workbook
//     let sheet = workbook.addWorksheet('TechRadarWorksheet'); //creating worksheet

//     function addRows(objArray) {
//         sheet.addRow().values = Object.keys(objArray[0]);

//         objArray.forEach(function(item){
//             var valueArray = [];
//             valueArray = Object.values(item); // forming an array of values of single json in an array
//             sheet.addRow.values = valueArray; // add the array as a row in sheet
//         })
//         return objArray;
//     }

//     function downloadXlsx() {
//         var tempfile = require('tempfile');
//         var tempFilePath = tempfile('.xlsx');
//         console.log("tempFilePath : ", tempFilePath);
//         workbook.xlsx.writeFile(tempFilePath).then(function(res) {
//             res.sendFile(tempFilePath, function(err){
//                 console.log('---------- error downloading file: ', err);
//                 return err;
//             });
//             console.log('file is written');
//             return res;
//         });
//     }

//     addRows(currentRadarObj);
//     downloadXlsx();

// }
