using Flurl.Http;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using SafeSender.StorageAPI.Models;

namespace SafeSender.StorageAPI.Tests.IntegrationTests;

[TestFixture]
public class DownloadFileTests
{
    [Test]
    public async Task DownloadFile_CorrectTokenProvided_ReturnsFile()
    {
        var client = SystemUnderTest.GetClient();
        var uploadedFile = File.ReadAllBytes(@"D:\Programming\CSharp\text.txt");

        using var response = await client.Request(ApiConstants.UploadEndpointUrl).PostJsonAsync(new UploadFileRequestModel
        {
            FileBytes = uploadedFile,
            FileName = "text.txt",
            PasswordHash = Guid.NewGuid().ToString("N"),
        });
        
        response.Headers.TryGetFirst("Location", out var location);
        
        var downloadResponse = await client.Request(location).GetAsync();

        var downloadedFile = await downloadResponse.GetBytesAsync();
        
        Assert.AreEqual(uploadedFile, downloadedFile);
        Assert.AreEqual(downloadResponse.StatusCode, StatusCodes.Status200OK);
    }
}