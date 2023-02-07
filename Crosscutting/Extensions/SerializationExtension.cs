using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Formatting = Newtonsoft.Json.Formatting;

namespace Crosscutting.Extensions
{
    public static class SerializationExtension
    {
        public static void ApplyDefault(this JsonSerializerSettings settings)
        {
            settings ??= new JsonSerializerSettings();

            var formating = Formatting.None;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            settings.NullValueHandling = NullValueHandling.Ignore;
            settings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());

#if DEBUG
            formating = Formatting.Indented;
#endif
            settings.Formatting = formating;
        }

        public static string Serialize<T>(this T value)
        {
            var settings = new JsonSerializerSettings();
            settings.ApplyDefault();

            var json = JsonConvert.SerializeObject(value, settings);
            return json;
        }

        public static T Deserialize<T>(this string json)
        {
            var value = json != null ? JsonConvert.DeserializeObject<T>(json) : default(T);
#pragma warning disable CS8603
            return value;
#pragma warning restore CS8603
        }
    }
}
