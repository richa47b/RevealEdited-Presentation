import Left_1 from './ReferenceData/Left-1.webm.csv'
import Left_2 from './ReferenceData/Left-2.webm.csv'
import Left_3 from './ReferenceData/Left-3.webm.csv'
import Left_4 from './ReferenceData/Left-5.webm.csv'
import Left_5 from './ReferenceData/Left-6.webm.csv'

import Right_1 from './ReferenceData/Right-1.webm.csv'
import Right_2 from './ReferenceData/Right-2.webm.csv'
import Right_3 from './ReferenceData/Right-3.webm.csv'
import Right_4 from './ReferenceData/Right-5.webm.csv'
import Right_5 from './ReferenceData/Right-6.webm.csv'

export let csvPaths = [
  Left_1,
  Left_2,
  Left_3,
  Left_4,
  Left_5,
  Right_1,
  Right_2,
  Right_3,
  Right_4,
  Right_5,
]
let fileNames =[
  "Left-1",
  "Left-2",
  "Left-3",
  "Left-5",
  "Left-6",
  "Right-1",
  "Right-2",
  "Right-3",
  "Right-5",
  "Right-6",
  
]
async function readCsvFile(filePath) {
  // Fetch the CSV file from the file path
  const response = await fetch(filePath);

  // Get the CSV data from the response
  const csvData = await response.text();
  // Split the CSV data into rows
  const rows = csvData.trim().split('\n');

  // Get the headers from the first row
  const headers = rows[0].split(',');
  
  return headers;
}
export const LoadLandmarksFromCsv = () => {
  let csvData = {}
  csvPaths.forEach((element,index) => {
    readCsvFile(element)
      .then(data => {
        csvData[fileNames[index]] =(data)
      });
  });
//   console.log(csvData);
  return csvData
}

