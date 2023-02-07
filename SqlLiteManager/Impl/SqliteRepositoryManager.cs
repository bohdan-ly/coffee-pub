using Crosscutting.Extensions;
using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Diagnostics;
using System.Text;

namespace SqlLiteManager.Impl
{
    public class SqliteRepositoryManager : ISqliteRepositoryManager
    {
        private ILogger logger;

        public SqliteRepositoryManager(ILogger<SqliteRepositoryManager> logger)
        {
            this.logger = logger;
        }

        //private readonly string sqlitePath = $"Data Source={GetCurrentDictionary()}";

        public async Task<IEnumerable<T>> QueryAll<T>()
        {
            try
            {
                var tableName = this.GetCleanTableName(typeof(T).Name);
                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                SQLitePCL.Batteries.Init();
                var result = await connection.QueryAsync<T>($"select * from {tableName}");
                return result;
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                var w = e.Message;
                throw new DataException(this.GetCurrentDictionary());
            }

        }

        public async Task<T> GetLastRecord<T>()
        {
            try
            {
                var tableName = this.GetCleanTableName(typeof(T).Name);
                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                SQLitePCL.Batteries.Init();
                var result = await connection.QueryFirstOrDefaultAsync<T>($"select * from {tableName} order by CREATED desc");
                return result;
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                var w = e.Message;
                throw new DataException(this.GetCurrentDictionary());
            }

        }

        public async Task<T> Load<T>(string id)
        {
            try
            {
                var tableName = this.GetCleanTableName(typeof(T).Name);
                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                SQLitePCL.Batteries.Init();
                var result = await connection.QueryFirstAsync<T>($"select * from {tableName} where id = '{id}'");
                return result;
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                throw;
            }

        }

        public async Task Create<T>(T instance)
        {
            try
            {
                var tableName = this.GetCleanTableName(typeof(T).Name);

                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                SQLitePCL.Batteries.Init();
                await connection.OpenAsync();
                var columnText = new List<string>();
                var valueText = new List<object>();
                var isExistBlob = false;
                var blobValue = Array.Empty<byte>();

                foreach (var p in typeof(T).GetProperties())
                {
                    var propertyName = p.Name;
                    var propertyValue = instance.GetType().GetProperty(p.Name)?.GetValue(instance, null);
                    columnText.Add($"'{propertyName}'");
                    if (propertyValue is string strValue)
                    {
                        valueText.Add($"'{strValue.Replace("'", "''")}'");
                    }
                    else if (propertyValue is byte[])
                    {
                        valueText.Add("@content");
                        isExistBlob = true;
                        blobValue = (byte[])propertyValue;
                    }
                    else
                    {
                        valueText.Add($"'{propertyValue}'");
                    }
                }

                await using var command = new SqliteCommand($"INSERT INTO {tableName}({string.Join(",", columnText)}) VALUES({string.Join(",", valueText)})", connection);
                if (isExistBlob)
                {
                    var parameter = new SqliteParameter("@content", System.Data.DbType.Binary);
                    parameter.Value = blobValue;
                    command.Parameters.Add(parameter);
                }

                await command.ExecuteNonQueryAsync();
                await connection.CloseAsync();
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                throw;
            }

        }

        public async Task Update<T>(T instance, string id)
        {
            try
            {
                var tableName = this.GetCleanTableName(typeof(T).Name);

                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                SQLitePCL.Batteries.Init();
                await connection.OpenAsync();
                var setText = new List<string>();

                foreach (var p in typeof(T).GetProperties())
                {
                    var propertyName = p.Name;
                    var propertyValue = instance.GetType().GetProperty(p.Name)?.GetValue(instance, null);
                    setText.Add($"{propertyName} = '{propertyValue}'");
                }

                await using var command = new SqliteCommand($"UPDATE {tableName} SET  {string.Join(",", setText)}  where guid = '{id}'", connection);
                await command.ExecuteNonQueryAsync();
                await connection.CloseAsync();
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                throw;
            }

        }

        public async Task UpdateByUsername<T>(T instance, string username)
        {
            try
            {
                var tableName = this.GetCleanTableName(typeof(T).Name);

                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                SQLitePCL.Batteries.Init();
                await connection.OpenAsync();
                var setText = new List<string>();

                foreach (var p in typeof(T).GetProperties())
                {
                    var propertyName = p.Name;
                    var propertyValue = instance.GetType().GetProperty(p.Name)?.GetValue(instance, null);
                    setText.Add($"{propertyName} = '{propertyValue}'");
                }

                await using var command = new SqliteCommand($"UPDATE {tableName} SET  {string.Join(",", setText)}  where username = '{username}'", connection);
                await command.ExecuteNonQueryAsync();
                await connection.CloseAsync();
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                throw;
            }

        }

        public async Task Delete<T>(string id)
        {
            try
            {
                var tableName = this.GetCleanTableName(typeof(T).Name);

                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                SQLitePCL.Batteries.Init();
                await connection.OpenAsync();
                await using var command = new SqliteCommand($"delete from {tableName} where id = '{id}'", connection);
                await command.ExecuteNonQueryAsync().ConfigureAwait(true);
                await using var vacuumCommand = new SqliteCommand("vacuum", connection);
                await vacuumCommand.ExecuteNonQueryAsync().ConfigureAwait(true);
                await connection.CloseAsync();
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                throw;
            }
        }


        public async Task DeleteByUsername<T>(string username)
        {
            try
            {             
                var tableName = this.GetCleanTableName(typeof(T).Name);

                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                SQLitePCL.Batteries.Init();
                await connection.OpenAsync();
                await using var command = new SqliteCommand($"delete from {tableName} where username = '{username}'", connection);
                await command.ExecuteNonQueryAsync().ConfigureAwait(true);
                await using var vacuumCommand = new SqliteCommand("vacuum", connection);
                await vacuumCommand.ExecuteNonQueryAsync().ConfigureAwait(true);
                await connection.CloseAsync();
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                throw;
            }
        }

        public async Task DeleteAll<T>()
        {
            try
            {
                var tableName = this.GetCleanTableName(typeof(T).Name);
                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                SQLitePCL.Batteries.Init();
                await connection.OpenAsync();

                await using var command = new SqliteCommand($"delete from {tableName}", connection);
                await command.ExecuteNonQueryAsync().ConfigureAwait(true);
                await using var vacuumCommand = new SqliteCommand("vacuum", connection);
                await vacuumCommand.ExecuteNonQueryAsync().ConfigureAwait(true);
                await connection.CloseAsync();
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                throw;
            }
        }


        public async Task<IEnumerable<T>> Query<T>(string query)
        {
            try
            {
                var tableName = this.GetCleanTableName(typeof(T).Name);
                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                SQLitePCL.Batteries.Init();
                var result = await connection.QueryAsync<T>(query);
                return result;
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                throw;
            }

        }
        public async Task ExecuteScript(string command)
        {
            try
            {
                await using var connection = new SqliteConnection(this.GetCurrentDictionary());
                await connection.OpenAsync();
                await using var sqlScript = new SqliteCommand(command, connection);
            }
            catch (Exception e)
            {
                logger.LogError(e.Serialize());
                throw;
            }
        }

        private string GetCleanTableName(string entityName)
        {
            return entityName.Replace("Entity", string.Empty);
        }

        private string GetCurrentDictionary()
        {

            string pathToDb = @"CoffeePubAplicationDb.db";
            var os = Environment.OSVersion;
            if (os.Platform == PlatformID.Unix)
            {
                return $"CoffeePubAplicationDb.db;Cache=Shared;";//$"Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), '{pathToDb};Cache=Shared;')";
            }
            else
            {
                var combined = Path.Combine(Path.GetDirectoryName(Process.GetCurrentProcess().MainModule.FileName), pathToDb);
                return $"Data Source={combined};Cache=Shared;";
            }
        }
    }

    public class SqliteRepositoryManagerConfiguration
    {
        public string PathToDb { get; set; }
    }
}
