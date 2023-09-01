public class Patient
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? MiddleName { get; set; }
    public string? Address { get; set; }
    public string? ContactNumber { get; set; }
    public string? Email { get; set; }
    public byte[]? Picture { get; set; }

    // Navigation Property
    public ICollection<Appointment>? Appointments { get; set; }
}

public class PatientPictureUploadModel
{
    public IFormFile Picture { get; set; }
}