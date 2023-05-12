using Flurl.Http;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using SafeSender.StorageAPI.Models;

namespace SafeSender.StorageAPI.Tests.IntegrationTests;

[TestFixture]
public class UploadFileTests
{
    private const string UploadEndpointUrl = "api/upload";
    
    [Test]
    public async Task UploadFile_FileUploaded_Returns201StatusCode()
    {
        var client = SystemUnderTest.GetClient();

        using var response = await client.Request(UploadEndpointUrl).PostJsonAsync(new UploadFileRequestModel
        {
            FileBytes = File.ReadAllBytes(@"D:\Programming\CSharp\text.txt"),
            FileName = "text.txt",
            PasswordHash = Guid.NewGuid().ToString("N"),
        });
        
        Assert.AreEqual(StatusCodes.Status201Created, response.StatusCode);
    }
}