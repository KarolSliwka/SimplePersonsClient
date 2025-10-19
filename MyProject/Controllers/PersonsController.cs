using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProject.DbServices;
using MyProject.Models;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        readonly IPersonService personService;
        public PersonsController(IPersonService personService)
        {
            this.personService = personService;
        }
        [HttpPost]
        public async Task<IActionResult> AddPerson(PersonModel person)
        {
            var result = await personService.AddPerson(person);

            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetPersons()
        {
            var result = await personService.GetPersons();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerson(Guid id)
        {
            var result = await personService.GetPerson(id);

            if (result == null)
            {
                return NotFound($"Person with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePerson(PersonModel person)
        {
            var result = await personService.UpdatePerson(person);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var person = await personService.GetPerson(id);

            if (person == null)
            {
                return NotFound($"Person with ID {id} not found.");
            }

            var result = await personService.DeletePerson(person);

            return Ok(result);
        }
    }
}
