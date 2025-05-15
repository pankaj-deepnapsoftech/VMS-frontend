export function excelDateToJSDate(serial) {
  const excelEpoch = new Date(1899, 11, 30);
  const date = new Date(excelEpoch.getTime() + serial * 86400000);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}


export function DateModifier(isoDate) {
  const date = new Date(isoDate);

  // Example 1: Simple readable format
  const readableDate = date.toDateString();
  console.log(readableDate); // Output: Wed May 21 2025

  // Example 2: Custom format (e.g., "May 21, 2025")
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-IN', options);

return formattedDate
}



