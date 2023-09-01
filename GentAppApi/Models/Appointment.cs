public class Appointment
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string? ServiceRendered { get; set; }
    public string? PaymentType { get; set; }

    public decimal? PaymentAmount { get; set;  }

    public string? Dentists { get; set; }
    // Foreign Key
    public int PatientId { get; set; }
    // Navigation Property



}