using SafeSender.StorageAPI.Models.Enums;

namespace SafeSender.StorageAPI.Options;

/// <summary>
/// Storage options
/// </summary>
public class StorageOptions
{
    /// <summary>
    /// Path to settings section
    /// </summary>
    public static string SettingsPath => "Application:StorageOptions";

    /// <summary>
    /// Storage type
    /// </summary>
    public StorageType Type { get; set; }

    public LocalStorageOptions Local { get; set; } = new();
}