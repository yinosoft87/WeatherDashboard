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
      Assert.IsTrue(answer.date.Length > 0);
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
    public void Test_WebWeatherBit_GetJsonAnswer_unitTemperature()
    {
      WebWeatherBit oWeather = new WebWeatherBit();
      PositionCity oPosition = oWeather.GetPositionCity("Navojoa");

      string answer = oWeather.GetTempDaysFromWeather(1, "I", oPosition);

      JObject oJson = JObject.Parse(answer);
      JToken oValue = oJson.GetValue("data");
      string respuesta = "";
      foreach(var iValue in oValue.Children())
      {
        JObject iJson = JObject.Parse(iValue.ToString());
        respuesta = iJson.GetValue("temp").ToString();
      }
      Assert.AreNotEqual("0", respuesta);
    }

    [TestMethod]
    public void Test_WebWeatherBit_ConvertStringToJsonObject_WrongNoCity()
    {
      WebWeatherBit oWeather = new WebWeatherBit();
      DayTemperature answer = oWeather.GetHistoryTemps("guaymas", "M");

      Assert.AreNotEqual(0,answer.date.Length);
;    }
  }
}