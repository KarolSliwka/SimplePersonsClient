using Microsoft.EntityFrameworkCore;
using MyProject.Models;

namespace MyProject.DbServices
{
    public class PersonService : IPersonService
    {
        readonly AppDbContext db;

        public PersonService(AppDbContext db)
        {
            this.db = db;
        }

        public async Task<PersonModel> AddPerson(PersonModel person)
        {
            await db.Persons.AddAsync(person);
            await db.SaveChangesAsync();

            return person;
        }

        public async Task<List<PersonModel>> GetPersons()
        {
            return await db.Persons.ToListAsync();
        }

        public async Task<string> DeletePerson(PersonModel person)
        {
            db.Persons.Remove(person);
            await db.SaveChangesAsync();

            return "Record was deleted";
        }
        public async Task<PersonModel> GetPerson(Guid id)
        {
            var result = await db.Persons.FindAsync(id);

            return result;
        }
        public async Task<PersonModel> UpdatePerson(PersonModel person)
        {
            db.Entry(person).State = EntityState.Modified;
            await db.SaveChangesAsync();

            return person;
        }
    }
}
