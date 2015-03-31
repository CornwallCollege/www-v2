using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
            StoreAsJson(collegeEvents, Path.Combine(Environment.CurrentDirectory, "CollegeEvents.json"));
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
        public string Description { get; set; }
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
