using System.ComponentModel.DataAnnotations;

namespace SaveMySavings.ViewModels;

public class TransactionTypeViewModel
{
    [Required(ErrorMessage = "O nome e obrigatorio")]
    public string Name { get; set; }
}
