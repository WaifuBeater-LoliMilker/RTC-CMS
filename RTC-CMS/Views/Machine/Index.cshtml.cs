using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using RTC_CMS.Models;
using RTC_CMS.Models.Context;

namespace RTC_CMS.Views.Machine
{
    public class IndexModel : PageModel
    {
        private readonly RTC_CMS.Models.Context.rtc_cmsContext _context;

        public IndexModel(RTC_CMS.Models.Context.rtc_cmsContext context)
        {
            _context = context;
        }

        public IList<Machines> Machines { get;set; } = default!;

        public async Task OnGetAsync()
        {
            Machines = await _context.Machines.ToListAsync();
        }
    }
}
