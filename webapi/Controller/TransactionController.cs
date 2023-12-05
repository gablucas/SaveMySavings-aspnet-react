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
    public async Task<IActionResult> GetAsync([FromServices] SaveMysavingsDataContext context)
    {
        var categories = await context.Transactions.Include(x => x.TransactionType).Include(x => x.TransactionCategory).AsNoTracking().ToListAsync();
        return Ok(categories);
    }

    [HttpPost("v1/transactions")]
    public async Task<IActionResult> PostAsync([FromBody] TransactionViewModel model, [FromServices] SaveMysavingsDataContext context)
    {
        var transactionType = await context.TransactionsType.FirstOrDefaultAsync(x => x.Id == model.TransactionType);
        var transactionCategory = await context.TransactionsCategory.FirstOrDefaultAsync(x => x.Id == model.TransactionCategory);

        if (transactionType == null)
        {
            return NotFound($"Tipo não encontrado {model.TransactionType}");
        }
         
        if (transactionCategory == null)
        {
            return NotFound("Categoria não encontrada");
        }

        Transaction transaction = new Transaction(model.Installments)
        {
           Title = model.Title,
           Amount = model.Amount,
           Installments = model.Installments,
           TransactionType = transactionType,
           TransactionCategory = transactionCategory,
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

        var transactionType = await context.TransactionsType.FirstOrDefaultAsync(x => x.Id == model.TransactionType);
        var transactionCategory = await context.TransactionsCategory.FirstOrDefaultAsync(x => x.Id == model.TransactionCategory);

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
        transaction.Installments = model.Installments;
        transaction.TransactionType = transactionType;
        transaction.TransactionCategory = transactionCategory;
        transaction.InitialDate = model.InitialDate;
        transaction.FinalDate = model.InitialDate.AddMonths(model.Installments);

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