// Controllers/PatientsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GentAppApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{patientId}")]
        public ActionResult<IEnumerable<Appointment>> GetPatientAppointments(int patientId)
        {
            var appointments = _context.Appointments
                .Where(p => p.PatientId == patientId)
                .ToList();
            return appointments;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Appointment>> GetAppointmentsByDentist(string dentistCode, DateTime startDate, DateTime endDate)
        {
            var commissions = _context.Commissions.Where(p => p.DentistCode == dentistCode).Select(q => q.AppointmentId);
            var appointments = _context.Appointments
                .Where(p => p.Dentists.Contains(dentistCode) && p.PaymentAmount > 0 && p.ServiceRendered != null && p.Date >= startDate && p.Date <= endDate && !commissions.Contains(p.Id))
                .ToList();
            return appointments;
        }


        [HttpPost]
        public IActionResult AddAppointment(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult EditAppointment(int id, Appointment updateAppointment)
        {
            var appoointment = _context.Appointments.Find(id);
            if (appoointment == null)
            {
                return NotFound();
            }

            appoointment.PatientId = updateAppointment.PatientId;
            appoointment.Date = updateAppointment.Date;
            appoointment.ServiceRendered = updateAppointment.ServiceRendered;
            appoointment.PaymentAmount = updateAppointment.PaymentAmount;
            appoointment.PaymentType = updateAppointment.PaymentType;
            appoointment.Dentists = updateAppointment.Dentists;



            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAppointment(int id)
        {
            var appointment = _context.Appointments.Find(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointment);
            _context.SaveChanges();
            return Ok();
        }
    }
}


