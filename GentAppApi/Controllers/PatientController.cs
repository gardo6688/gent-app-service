// Controllers/PatientsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GentAppApi.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PatientsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Patient>> GetPatients(int page, int pageSize, string search = "")
        {
            // Get a subset of patients based on the page number and page size
            var query = _context.Patients.AsQueryable();

            /* Apply search filter if search parameter is provided
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => p.FirstName.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                          p.LastName.Contains(search, StringComparison.OrdinalIgnoreCase));

            }*/

            var totalPatients = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalPatients / pageSize);


            var filteredPatients = query
             .Where(p => (p.FirstName + p.LastName).Replace(" ", "").ToLower().Contains(search.Replace(" ", "").ToLower()))
             .OrderByDescending(q => q.Id)
             .ToList();

            var a = filteredPatients.Skip(page * pageSize);

            var totalResults = filteredPatients.Count();

            var patients = totalResults <= page
                ? filteredPatients
                : filteredPatients.Skip(page * pageSize).Take(pageSize).ToList();

            return Ok(new
            {
                TotalPages = totalPages,
                CurrentPage = page,
                PageSize = pageSize,
                TotalPatients = totalPatients,
                Patients = patients
            });
        }

        [HttpPost]
        public IActionResult AddPatient(Patient patient)
        {
            _context.Patients.Add(patient);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult EditPatient(int id, Patient updatedPatient)
        {
            var patient = _context.Patients.Find(id);
            if (patient == null)
            {
                return NotFound();
            }

            // Update the patient properties
            patient.FirstName = updatedPatient.FirstName;
            patient.LastName = updatedPatient.LastName;
            patient.MiddleName = updatedPatient.MiddleName;
            patient.Address = updatedPatient.Address;
            patient.Email = updatedPatient.Email;
            patient.Picture = updatedPatient.Picture;
            patient.ContactNumber = updatedPatient.ContactNumber;
            
            // ... (other properties)

            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePatient(int id)
        {
            var patient = _context.Patients.Find(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patients.Remove(patient);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("{id}/upload-picture")]
        public async Task<IActionResult> UploadPatientPicture(int id, [FromForm] PatientPictureUploadModel model)
        {
            var patient = _context.Patients.Find(id);
            if (patient == null)
            {
                return NotFound();
            }

            if (model.Picture != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await model.Picture.CopyToAsync(memoryStream);
                    patient.Picture = memoryStream.ToArray();
                }

                _context.SaveChanges();
            }

            return Ok();
        }
    }
}

// Create similar controllers for Appointments and Dentists
