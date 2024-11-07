using Microsoft.Extensions.Configuration;

namespace Awantura.Infrastructure.Helpers
{
    public static class ConnectionStringHelper
    {
        public static string GetConnectionString(IConfiguration _configuration, string connectionStringNameDefault)
        {
            var shouldConnectToDockerDb = Environment.GetEnvironmentVariable("CONNECT_TO_DOCKER_DB") == "True";
            var connectionStringName = shouldConnectToDockerDb ? connectionStringNameDefault + "Docker" : connectionStringNameDefault;
            var connectionString = _configuration.GetConnectionString(connectionStringName);

            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException($"Connection string '{connectionStringName}' was not found in the configuration.");
            }

            return connectionString;
        }
    }
}