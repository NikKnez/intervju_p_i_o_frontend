import axios from 'axios';

//const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'https://intervjupio-z1oc.onrender.com';

const apiClient = axios.create({
    baseURL: 'https://intervjupio-z1oc.onrender.com',
     //baseURL: 'http://localhost:8080', // Base URL for the backend
    
});

// Function to get the list of files
export const getFiles = async () => {
    try {
        const response = await apiClient.get('/files');
        return response.data;
    } catch (error) {
        console.error('Error fetching files:', error);
        throw error; // Propagate the error to the caller
    }
};

// Function to download a file by fileId
export const downloadFile = async (fileId: any) => {    
    try {
        // Make a GET request to download the file
        const response = await apiClient.get(`/file/download/${fileId}`, {
            responseType: 'blob', // Set the response type to blob
        });

        // Create a temporary URL for the downloaded file
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Extract the filename from the response headers
        const contentDisposition = response.headers['content-disposition'];
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        let filename = 'file'; // Default filename
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);

        // Append the link to the document body and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up: remove the link and revoke the URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error; // Propagate the error to the caller
    }
};

export default apiClient;
