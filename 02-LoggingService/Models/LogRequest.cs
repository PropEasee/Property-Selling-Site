namespace LoggingService.Models
{
    public class LogRequest
    {
        public string Service { get; set; }
        public string Level { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
