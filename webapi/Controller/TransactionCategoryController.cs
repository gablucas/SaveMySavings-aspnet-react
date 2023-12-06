using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaveMySavings.Data;
using SaveMySavings.Models;
using SaveMySavings.ViewModels;

namespace SaveMySavings.Controller;

[ApiController]

public class TransactionCategoryController : ControllerBase
{
    [HttpGet("v1/categories")]
    public async Task<IActionResult> GetAsync([FromServices] SaveMysavingsDataContext context)
    {
        var transactionCategory = await context.TransactionsCategory.AsNoTracking().ToListAsync();
        return Ok(transactionCategory);
    }

    [HttpPost("v1/categories")]
    public async Task<IActionResult> PostAsync([FromBody] TransactionCategoryViewModel model, [FromServices] SaveMysavingsDataContext context)
    {
        var transactionCategory = new TransactionCategory
        {
            Name = model.Name,
        };

        await context.TransactionsCategory.AddAsync(transactionCategory);
        await context.SaveChangesAsync();
        return Created($"v1/transactions-category/{transactionCategory}", transactionCategory);
    }

    [HttpPut("v1/categories/{id:int}")]
    public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] TransactionCategoryViewModel model, [FromServices] SaveMysavingsDataContext context)
    {
        var transactionCategory = await context.TransactionsCategory.FirstOrDefaultAsync(x => x.Id == id);
        if (transactionCategory == null)
        {
            return NotFound("Categoria não encontrada");
        }

        transactionCategory.Name = model.Name;
        context.TransactionsCategory.Update(transactionCategory);
        await context.SaveChangesAsync();
        return Ok(transactionCategory);
    }

    [HttpDelete("v1/categories/{id:int}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id, [FromServices] SaveMysavingsDataContext context)
    {
        var transactionCategory = context.TransactionsCategory.FirstOrDefault(x => x.Id == id);
        if (transactionCategory == null)
        {
            return NotFound("Categoria não encontrada");
        }

        context.TransactionsCategory.Remove(transactionCategory);
        await context.SaveChangesAsync();
        return Ok(transactionCategory);
    }
}