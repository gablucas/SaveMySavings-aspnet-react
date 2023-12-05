using System.ComponentModel.DataAnnotations;

namespace SaveMySavings.ViewModels;

public class TransactionCategoryViewModel
{
    [Required(ErrorMessage = "O nome e obrigatorio")]
    public string Name { get; set; }
}