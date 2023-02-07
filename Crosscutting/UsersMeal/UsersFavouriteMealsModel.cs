using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crosscutting.UsersMeal
{
    public class UsersFavouriteMealsModel
    {
        public string Username { get; set; }

        public Dictionary<string, int> FavoriteMeals { get; set; } = new Dictionary<string, int>();
    }
}
