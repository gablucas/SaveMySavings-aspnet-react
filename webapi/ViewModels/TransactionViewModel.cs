using SaveMySavings.Models;
using System.ComponentModel.DataAnnotations;

namespace SaveMySavings.ViewModels;

public class TransactionViewModel
{
    [Required(ErrorMessage = "O titulo e obrigatorio")]
    public string Title { get; set; }

    [Required(ErrorMessage = "A data inicial é obrigatória")]
    public DateTime InitialDate { get; set; }

    [Required(ErrorMessage = "A quantidade de parcela é obrigatoria")]
    public int Installments { get; set; }

    [Required(ErrorMessage = "O valor e obrigatorio")]
    public Double Amount { get; set; }

    [Required(ErrorMessage = "Selecione o tipo de transação")]
    public int TransactionType { get; set; }

    [Required(ErrorMessage = "Selecione a categoria da transação")]
    public int TransactionCategory { get; set; }
}