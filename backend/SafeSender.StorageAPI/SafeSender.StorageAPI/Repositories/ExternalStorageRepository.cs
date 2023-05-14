using AnonFilesApi.Interfaces;
using AnonFilesApi.Models;
using SafeSender.StorageAPI.Interfaces;
using SafeSender.StorageAPI.Models;

namespace SafeSender.StorageAPI.Repositories;

/// <summary>
/// External storage repository
/// </summary>
public class ExternalStorageRepository : IFilesRepository
{
    private readonly ILogger<ExternalStorageRepository> _logger;
    private readonly IAnonfilesApiClient _apiClient;

    /// <summary>
    /// Constructor for <see cref="ExternalStorageRepository"/>
    /// </summary>
    /// <param name="logger">Logger</param>
    /// <param name="apiClient">External storage api client</param>
    public ExternalStorageRepository(ILogger<ExternalStorageRepository> logger, IAnonfilesApiClient apiClient)
    {
        _logger = logger;
        _apiClient = apiClient;
    }

    /// <inheritdoc />
    public async Task<byte[]> GetFileBytes(string fileHash)
    {
        return await _apiClient.DownloadFileByHashAsync(fileHash);
    }

    /// <inheritdoc />
    public async Task<FileSaveInfo> SaveFileBytes(string fileName, byte[] fileData)
    {
        var response = await _apiClient.UploadFileAsync(fileData, fileName);
        return new FileSaveInfo(response.Status, response.Data.File.Metadata.Id);
    }
}