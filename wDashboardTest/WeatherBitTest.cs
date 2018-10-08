using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using wDashboard.Models;
using wDashboard.Controllers;
using Newtonsoft.Json;

namespace wDashboardTest
{
  [TestClass]
  public class WeatherBitTest
  {
    [TestMethod]
    public void Test_WebWeatherBit_GetTempDaysFromWeather_FoundData()
    {
      WebWeatherBit oWeather = new WebWeatherBit();
      DayTemperature answer = oWeather.GetHistoryTemps("Navojoa", "M");
      Assert.IsTrue(answer.Date.Count > 0);
    }

    [TestMethod]
    public void Test_WebWeatherBit_GetJsonAnswer_valid()
    {
      WebWeatherBit oWeather = new WebWeatherBit();
      PositionCity oPosition = oWeather.GetPositionCity("Navojoa");
      string answer = oWeather.GetTempDaysFromWeather(15,"M", oPosition);
      JObject oJson = JObject.Parse(answer);
      var oValue = oJson.GetValue("city_name");

      Assert.AreEqual("Navojoa", oValue.ToString());
    }

    [TestMethod]
    public void Test_WebWeatherBit_ConvertStringToJsonObject_WrongNoCity()
    {
      WebWeatherBit oWeather = new WebWeatherBit();
      DayTemperature answer = oWeather.GetHistoryTemps("guaymas", "M");

      Assert.AreEqual(0,answer.Date.Count);
;    }
  }
}