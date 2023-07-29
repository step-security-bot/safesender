export interface InternalApiUploadRequest {
    PasswordHash: string;
    FileName: string;
    ExternalStorageToken: string;
    OriginalFileSize?: number;
}

export interface InternalApiUploadResponse {
    token: string;
}


export interface InternalApiDownloadResponse {
    externalStorageToken: string;
    fileName: string;
    originalFileSize: number;
}