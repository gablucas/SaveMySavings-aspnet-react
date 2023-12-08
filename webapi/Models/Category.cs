using System.Text.Json.Serialization;

namespace SaveMySavings.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int TypeId { get; set; }
    public Type Type { get; set; }

    [JsonIgnore]
    public List<Transaction> Transactions { get; set; }
}