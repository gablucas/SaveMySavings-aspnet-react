using SaveMySavings.Models;
using System.ComponentModel.DataAnnotations;

namespace SaveMySavings.ViewModels;

public class TransactionViewModel
{
    [Required(ErrorMessage = "O titulo e obrigatorio")]
    public string Title { get; set; }

    [Required(ErrorMessage = "A data inicial � obrigat�ria")]
    public DateTime InitialDate { get; set; }

    [Required(ErrorMessage = "O valor e obrigatorio")]
    public Double Amount { get; set; }

    [Required(ErrorMessage = "O Id de Type � obrigat�rio")]
    public int TypeId { get; set; }

    [Required(ErrorMessage = "O Id de Category � obrigat�rio")]
    public int CategoryId { get; set; }

    [Required(ErrorMessage = "Selecione a categoria da transa��o")]
    public int Category { get; set; }
}