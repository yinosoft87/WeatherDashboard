using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using wDashboard.Models;

namespace wDashboard.Controllers
{
  [Produces("application/json")]
  [Route("api/[controller]")]
  public class WeatherBitController : Controller
  {
    [HttpGet("[action]")]
    public DayTemperature GetListTemperatures(string cityName)
    {
      WebWeatherBit oWeatherBit = new WebWeatherBit();
      return oWeatherBit.GetHistoryTemps(cityName, "M");
    }

  }
}
