using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaveMySavings.Data;
using SaveMySavings.ViewModels;
using SaveMySavings.Models;

namespace SaveMySavings.Controller;

[ApiController]
public class TransactionController : ControllerBase
{
    [HttpGet("v1/transactions")]
    public async Task<IActionResult> GetByIdAsync(
        [FromQuery] int? type, 
        [FromQuery] int? category, 
        [FromQuery] double? minAmount, 
        [FromQuery] double? maxAmount,
        [FromQuery] DateTime? minDate,
        [FromQuery] DateTime? maxDate,
        [FromServices] SaveMysavingsDataContext context)
    {
        IQueryable<Transaction> categoriesQuery = context.Transactions
            .Include(x => x.Type)
            .Include(x => x.Category);

        if (type != null)
        {
            categoriesQuery = categoriesQuery.Where(x => x.Type.Id == type);
        }

        if (category != null)
        {
            categoriesQuery = categoriesQuery.Where(x => x.Category.Id == category);
        }

        if (minAmount != null)
        {
            categoriesQuery = categoriesQuery.Where(x => x.Amount >= minAmount);
        }

        if (maxAmount != null)
        {
            categoriesQuery = categoriesQuery.Where(x => x.Amount <= maxAmount);
        }

        if (minDate != null)
        {
            categoriesQuery = categoriesQuery.Where(x => x.InitialDate >= minDate);
        }

        if (maxDate != null)
        {
            categoriesQuery = categoriesQuery.Where(x => x.InitialDate <= maxDate);
        }


        var categories = await categoriesQuery
            .OrderBy(x => x.InitialDate)
            .AsNoTracking()
            .ToListAsync();
 
        return Ok(categories);
    }

    [HttpPost("v1/transactions")]
    public async Task<IActionResult> PostAsync([FromBody] TransactionViewModel model, [FromServices] SaveMysavingsDataContext context)
    {
        var transactionType = await context.TransactionsType.FirstOrDefaultAsync(x => x.Id == model.Type);
        var transactionCategory = await context.TransactionsCategory.FirstOrDefaultAsync(x => x.Id == model.Category);

        if (transactionType == null)
        {
            return NotFound($"Tipo não encontrado {model.Type}");
        }
         
        if (transactionCategory == null)
        {
            return NotFound("Categoria não encontrada");
        }

        Transaction transaction = new Transaction
        {
           Title = model.Title,
           Amount = model.Amount,
           Type = transactionType,
           Category = transactionCategory,
           InitialDate = model.InitialDate,
        };

        await context.Transactions.AddAsync(transaction);
        await context.SaveChangesAsync();

        return Created($"v1/transactions/{transaction.Id}", transaction);
    }

    [HttpPut("v1/transactions/{id:int}")]
    public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] TransactionViewModel model, [FromServices] SaveMysavingsDataContext context)
    {
        var transaction = await context.Transactions.FirstOrDefaultAsync(x => x.Id == id);
        if (transaction == null)
        {
            return NotFound("Transação não encontrada");
        }

        var transactionType = await context.TransactionsType.FirstOrDefaultAsync(x => x.Id == model.Type);
        var transactionCategory = await context.TransactionsCategory.FirstOrDefaultAsync(x => x.Id == model.Category);

        if (transactionType == null)
        {
            return NotFound("Conteudo nao encontrado");
        }

        if (transactionCategory == null)
        {
            return NotFound("Conteudo nao encontrado");
        }

        transaction.Title = model.Title;
        transaction.Amount = model.Amount;
        transaction.Type = transactionType;
        transaction.Category = transactionCategory;
        transaction.InitialDate = model.InitialDate;

        context.Transactions.Update(transaction);
        await context.SaveChangesAsync();

        return Ok(transaction);
    }

    [HttpDelete("v1/transactions/{id:int}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id, [FromServices] SaveMysavingsDataContext context)
    {
        var transaction = await context.Transactions.FirstOrDefaultAsync(x => x.Id == id);
        if (transaction == null)
        {
            return NotFound("Transação não encontrada");
        }

        context.Transactions.Remove(transaction);
        await context.SaveChangesAsync();
        return Ok(transaction);
    }
}