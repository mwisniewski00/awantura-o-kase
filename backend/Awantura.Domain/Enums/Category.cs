using System.ComponentModel;

namespace Awantura.Domain.Enums
{
    public enum Category
    {
        [Description("Geografia")]
        Geogprahy,
        [Description("Astronomia")]
        Astronomy,
        [Description("Biologia")]
        Biology,
        [Description("Chemia")]
        Chemistry,
        [Description("Film polski")]
        PolishCinema,
        [Description("Piłka nożna")]
        Football,
        [Description("Wędkarstwo")]
        Fishing,
        [Description("Polityka")]
        Politics
    }
}
