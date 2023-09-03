using SafeSender.StorageAPI.Models;

namespace SafeSender.StorageAPI.Interfaces;

/// <summary>
/// Files storage repository
/// </summary>
public interface IFilesRepository
{
    /// <summary>
    /// Get file represented by byte array
    /// </summary>
    /// <param name="fileHash">File hash (id)</param>
    /// <returns></returns>
    Task<byte[]> GetFileBytes(string fileHash);
    
    /// <summary>
    /// Save file represented by byte array
    /// </summary>
    /// <param name="fileName">File name with extension</param>
    /// <param name="fileData">File data</param>
    /// <returns>File save information model <see cref="FileSaveInfo"/></returns>
    Task<FileSaveInfo> SaveFileBytes(string fileName, byte[] fileData);
}