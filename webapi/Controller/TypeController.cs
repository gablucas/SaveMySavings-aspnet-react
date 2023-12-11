using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaveMySavings.Data;
using SaveMySavings.Models;
using SaveMySavings.ViewModels;

namespace SaveMySavings.Controller;

[ApiController]

public class TypeController : ControllerBase
{
    [HttpGet("v1/types")]
    public async Task<IActionResult> GetAsync([FromServices] SaveMysavingsDataContext context)
    {
        try 
        {
            var transactionType = await context.Type.AsNoTracking().ToListAsync();
            return Ok(transactionType);

        } catch
        {
            return StatusCode(500, "Falha interna no servidor");
        }
            
    }
}