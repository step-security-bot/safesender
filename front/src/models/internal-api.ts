export interface InternalApiUploadRequest {
    PasswordHash: string;
    FileName: string;
    ExternalStorageToken: string;
    FileSize?: number;
}

export interface InternalApiUploadResponse {
    token: string;
}


export interface InternalApiDownloadResponse {
    externalStorageToken: string;
    fileName: string;
    fileSize: number;
}