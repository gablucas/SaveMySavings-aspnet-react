using SaveMySavings.Models;
using System.ComponentModel.DataAnnotations;

namespace SaveMySavings.ViewModels;

public class TransactionViewModel
{
    [Required(ErrorMessage = "O titulo e obrigatorio")]
    public string Title { get; set; }

    [Required(ErrorMessage = "A data inicial � obrigat�ria")]
    public DateTime InitialDate { get; set; }

    [Required(ErrorMessage = "A quantidade de parcela � obrigatoria")]
    public int Installments { get; set; }

    [Required(ErrorMessage = "O valor e obrigatorio")]
    public Double Amount { get; set; }

    [Required(ErrorMessage = "Selecione o tipo de transa��o")]
    public int TransactionType { get; set; }

    [Required(ErrorMessage = "Selecione a categoria da transa��o")]
    public int TransactionCategory { get; set; }
}