import XLSX from 'xlsx';

interface ExcelColumn{
  Question:string;
  MaxScore:number;
}

export let QuestionArray:Array<string> = []

export function interpretExcel(fileUpload: HTMLInputElement) {
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
};

function processExcel(data:any) {
  const workbook = XLSX.read(data, {type: 'binary'});
  const firstSheet = workbook.SheetNames[0];
  const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
  for (let i = 0; i < excelRows.length; i++) {
    QuestionArray.push((excelRows[i] as ExcelColumn).Question);
  }
  QuestionArray = QuestionArray.filter((x, i, a) => a.indexOf(x) === i)//filter dupe
  for (let i = 0; i < QuestionArray.length; i++) { // add question no.
    QuestionArray[i] = ("Question "+(i+1)+": "+QuestionArray[i])
  }
}

export function clearExcel(){
  QuestionArray = [];
}