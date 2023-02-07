using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crosscutting.FavouriteProduct
{
    public class UsersProductModel
    {
        public string Username { get; set; }

        public Dictionary<string, string> Products { get; set;} = new Dictionary<string, string>();
    }
}
