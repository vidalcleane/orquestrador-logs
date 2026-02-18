var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var supabaseUrl = builder.Configuration["Supabase:Url"];
var supabaseKey = builder.Configuration["Supabase:Key"];

builder.Services.AddScoped<Supabase.Client>(_ =>
    new Supabase.Client(supabaseUrl, supabaseKey, new Supabase.SupabaseOptions
    {
        AutoRefreshToken = true,
        AutoConnectRealtime = true
    }));

var app = builder.Build();

app.UseMiddleware<LogMiddleware>();
app.MapControllers();
app.Run();