public class LogMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _logPath = "/logs/requests.log";

    public LogMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        var log = $"{DateTime.UtcNow} | {context.Request.Method} {context.Request.Path}{Environment.NewLine}";
        Directory.CreateDirectory("/logs");
        await File.AppendAllTextAsync(_logPath, log);
        await _next(context);
    }
}