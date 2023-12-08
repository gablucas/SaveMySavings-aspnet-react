using System.Text.Json.Serialization;

namespace SaveMySavings.Models;

public class Type
{
    public int Id { get; set; }
    public string Name { get; set; }

    [JsonIgnore]
    public List<Category> Categories { get; set; }

    [JsonIgnore]
    public List<Transaction> Transactions { get; set; }
}