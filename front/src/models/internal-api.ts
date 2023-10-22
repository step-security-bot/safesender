export interface InternalApiUploadRequest {
    PasswordHash: string;
    FileName: string;
    OriginalFileSize?: number;
    FileData: Uint8Array;
}

export interface InternalApiUploadResponse {
    token: string;
}


export interface InternalApiDownloadResponse {
    FileName: string;
    FileData: string | number[] | any;
    OriginalFileSize: number;
    PasswordHash: string;
}