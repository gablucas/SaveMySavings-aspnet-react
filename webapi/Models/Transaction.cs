namespace SaveMySavings.Models;

public class Transaction
{
    public Transaction() { }   

    public Transaction(int installments)
    {
        Installments = installments;
        FinalDate = InitialDate.AddMonths(installments);
    }

    public int Id { get; set; }
    public string Title { get; set; }
    public Double Amount { get; set; }
    public int Installments { get; set; }
    public DateTime InitialDate { get; set; }
    public DateTime FinalDate { get; set; }
    public TransactionType TransactionType { get; set; }
    public TransactionCategory TransactionCategory { get; set; }
}