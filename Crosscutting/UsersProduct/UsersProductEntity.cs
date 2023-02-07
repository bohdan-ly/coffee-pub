using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crosscutting.FavouriteProduct
{
    public class UsersProductEntity : BaseEntity
    {
        public string Username { get; set; }

        public string ProductListJson { get; set; }
    }
}
