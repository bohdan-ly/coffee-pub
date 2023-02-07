namespace SqlLiteManager
{
    public interface ISqliteRepositoryManager
    {
        Task<IEnumerable<T>> QueryAll<T>();

        Task<T> Load<T>(string id);

        Task Create<T>(T instance);

        Task Update<T>(T instance, string id);

        Task UpdateByUsername<T>(T instance, string username);

        Task Delete<T>(string id);

        Task DeleteByUsername<T>(string username);

        Task<IEnumerable<T>> Query<T>(string query);

    }
}