using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(training.Startup))]
namespace training
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
