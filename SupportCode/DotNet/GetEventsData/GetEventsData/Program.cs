using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using System.Web.Script.Serialization;

namespace GetEventsData
{
    class Program
    {
        static void Main(string[] args)
        {
            var webDriver = new RemoteWebDriver(new Uri("http://CAM-202D6X1:4444/wd/hub"), DesiredCapabilities.Chrome());
            webDriver.Url = "http://www.cornwall.ac.uk/events/all";
            Thread.Sleep(1000);
            var collegeEvents = GetAllCollegeEvents(webDriver);
            collegeEvents = HelpEnrichData(webDriver, collegeEvents);
            StoreAsJson(collegeEvents, Path.Combine(Environment.CurrentDirectory, "CollegeEvents.json"));
        }

        private static List<CollegeEvent> HelpEnrichData(RemoteWebDriver webDriver, List<CollegeEvent> collegeEvents)
        {
            foreach (var collegeEvent in collegeEvents)
            {
                webDriver.Url = collegeEvent.DetailUrl;
                //var imageCssPath = "html:nth-child(2) > body:nth-child(2) > div#page > section#section-content > div#zone-content-wrapper > div#zone-content > div#region-content > div:nth-child(2) > div#block-system-main > div:nth-child(2) > div:nth-child(2) > article#node-event-38890 > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)";
                //var img = webDriver.FindElementByCssSelector(imageCssPath);
                var images =
                    webDriver.FindElementsByTagName("img").Select(x => x.GetAttribute("src")).Where(x => x != null).
                        ToList();
                images = images.Where(x => x.Contains("event_detail/public/images")).ToList();                
                if (images.FirstOrDefault() != null) collegeEvent.Image = images.First();
            }
            return collegeEvents;
        }


        private static void StoreAsJson(List<CollegeEvent> collegeEvents, string path)
        {
            var json = new JavaScriptSerializer().Serialize(collegeEvents);
            File.WriteAllText(path, json);
        }

        private static void AddDetailsForCollegeEvents(RemoteWebDriver webDriver, List<CollegeEvent> collegeEvents)
        {
            foreach (var collegeEvent in collegeEvents)
            {
                webDriver.Url = collegeEvent.DetailUrl;

            }
        }

        private static List<CollegeEvent> GetAllCollegeEvents(RemoteWebDriver webDriver)
        {
            var collegeEvents = new List<CollegeEvent>();
            IWebElement nextPageButton;
            do
            {
                collegeEvents.AddRange(GetCollegeEventsOnPage(webDriver));
                nextPageButton = webDriver.FindElementsByClassName("pager-next").FirstOrDefault();
                if (nextPageButton != null)
                    webDriver.Url = nextPageButton.FindElement(By.TagName("a")).GetAttribute("href");
            } while (nextPageButton != null);
            return collegeEvents;
        } 

        private static List<CollegeEvent> GetCollegeEventsOnPage(RemoteWebDriver webDriver)
        {
            var collegeEvents = new List<CollegeEvent>();
            var articles = webDriver.FindElementsByTagName("article");
            foreach (var article in articles)
            {
                var titleElement = article.FindElements(By.ClassName("event-title")).First().FindElements(By.TagName("a")).First();
                var title = titleElement.Text.Trim();
                if (!string.IsNullOrWhiteSpace(title))
                {
                    var detailUrl = titleElement.GetAttribute("href");
                    var image =
                        GetOptional(
                            () =>
                            article.FindElements(By.ClassName("event-image")).First().FindElements(By.TagName("img")).First().
                                GetAttribute("src"));
                    var category = article.FindText(By.ClassName("event-category"), By.TagName("a"));
                    var date = article.FindText(By.ClassName("event-date")).Replace("Date", "");
                    var campus = article.FindText(By.ClassName("event-campus"), By.TagName("a"));
                    var location = article.FindText(By.ClassName("event-location")).Replace("Location", "");
                    var description = article.FindText(By.ClassName("event-description"));
                    collegeEvents.Add(new CollegeEvent()
                                          {
                                              DetailUrl = detailUrl,
                                              Title = title,
                                              Image = image,
                                              Category = category,
                                              Date = date,
                                              Campus = campus,
                                              Location = location,
                                              Description = description
                                          });
                }
            }
            return collegeEvents;
        }

        private static string GetOptional(Func<string> func, string defaultValue = "")
        {
            try
            {
                return func();
            }
            catch (Exception)
            {
                return defaultValue;
            }
        }
    }

    internal class CollegeEvent
    {
        public string DetailUrl { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public string Date { get; set; }
        public string Campus { get; set; }
        public string Location { get; set; }
        public GeoLoc GeoLoc { get { return HelpGetGeoLocationFrom(Location); } }

        private GeoLoc HelpGetGeoLocationFrom(string location)
        {
            if (location.Contains("PL25 4DJ")) return new GeoLoc(50.3464922, -4.7850022);
            if (location.Contains("PL12 4AE")) return new GeoLoc(50.4055478, -4.2279294);
            if (location.Contains("PL17 8PB")) return new GeoLoc(50.5461939, -4.3212666);
            if (location.Contains("TR15 3RD")) return new GeoLoc(50.2268425, -5.2758395);
            if (location.Contains("TR7 2LZ")) return new GeoLoc(50.4105492, -5.0682225);
            if (location.Contains("TR14 0AB")) return new GeoLoc(50.223385, -5.3013473);
            if (location.Contains("TR11 3QS")) return new GeoLoc(50.152897, -5.074243);
            if (location.Contains("PL24 2SG")) return new GeoLoc(50.359595, -4.742785);
            else throw new NotImplementedException(string.Format("GeoLoc for postcode not defined '{0}'", location.Split(',').Last()));
        }

        public string Description { get; set; }
    }

    internal class GeoLoc
    {
        public GeoLoc (double lat, double lng)
        {
            Lat = lat;
            Lng = lng;
        }

        public double Lat { get; set; }
        public double Lng { get; set; }
    }

    static class Help
    {
        internal static string FindText(this ISearchContext element, params By[] bys)
        {
            var context = element;
            foreach (var by in bys)
            {
                context = context.FindElements(by).First();
            }
            return ((IWebElement)context).Text.Trim();
        }
    }
}
