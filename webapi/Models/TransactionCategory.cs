using System.Text.Json.Serialization;

namespace SaveMySavings.Models;

public class TransactionCategory
{
    public int Id { get; set; }
    public string Name { get; set; }

    [JsonIgnore]
    public List<Transaction> Transactions { get; set; }
}