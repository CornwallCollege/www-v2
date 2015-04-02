using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
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
            var collegeEvents = GetAllCollegeEvents(webDriver);
            collegeEvents = EnrichWithDetails(webDriver, collegeEvents);
            StoreAsJson(collegeEvents, Path.Combine(@"C:\Git\www-v2\data", "CollegeEvents.json"));
        }

        private static List<CollegeEvent> EnrichWithDetails(RemoteWebDriver webDriver, List<CollegeEvent> collegeEvents)
        {
            foreach (var collegeEvent in collegeEvents)
            {
                webDriver.Url = collegeEvent.DetailUrl;
                collegeEvent.Title = webDriver.FindText(By.Id("page-title"));
                collegeEvent.Image =
                    webDriver.FindElementByCssSelector("ARTICLE>DIV:nth-of-type(1)>DIV:nth-of-type(2)>DIV>DIV>DIV>IMG").GetAttribute("src");
                //var image = Help.LoadImageFromUrl(collegeEvent.Image);                
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
                                              Date = DateTime.Parse(date).ToString("dd MMM yyy"),
                                              Campus = campus,
                                              Location = location,
                                              GeoLoc = Help.PostCodeGeoLocs[location.Split(',').Last().Trim()],
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
        public GeoLoc GeoLoc { get; set; }
        public string Description { get; set; }
    }
    
    internal class GeoLoc
    {
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
            return ((IWebElement)context).Text.Trim().TrimStart(Environment.NewLine.ToCharArray()).TrimEnd(Environment.NewLine.ToCharArray());
        }

        internal static Dictionary<string,GeoLoc> PostCodeGeoLocs {get
        {
            var locs = new Dictionary<string, GeoLoc>();
            locs.Add("TR15 3RD", new GeoLoc() { Lat = 50.2268425, Lng = -5.2758395 });
            locs.Add("TR7 2LZ", new GeoLoc() { Lat = 50.4105492, Lng = -5.0682225 });
            locs.Add("PL12 4AE", new GeoLoc() { Lat = 50.4055478, Lng = -4.2279294 });
            locs.Add("PL25 4DJ", new GeoLoc() { Lat = 50.3464922, Lng = -4.7850022 });
            locs.Add("TR14 0AB", new GeoLoc() { Lat = 50.223385, Lng = -5.3013473 });
            locs.Add("PL17 8PB", new GeoLoc() { Lat = 50.5461939, Lng = -4.3212666 });
            locs.Add("TR11 3QS", new GeoLoc() { Lat = 50.1528966, Lng = -5.0742430 });
            locs.Add("EX9 7BH", new GeoLoc() { Lat = 50.6657793, Lng = -3.3089837 });
            locs.Add("EX9 7BY", new GeoLoc() { Lat = 50.6657793, Lng = -3.3089837 });
            return locs;
        }}

        public static Image LoadImageFromUrl(string imageUrl)
        {
            var webRequest = (HttpWebRequest) HttpWebRequest.Create(imageUrl);
            using (var webResponse = (HttpWebResponse)webRequest.GetResponse())
            {
                using (var stream = webResponse.GetResponseStream())
                {
                    return Image.FromStream(stream);
                }
            }
        }
    }

}
