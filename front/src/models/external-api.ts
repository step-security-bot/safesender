export interface ExternalUploadApiResponse {
    data: {
        file: {
            url: {
                full: string;
                short: string;
            }
        }   
    },
    status: boolean;
}