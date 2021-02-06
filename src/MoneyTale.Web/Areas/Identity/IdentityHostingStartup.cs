using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(MoneyTale.Web.Areas.Identity.IdentityHostingStartup))]

namespace MoneyTale.Web.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((_, __) => { });
        }
    }
}
