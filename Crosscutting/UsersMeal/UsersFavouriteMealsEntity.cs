using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crosscutting.UsersMeal
{
    public class UsersFavouriteMealsEntity : BaseEntity
    {
        public string Username { get; set; }

        public string FavoriteMealsJson { get; set; }
    }
}
