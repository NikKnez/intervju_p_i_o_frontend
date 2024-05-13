import React, { useEffect, useState } from 'react';
import { getFiles, downloadFile } from '../api/apiClient'; 

interface File {
    id: string;
    filename: string;
    filetype: string;
    base64Content: string;
}

function FileList() {
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        getFiles()
            .then((data: File[]) => {
                console.log('Fetched files:', data);
                setFiles(data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }, []);

    console.log('files:', files);

    return (
        <div>
            {files.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                    {files.map(file => (
                        <button key={file.id} onClick={() => downloadFile(file.id)} className="bg-black dark:bg-white rounded-full text-white dark:text-black px-4 py-2">
                            {file.filename}
                        </button>
                    ))}
                </div>
            ) : (
                <p>No files available</p>
            )}
        </div>
    );
}

export default FileList;
