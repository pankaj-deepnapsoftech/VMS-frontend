


export const handleFileChange = (selectedFile) => {

    if (selectedFile) {
        const fileType = selectedFile.type;

        if (fileType === 'application/pdf') {
            return selectedFile;
        } else {
            alert("Wrong file Type, supported file only PDF")
            return null
        }
    }
};


export const handleExcelFile = (selectedFile) => {
     if (selectedFile) {
        const fileType = selectedFile.type;

        if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === "application/vnd.ms-excel") {
            return selectedFile;
        } else {
            alert("Wrong file Type, supported file only example.xlsx and example.xls")
            return null
        }
    }
}







