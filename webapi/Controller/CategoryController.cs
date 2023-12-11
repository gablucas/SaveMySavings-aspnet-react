using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaveMySavings.Data;
using SaveMySavings.Models;
using SaveMySavings.ViewModels;

namespace SaveMySavings.Controller;

[ApiController]

public class CategoryController : ControllerBase
{
    [HttpGet("v1/categories")]
    public async Task<IActionResult> GetAsync([FromServices] SaveMysavingsDataContext context)
    {
        try
        {
            var category = await context.Category.AsNoTracking().ToListAsync();
            return Ok(category);

        } catch
        {
            return StatusCode(500, "Falha interna no servidor");
        }
    }

    [HttpGet("v1/categories/type/{id:int}")]
    public async Task<IActionResult> GetAsync([FromRoute] int id ,[FromServices] SaveMysavingsDataContext context)
    {
        try
        {
            var category = await context.Category.Where(x => x.TypeId == id).AsNoTracking().ToListAsync();
            return Ok(category);

        } catch
        {
            return StatusCode(500, "Falha interna no servidor");
        }
    }

    [HttpPost("v1/categories")]
    public async Task<IActionResult> PostAsync([FromBody] CategoryViewModel model, [FromServices] SaveMysavingsDataContext context)
    {
        try
        {
            var transactionCategory = new Category
            {
                Name = model.Name,
            };

            await context.Category.AddAsync(transactionCategory);
            await context.SaveChangesAsync();
            return Created($"v1/transactions-category/{transactionCategory}", transactionCategory);

        } catch
        {
            return StatusCode(500, "Falha interna no servidor");
        }
    }

    [HttpPut("v1/categories/{id:int}")]
    public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] CategoryViewModel model, [FromServices] SaveMysavingsDataContext context)
    {

        try
        {
            var transactionCategory = await context.Category.FirstOrDefaultAsync(x => x.Id == id);
            if (transactionCategory == null)
            {
                return NotFound("Categoria não encontrada");
            }

            transactionCategory.Name = model.Name;
            context.Category.Update(transactionCategory);
            await context.SaveChangesAsync();
            return Ok(transactionCategory);

        } catch
        {
            return StatusCode(500, "Falha interna no servidor");
        }
    }

    [HttpDelete("v1/categories/{id:int}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id, [FromServices] SaveMysavingsDataContext context)
    {
        try
        {
            var transactionCategory = context.Category.FirstOrDefault(x => x.Id == id);
            if (transactionCategory == null)
            {
                return NotFound("Categoria não encontrada");
            }

            context.Category.Remove(transactionCategory);
            await context.SaveChangesAsync();
            return Ok(transactionCategory);

        } catch
        {
            return StatusCode(500, "Falha interna no servidor");
        }
    }
}