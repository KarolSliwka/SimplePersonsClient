using MyProject.Models;

namespace MyProject.DbServices
{
    public interface IPersonService
    {
        Task<PersonModel> AddPerson(PersonModel person);

        Task<List<PersonModel>> GetPersons();

        Task<PersonModel> GetPerson(Guid id);

        Task<PersonModel>UpdatePerson(PersonModel person);

        Task<string> DeletePerson(PersonModel person);
    }
}
