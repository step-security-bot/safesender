namespace SafeSender.StorageAPI.Extensions;

/// <summary>
/// Simple types extensions
/// </summary>
public static class SimpleTypesExtensions
{
    // Get byte array length in megabytes
    /// <summary>
    /// Get byte array length in megabytes
    /// </summary>
    /// <param name="bytes">Byte array</param>
    /// <returns>Size of array in Mb</returns>
    public static double GetLengthInMegabytes(this byte[] bytes)
    {
        return bytes.Length / 1024d / 1024d;
    }
}