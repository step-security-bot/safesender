namespace SafeSenderApi.Interfaces;

public interface IFilesRepository
{
    Task<byte[]> GetFileBytes(string fileName);
    void SaveFileBytes(string fileName, byte[] fileData);
}