import React from 'react';
import * as XLSX from 'xlsx';

export function ImportExcel(props:any){
    return(<div>
        <input type="file" id="fileUpload" onChange={Upload}/>
        
    </div>)
    
}

function Upload() {
    const fileUpload = (document.getElementById('fileUpload') as HTMLInputElement);
    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        let fileName = fileUpload.files![0].name; 
        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();
            if (reader.readAsBinaryString) {
                reader.onload = (e) => {
                    processExcel(reader.result);
                };
                reader.readAsBinaryString(fileUpload.files![0]);
            }
        } else {
            console.log("This browser does not support HTML5.");
        }
    } else {
        console.log("Please upload a valid Excel file.");
    }
}
function processExcel(data:any) {
    const workbook = XLSX.read(data, {type: 'binary'});
    const firstSheet = workbook.SheetNames[0];
    //const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
    console.log(excelRows);
}

