namespace GentAppApi.Models
{

    public class Commission
    {
        public int Id { get; set; }

        public string DentistCode { get; set; }
        public DateTime DatePaid { get; set; }
        public decimal CommissionAmount { get; set; }
        public decimal Deduction { get; set; }
        public string DeductionRemarks { get; set; }
        // Navigation Property
        public Appointment Appointment { get; set; }

        public Guid? CommisionReference { get; set; }

        public int AppointmentId {get; set;}
    }

}

