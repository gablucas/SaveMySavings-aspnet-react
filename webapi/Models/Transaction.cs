namespace SaveMySavings.Models;

public class Transaction
{
    public int Id { get; set; }
    public string Title { get; set; }
    public Double Amount { get; set; }
    public DateTime InitialDate { get; set; }
    public int TypeId { get; set; }
    public int CategoryId { get; set; }
    public Type Type { get; set; }
    public Category Category { get; set; }
}