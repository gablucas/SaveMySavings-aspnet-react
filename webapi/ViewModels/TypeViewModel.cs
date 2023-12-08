using System.ComponentModel.DataAnnotations;

namespace SaveMySavings.ViewModels;

public class TypeViewModel
{
    [Required(ErrorMessage = "O nome e obrigatorio")]
    public string Name { get; set; }
}
