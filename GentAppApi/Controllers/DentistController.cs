// Controllers/PatientsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GentAppApi.Models;
using System.Collections.Generic;
using System.Linq;


namespace GentAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DentistController : Controller
    {
        private readonly AppDbContext _context;

        public DentistController(AppDbContext context)
        {
            _context = context; 
        }

        [HttpGet]
        public ActionResult<IEnumerable<Dentist>> GetDentists()
        {
            return _context.Dentists.ToList();
        }

        [HttpPost]
        public IActionResult AddDentist(Dentist dentist)
        {
            _context.Dentists.Add(dentist);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult EditDentist(int id, Dentist updateDentist)
        {
            var dentist = _context.Dentists.Find(id);
            if (dentist == null)
            {
                return NotFound();
            }

            dentist.Code = updateDentist.Code;
            dentist.Name = updateDentist.Name;

            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDentist(int id)
        {
            var dentist = _context.Dentists.Find(id);
            if (dentist == null)
            {
                return NotFound();
            }

            _context.Dentists.Remove(dentist);
            _context.SaveChanges();
            return Ok();
        }
    }
}
