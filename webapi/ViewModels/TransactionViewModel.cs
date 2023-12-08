using SaveMySavings.Models;
using System.ComponentModel.DataAnnotations;

namespace SaveMySavings.ViewModels;

public class TransactionViewModel
{
    [Required(ErrorMessage = "O titulo e obrigatorio")]
    public string Title { get; set; }

    [Required(ErrorMessage = "A data inicial é obrigatória")]
    public DateTime InitialDate { get; set; }

    [Required(ErrorMessage = "O valor e obrigatorio")]
    public Double Amount { get; set; }

    [Required(ErrorMessage = "O Id de Type é obrigatório")]
    public int TypeId { get; set; }

    [Required(ErrorMessage = "O Id de Category é obrigatório")]
    public int CategoryId { get; set; }

    [Required(ErrorMessage = "Selecione a categoria da transação")]
    public int Category { get; set; }
}