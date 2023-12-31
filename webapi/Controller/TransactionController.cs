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

        try
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

        } catch
        {
            return StatusCode(500, "Falha interna no servidor");
        }
    }

    [HttpPost("v1/transactions")]
    public async Task<IActionResult> PostAsync([FromBody] TransactionViewModel model, [FromServices] SaveMysavingsDataContext context)
    {

        try
        {
            Transaction transaction = new Transaction
            {
                Title = model.Title,
                Amount = model.Amount,
                TypeId = model.TypeId,
                CategoryId = model.CategoryId,
                InitialDate = model.InitialDate,
            };

            await context.Transactions.AddAsync(transaction);
            await context.SaveChangesAsync();

            return Created($"v1/transactions/{transaction.Id}", transaction);

        } catch
        {
            return StatusCode(500, "Falha interna no servidor");
        }


    }

    [HttpPut("v1/transactions/{id:int}")]
    public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] TransactionViewModel model, [FromServices] SaveMysavingsDataContext context)
    {

        try
        {
            var transaction = await context.Transactions.FirstOrDefaultAsync(x => x.Id == id);
            if (transaction == null)
            {
                return NotFound("Transa��o n�o encontrada");
            }

            transaction.Title = model.Title;
            transaction.Amount = model.Amount;
            transaction.TypeId = model.TypeId;
            transaction.CategoryId = model.CategoryId;
            transaction.InitialDate = model.InitialDate;

            context.Transactions.Update(transaction);
            await context.SaveChangesAsync();

            return Ok(transaction);

        } catch
        {
            return StatusCode(500, "Falha interna no servidor");
        }

    }

    [HttpDelete("v1/transactions/{id:int}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id, [FromServices] SaveMysavingsDataContext context)
    {
        try
        {
            var transaction = await context.Transactions.FirstOrDefaultAsync(x => x.Id == id);
            if (transaction == null)
            {
                return NotFound("Transa��o n�o encontrada");
            }

            context.Transactions.Remove(transaction);
            await context.SaveChangesAsync();
            return Ok(transaction);

        } catch
        {
            return StatusCode(500, "Falha interna no servidor");
        }

    }
}