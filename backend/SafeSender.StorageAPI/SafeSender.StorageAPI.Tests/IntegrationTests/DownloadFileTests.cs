using System.Text;
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
        var uploadedFileMock = Encoding.UTF8.GetBytes("mock test string 123");
        
        using var response = await client.Request(ApiConstants.UploadEndpointUrl).PostJsonAsync(new UploadFileRequestModel
        {
            FileBytes = uploadedFileMock,
            FileName = "text.txt",
            PasswordHash = Guid.NewGuid().ToString("N"),
        });
        
        response.Headers.TryGetFirst("Location", out var location);
        
        var downloadResponse = await client.Request(location).GetAsync();

        var downloadedFile = await downloadResponse.GetBytesAsync();
        
        Assert.AreEqual(uploadedFileMock, downloadedFile);
        Assert.AreEqual(downloadResponse.StatusCode, StatusCodes.Status200OK);
    }
}