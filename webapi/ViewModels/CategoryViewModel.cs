using System.ComponentModel.DataAnnotations;

namespace SaveMySavings.ViewModels;

public class CategoryViewModel
{
    [Required(ErrorMessage = "O nome e obrigatorio")]
    public string Name { get; set; }

    [Required(ErrorMessage = "O Id de Type e obrigatorio")]
    public int TypeId { get; set; }
}