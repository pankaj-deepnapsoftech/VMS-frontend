


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









