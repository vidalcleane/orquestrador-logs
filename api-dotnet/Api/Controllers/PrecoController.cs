using Microsoft.AspNetCore.Mvc;
using Supabase;

[ApiController]
[Route("webhook")]
public class PrecoController : ControllerBase
{
    private readonly Client _supabase;
    private readonly double _precoMinimo;

    public PrecoController(Client supabase, IConfiguration config)
    {
        _supabase = supabase;
        _precoMinimo = config.GetValue<double>("PrecoMinimo");
    }

    [HttpPost("preco")]
    public async Task<IActionResult> ReceberPreco([FromBody] PrecoDto dto)
    {
        if (dto.Preco > _precoMinimo)
        {
            var registro = new Preco { Valor = dto.Preco, CriadoEm = DateTime.UtcNow };
            await _supabase.From<Preco>().Insert(registro);
        }
        return Ok(new { mensagem = "Recebido", valor = dto.Preco });
    }

    [HttpPost("zerar")]
    public async Task<IActionResult> ZerarCache()
    {
        await _supabase.From<Preco>().Delete();
        return Ok(new { mensagem = "Tabela zerada!" });
    }
}

public class PrecoDto
{
    public double Preco { get; set; }
}