using AgriRegistry.Services;
using Microsoft.AspNetCore.Mvc;

namespace AgriRegistry.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TransactionExampleController : ControllerBase
{
    private readonly TransactionServiceExample _transactionService;

    public TransactionExampleController(TransactionServiceExample transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpPost("execute-transaction-example")]
    public async Task<IActionResult> ExecuteTransaction()
    {
        try
        {
            await _transactionService.ExecuteLocationTransactionAsync();
            return Ok("Transaction executed successfully.");
        }
        catch (Exception ex)
        {
            return BadRequest($"Transaction failed: {ex.Message}");
        }
    }
}
