import XLSX from 'xlsx';
import { students } from '../pages/Course/Student';

interface ExcelColumn {
  Question: string;
  MaxScore: number;
}

export let QuestionArray: Array<string> = []

export function interpretExcel(fileUpload: HTMLInputElement) {
    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      // let fileName = fileUpload.files![0].name; 
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
};

function processExcel(data: any) {
  const workbook = XLSX.read(data, {type: 'binary'});
  const firstSheet = workbook.SheetNames[0];
  const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
  console.log(excelRows);
  for (let i = 0; i < excelRows.length; i++) {
    QuestionArray.push((excelRows[i] as ExcelColumn).Question);
  }
  QuestionArray = QuestionArray.filter((x, i, a) => a.indexOf(x) === i)//filter dupe
  for (let i = 0; i < QuestionArray.length; i++) { // add question no.
    QuestionArray[i] = ("Question "+(i+1)+": "+QuestionArray[i])
  }
}

export function clearExcel() {
  QuestionArray = [];
}

//Excel writinh
// [['test','1','2'],['123','456']] will be
// test  1   2
// 123  456

export function exportExcel(selectedStudent: Array<boolean>, fileName: string,fileType: string) {
  const wb = XLSX.utils.book_new();
  let data:string[][] = [['Student Mail', 'Student Name', 'Score'],]
  if(fileName === ''){fileName = 'Outcome Result'}
  for (let i = 0; i < selectedStudent.length-1; i++) {
    if(selectedStudent[i] === true) {
      console.log('adding student' + i);
      data.push([students[i].mail, students[i].name, '100'])
    }
  }
  if(data.length !== 1){
    const sheet = XLSX.utils.json_to_sheet([{}], {});
    XLSX.utils.sheet_add_json(sheet, data, {origin: 'A3'});
    //quick fix to the blank row problem
    delete_row(sheet,0);delete_row(sheet,0);delete_row(sheet,0);
    XLSX.utils.book_append_sheet(wb, sheet);
    XLSX.writeFile(wb, fileName + '.' + fileType, {bookType: fileType as XLSX.BookType });
  }
  else{
    alert("Please select student.")
  }
}

function ec(r: any, c: any) {
  return XLSX.utils.encode_cell({r: r, c: c});
}
function delete_row(ws: any, row_index: any) {
  var variable = XLSX.utils.decode_range(ws["!ref"])
  for (var R = row_index; R < variable.e.r; ++R) {
    for (var C = variable.s.c; C <= variable.e.c; ++C) {
      ws[ec(R, C)] = ws[ec(R + 1, C)];
    }
  }
  variable.e.r--
  ws['!ref'] = XLSX.utils.encode_range(variable.s, variable.e);
}