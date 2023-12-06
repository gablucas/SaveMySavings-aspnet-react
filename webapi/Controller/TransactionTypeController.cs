using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaveMySavings.Data;
using SaveMySavings.Models;
using SaveMySavings.ViewModels;

namespace SaveMySavings.Controller;

[ApiController]

public class TransactionTypeController : ControllerBase
{
    [HttpGet("v1/types")]
    public async Task<IActionResult> GetAsync([FromServices] SaveMysavingsDataContext context)
    {
            var transactionType = await context.TransactionsType.AsNoTracking().ToListAsync();
            return Ok(transactionType);
    }
}