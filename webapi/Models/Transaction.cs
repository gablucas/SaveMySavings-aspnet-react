namespace SaveMySavings.Models;

public class Transaction
{
    public int Id { get; set; }
    public string Title { get; set; }
    public Double Amount { get; set; }
    public DateTime InitialDate { get; set; }
    public TransactionType Type { get; set; }
    public TransactionCategory Category { get; set; }
}