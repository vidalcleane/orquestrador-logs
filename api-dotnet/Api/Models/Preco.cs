using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

[Table("precos")]
public class Preco : BaseModel
{
    [PrimaryKey("id")]
    public int Id { get; set; }

    [Column("valor")]
    public double Valor { get; set; }

    [Column("criado_em")]
    public DateTime CriadoEm { get; set; }
}