using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace wDashboard.Models
{
  public class WebWeatherBit
  {
    public DayTemperature GetHistoryTemps(string oCiudad, string unit)
    {
      PositionCity oPosCity = GetPositionCity(oCiudad);
      if(oPosCity.lat != 0 && oPosCity.lon != 0)
      {
        string AnswerJSon = GetTempDaysFromWeather(15, unit, oPosCity);
        return ConvertStringToListObject(AnswerJSon);
      }
      return new DayTemperature();
    }

    public PositionCity GetPositionCity(string oCiudad)
    {
      switch (oCiudad)
      {
        case "CdObregon":
          return new PositionCity(-109.9333, 27.4833);
        case "Navojoa":
          return new PositionCity(-109.44391, 27.07015);
        case "Hermosillo":
          return new PositionCity(-110.97732, 29.1026);
        case "Nogales":
          return new PositionCity(-110.94217, 31.30862);
      }
      return new PositionCity(-109.9333, 27.4833);
    }

    public string GetTempDaysFromWeather(int days, string unit, PositionCity posCity)
    {
      try
      {
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://api.weatherbit.io/v2.0/forecast/daily?lat="+
          posCity.lat + "&lon="+ posCity.lon + "&days="+ days + "&units=" +
          unit + "&key=a6514ef14da74157b9a1822a45ea30e3");
        request.Method = "GET";
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        Stream dataStream = response.GetResponseStream();
        StreamReader reader = new StreamReader(dataStream);
        return reader.ReadToEnd();
      }
      catch
      {
        return "";
        //throw new ArgumentException("No get data from weather service.");
      }
    }

    private DayTemperature ConvertStringToListObject(string json)
    {
      JObject oJson = JObject.Parse(json);
      var oValue = oJson.GetValue("data");
      DayTemperature oListTemps = new DayTemperature(oValue.Children().Count());
      int count = 0;
      foreach (var iValue in oValue.Children())
      {
        JObject iJson = JObject.Parse(iValue.ToString());
        oListTemps.date[count] = Convert.ToDateTime(iJson.GetValue("datetime")).ToString("dd/MM/yyyy");
        oListTemps.temperature[count] = Convert.ToInt32(iJson.GetValue("temp"));
        count++;
      }
      return oListTemps;
    }
  }
  public class DayTemperature
  {
    public DayTemperature()
    {

    }
    public DayTemperature(int large)
    {
      date = new string[large];
      temperature = new double[large];
    }

    public string[] date { get; set; }
    public double[] temperature { get; set; }
  }

  public class PositionCity
  {
    public double lon { get;  }
    public double lat { get;  }

    public PositionCity(double Lon, double Lat)
    {
      this.lon = Lon;
      this.lat = Lat;
    }
  }
 
}
