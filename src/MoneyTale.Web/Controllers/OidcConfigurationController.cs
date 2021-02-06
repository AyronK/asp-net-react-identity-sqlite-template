using System.Collections.Generic;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Mvc;

namespace MoneyTale.Web.Controllers
{
    public class OidcConfigurationController : Controller
    {
        public OidcConfigurationController(IClientRequestParametersProvider clientRequestParametersProvider)
        {
            ClientRequestParametersProvider = clientRequestParametersProvider;
        }

        public IClientRequestParametersProvider ClientRequestParametersProvider { get; }

        [HttpGet("_configuration/{clientId}")]
        public IActionResult GetClientRequestParameters([FromRoute] string clientId)
        {
            IDictionary<string, string> parameters = ClientRequestParametersProvider
                .GetClientParameters(HttpContext, clientId);

            return Ok(parameters);
        }
    }
}
