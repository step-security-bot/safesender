using System.Diagnostics;
using SafeSender.StorageAPI.Interfaces;

namespace SafeSender.StorageAPI.Repositories;

public class FileSystemRepository : IFilesRepository
{
    private readonly string _fileStoragePath;

    public FileSystemRepository(string fileStoragePath)
    {
        _fileStoragePath = fileStoragePath;
    }

    public async Task<byte[]> GetFileBytes(string fileName)
    {
        var fullPath = _fileStoragePath + Path.DirectorySeparatorChar + fileName;
        return await File.ReadAllBytesAsync(fullPath);
    }

    public void SaveFileBytes(string fileName, byte[] fileData)
    {
        if (string.IsNullOrEmpty(fileName))
        {
            throw new ArgumentException("fileName cannot be null or empty.", nameof(fileName));
        }
        
        try
        {
            File.WriteAllBytes(_fileStoragePath, fileData);
        }
        catch (Exception e)
        {
            Console.WriteLine($"File saving failed. Message: {e.Message}");
            Debug.WriteLine(
                $"File saving failed. Message: {e.Message}. Stack trace: {e.StackTrace}. Inner exception: {e.InnerException}");
            throw;
        }
    }
}