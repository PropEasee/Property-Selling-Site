using Serilog;

namespace LoggingService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // STEP 1: Configure Serilog FIRST (before app starts)
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.File(
                    "logs/log-.txt",
                    rollingInterval: RollingInterval.Day
                )
                .CreateLogger();

            try
            {
                var builder = WebApplication.CreateBuilder(args);

                // STEP 2: Tell ASP.NET Core to use Serilog
                builder.Host.UseSerilog();

                // STEP 3: Add services to the container
                builder.Services.AddControllers();
                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen();

                var app = builder.Build();

                // STEP 4: Configure HTTP pipeline
                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                app.UseAuthorization();

                app.MapControllers();

                // STEP 5: Start the application
                app.Run();
            }
            catch (Exception ex)
            {
                // If app fails to start, log the error
                Log.Fatal(ex, "Logging Service failed to start");
            }
            finally
            {
                // Ensure logs are flushed
                Log.CloseAndFlush();
            }
        }
    }
}
