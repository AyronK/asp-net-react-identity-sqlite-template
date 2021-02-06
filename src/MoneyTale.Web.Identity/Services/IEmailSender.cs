using System.Threading.Tasks;

namespace MoneyTale.Web.Identity.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
}
