using System.ComponentModel.DataAnnotations;

namespace MyProject.Models
{
    public class PersonModel
    {
        [Key]
        public Guid PersonId { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public int? Age { get; set; }

        public string? PhotoUrl { get; set; }
    }
}
