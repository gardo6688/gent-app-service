using GentAppApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GentAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComissionController : Controller
    {
        private readonly AppDbContext _context;
        public ComissionController(AppDbContext context)
        {
            _context = context;
        }
        /* [HttpGet]
         public ActionResult<IEnumerable<Commission>> GetCommisions(Guid referenceCode)
         {
             return _context.Commissions
                 .Where(p => p.CommisionReference == referenceCode)
                 .Include(q => q.Appointment)
                 .ToList();

         }*/
        [HttpGet("{dentistCode}")]
        public IActionResult GetDentistCommissionInfo(string dentistCode)
        {
            var commissionInfo = _context.Commissions
                .Where(p => p.DentistCode == dentistCode)
                .GroupBy(q => q.CommisionReference)
                .Select(r => new
                {
                    Id = r.Key,
                    StartDate = r.Min(s => s.Appointment.Date),
                    EndDate = r.Max(t => t.Appointment.Date),
                    Amount = r.Sum(u => u.CommissionAmount + u.Deduction),
                    DatePaid = r.FirstOrDefault() != null ? r.FirstOrDefault().DatePaid : DateTime.Now
                }) 
                .ToList(); // Execute the query and convert to a list

            return Json(commissionInfo);
        }

        [HttpPost]
        public IActionResult SaveCommisions([FromBody] IEnumerable<Commission> commissions)
        {
            if(commissions.Count() > 0)
            {
                var guid = Guid.NewGuid();
                foreach(var commission in commissions)
                {
                    commission.DatePaid = DateTime.Now;
                    commission.CommisionReference = guid;
                    commission.AppointmentId = commission.Appointment.Id;
                    commission.Appointment = null;
                }
                try
                {
                    _context.Commissions.AddRange(commissions);
                    _context.SaveChanges();

                    return Ok("Commissions saved successfully.");
                }
                catch (Exception ex)
                {
                    // Handle any exceptions, log them, and return an error response
                    return BadRequest($"Error saving commissions: {ex.Message}");
                }
            }
            else
            {
                return Ok("Commissions saved successfully.");
            }
        }
    }
}
