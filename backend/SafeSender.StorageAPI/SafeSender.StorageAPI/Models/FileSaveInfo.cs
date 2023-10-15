namespace SafeSender.StorageAPI.Models;

/// <summary>
/// File save information model
/// </summary>
/// <param name="Status">Saving status</param>
/// <param name="StorageFileIdentifier">Token</param>
public record struct FileSaveInfo(bool Status, string StorageFileIdentifier);