using Crosscutting.Extensions;
using Crosscutting.FavouriteProduct;
using Crosscutting.Product;
using Crosscutting.UsersMeal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SqlLiteManager;

namespace CoffeePubApplication
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly ISqliteRepositoryManager _sqliteRepositoryManager;
        public RecipesController(ISqliteRepositoryManager _sqliteRepositoryManager)
        {
            this._sqliteRepositoryManager = _sqliteRepositoryManager;
        }

        [HttpGet]
        [Route("products")]
        public async Task<List<ProductEntity>> GetProducts()
        {
            try
            {
                var result = await this._sqliteRepositoryManager.QueryAll<ProductEntity>().ConfigureAwait(false);
                return result.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Authorize]
        [HttpGet]
        [Route("userproducts")]
        public async Task<UsersProductModel> GetUsersProduct (string username)
        {
            try
            {
                var querry = $"select * from UsersProduct t where t.username = '{username}'";
                var selection = await this._sqliteRepositoryManager.Query<UsersProductEntity>(querry).ConfigureAwait(false);
                var result = new UsersProductModel()
                {
                    Username = username,
                    Products = JsonConvert.DeserializeObject<Dictionary<string, string>>(selection.FirstOrDefault().ProductListJson)
                };

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Authorize]
        [HttpGet]
        [Route("userfavouritemeals")]
        public async Task<UsersFavouriteMealsModel> GetUsersFavouriteMeals (string username)
        {
            try
            {
                var querry = $"select * from UsersFavouriteMeals t where t.username = '{username}'";
                var selection = await this._sqliteRepositoryManager.Query<UsersFavouriteMealsEntity>(querry).ConfigureAwait(false);
                var result = new UsersFavouriteMealsModel()
                {
                    Username = username,
                    FavoriteMeals = JsonConvert.DeserializeObject<Dictionary<string, int>>(selection.FirstOrDefault().FavoriteMealsJson)
                };

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Authorize]
        [HttpPost]
        [Route("userfavouritemeals")]
        public async Task CreateUserFavouriteMeals(UsersFavouriteMealsModel model)
        {
            var entity = new UsersFavouriteMealsEntity()
            {
                Guid = Guid.NewGuid().ToString(),
                Created = DateTime.Now,
                Username = model.Username,
                FavoriteMealsJson = model.FavoriteMeals.Serialize()
            };
            await this._sqliteRepositoryManager.Create(entity).ConfigureAwait(false);
        }

        [Authorize]
        [HttpPost]
        [Route("userproducts")]
        public async Task CreateUserProducts(UsersProductModel model )
        {
            var entity = new UsersProductEntity()
            {
                Guid = Guid.NewGuid().ToString(),
                Created = DateTime.Now,
                Username = model.Username,
                ProductListJson = model.Products.Serialize()
            };
            await this._sqliteRepositoryManager.Create(entity).ConfigureAwait(false);
        }
        [Authorize]
        [HttpPut]
        [Route("userfavouritemeals")]
        public async Task UpdateUserFavouriteMeals(UsersFavouriteMealsModel model)
        {
            var entity = new UsersFavouriteMealsEntity()
            {
                Guid = Guid.NewGuid().ToString(),
                Created = DateTime.Now,
                Username = model.Username,
                FavoriteMealsJson = model.FavoriteMeals.Serialize()
            };
            await this._sqliteRepositoryManager.UpdateByUsername(entity, entity.Username).ConfigureAwait(false);
        }


        [Authorize]
        [HttpPut]
        [Route("userproducts")]
        public async Task UpdateUserProducts(UsersProductModel model)
        {
            var entity = new UsersProductEntity()
            {
                Guid = Guid.NewGuid().ToString(),
                Created = DateTime.Now,
                Username = model.Username,
                ProductListJson = model.Products.Serialize()
            };
            await this._sqliteRepositoryManager.UpdateByUsername(entity, entity.Username).ConfigureAwait(false);
        }

        [Authorize]
        [HttpDelete]
        [Route("userfavouritemeals")]
        public async Task DeleteFavouriteMeals(string username)
        {
            await this._sqliteRepositoryManager.DeleteByUsername<UsersFavouriteMealsEntity>(username).ConfigureAwait(false);
        }


        [Authorize]
        [HttpDelete]
        [Route("userproducts")]
        public async Task DeleteUserProducts(string username)
        {
            await this._sqliteRepositoryManager.DeleteByUsername<UsersProductEntity>(username).ConfigureAwait(false);
        }
    }
}
