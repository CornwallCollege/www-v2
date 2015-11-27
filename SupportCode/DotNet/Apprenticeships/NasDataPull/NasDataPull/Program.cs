using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using Newtonsoft.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.PhantomJS;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;

namespace NasDataPull
{
    class Program
    {
        private static RemoteWebDriver _driver;

        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Usage: NasDataPull.exe {path} (where path is the location of the Jekyll _data folder. The file apprenticeships.json is created in this _data folder specified.  This exe relies on PhantomJs headless internet browser needing firewall access to the outside)");
                return;
            }
            _driver = GetDriver();
            var roleSectors = GetAllSectorsRoles();
            var vacancies = GetAllVacanciesForLearningProviders("Cornwall College,Duchy College,Bicton College");            
            DeriveSectorFromRole(vacancies, roleSectors);
            var data = new NasData
                           {
                               Sectors = roleSectors.Values.Distinct().OrderBy(x => x).ToList(),
                               Vacancies = vacancies.ToList()
                           };
            var json = JsonConvert.SerializeObject(data, Formatting.Indented);
            File.WriteAllText(args[0] + "/apprenticeships.json",json);   
            _driver.Close();
            _driver.Dispose();
            _driver = null;
        }

        private static void DeriveSectorFromRole(IEnumerable<Vacancy> vacancies, Dictionary<string, string> roleSectors)
        {
            foreach (var vacancy in vacancies)
            {
                vacancy.Sector = roleSectors[vacancy.Role];
            }
        }

        private static void TryDriver(Action action)
        {
            Func<object> func = () =>
                {
                    action();
                    return null;
                };
            TryDriver(func);
        }

        private static T TryDriver<T>(Func<T> func, int attempts = 0)
        {
            try
            {
                return func();
            }
            catch (Exception exception)
            {                                
                if (attempts < 10)
                {
                    Thread.Sleep(100);
                    attempts++;
                    return TryDriver(func, attempts);
                }
                throw;
            }            
        }

        private static IWebElement TryFindById(string id)
        {
            try
            {
                return TryDriver(() => _driver.FindElementById(id));
            } catch(Exception exception)
            {
                throw new Exception("Could not find " + id, exception);
            }
        }

        private static IList<IWebElement> TryFindByTag(string tagName, ISearchContext searchContext = null)
        {
            searchContext = searchContext ?? _driver;
            try
            {
                return TryDriver(() => searchContext.FindElements(By.TagName(tagName)));
            }
            catch (Exception exception)
            {
                throw new Exception("Could not find " + tagName, exception);
            }
        }

        private static Dictionary<string,string> GetAllSectorsRoles()
        {
            OpenPage("https://apprenticeshipvacancymatchingservice.lsc.gov.uk/navms/forms/candidate/apprenticeships.aspx");
            ChooseOccupationTypeJobRole();
            var roleSector = new Dictionary<string,string>();
            int dups = 0;
            foreach (var sector in GetSectors())
            {
                SelectSector(sector);
                foreach (var role in GetRoles())
                {                    
                    roleSector.Add(role, sector);
                }                
            }            
            return roleSector;
        }

        private static void OpenPage(string url)
        {
            Console.WriteLine("Open page " + url);
            _driver.Url = url;
            Console.WriteLine("At page " + _driver.Url);
        }

        private static IEnumerable<string> GetRoles()
        {
            return TryDriver(() => new SelectElement(GetRoleSelector()).Options.Select(x => x.Text.Trim()).Skip(1).ToList());
        }

        private static IWebElement GetRoleSelector()
        {
            return TryFindById("ctl00_ContentBody_CandidateLandingControl_ApprenticeshipFrameworkListBox");
        }

        private static void SelectSector(string sector)
        {
            TryDriver(() => new SelectElement(GetSectorSelector()).SelectByText(sector));
            Thread.Sleep(1000);
        }

        private static IEnumerable<string> GetSectors()
        {
            return TryFindByTag("option", GetSectorSelector()).Skip(1).Select(x => x.Text.Trim()).ToList();
        }

        private static IWebElement GetSectorSelector()
        {
            return TryFindById("ctl00_ContentBody_CandidateLandingControl_ApprenticeshipOccupationDropDownList");
        }

        private static void ChooseOccupationTypeJobRole()
        {
            TryDriver(() => _driver.FindElementById("ctl00_ContentBody_CandidateLandingControl_SearchTypeRadioButtonList_1").Click());
        }

        private static IEnumerable<Vacancy> GetAllVacanciesForLearningProviders(string learningProviders)
        {
            OpenPage("https://apprenticeshipvacancymatchingservice.lsc.gov.uk/navms/forms/Vacancy/SearchVacancy.aspx");
            var result = new List<Vacancy>();
            foreach (var learningProvider in learningProviders.Split(','))
            {
                result.AddRange(GetAllVacanciesForLearningProvider(learningProvider));
                _driver.Navigate().Back();
            }
            return result;
        }

        private static IEnumerable<Vacancy> GetAllVacanciesForLearningProvider(string learningProvider)
        {
            ChooseLearningProvider();
            EnterLearningProvider(learningProvider);
            ChooseNationally();
            SubmitSearch();
            return GetVacanciesFromAllResultsPages();            
        }

        private static IEnumerable<Vacancy> GetVacanciesFromAllResultsPages()
        {
            var vacancies = new List<Vacancy>();
            var pages = GetResultsPageCount();
            if (pages > 0)
            {
                for (int i = 0; i < pages; i++)
                {
                    vacancies.AddRange(GetVacanciesFromResultsPage());
                    ChooseNextResultsPage();
                }
                for (int i = 0; i < pages; i++)
                {
                    _driver.Navigate().Back();
                }
            }
            return vacancies;
        }

        private static void ChooseNextResultsPage()
        {
            TryFindById("ctl00_ContentBody_ResultsPager_NextButton").Click();
            Thread.Sleep(500);
        }

        private static IEnumerable<Vacancy> GetVacanciesFromResultsPage()
        {
            var results = TryFindById("ResultsPanel");
            var rows = TryFindByTag("tr", results).ToList();
            var vacancy = new Vacancy();
            foreach (var row in rows)
            {
                if (row.GetAttribute("innerHTML").ToLower().Contains("vacancydetails.aspx"))
                {
                    vacancy = new Vacancy();
                    var fields = TryFindByTag("td", row);
                    vacancy.Title = TryFindByTag("a", fields[0])[0].Text.Trim();
                    vacancy.Link = TryFindByTag("a", fields[0])[0].GetAttribute("href");
                    vacancy.Available = fields[1].Text.Trim();
                    vacancy.Location = fields[2].Text.Trim();
                    vacancy.Role = fields[3].Text.Trim();
                    vacancy.CloseDate = fields[4].Text.Trim();
                    //vacancy.CloseDate = DateTime.ParseExact(fields[4].Text.Trim(), "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
                } else
                {
                    var field = TryFindByTag("td", row);
                    if (field.Count() == 1)
                    {
                        var content = field[0].Text.Trim();
                        if (content.StartsWith("Delivered by"))
                        {
                            vacancy.Provider = content.Replace("Delivered by ","").TrimEnd('.');
                            yield return vacancy;
                        } else
                        {
                            vacancy.Description = content;
                        }
                    }
                }
            }            
        }

        private static int GetResultsPageCount()
        {
            try
            {
                return TryFindById("ctl00_ContentBody_ResultsPager_PagesDropDownList").FindElements(By.TagName("option")).Count();
            } catch
            {
                return 0;
            }
        }

        private static void SubmitSearch()
        {
            TryDriver(() => _driver.FindElementById("ctl00_ContentBody_SearchButton").Click());
        }

        private static void ChooseNationally()
        {
            TryDriver(() => _driver.FindElementById("ctl00_ContentBody_SearchAreaBy_2").Click());
        }

        private static void EnterLearningProvider(string learningProvider)
        {
            var input = TryFindById("ctl00_ContentBody_SearchTermData");
            input.Clear();
            input.SendKeys(learningProvider);
        }

        private static void ChooseLearningProvider()
        {
            TryDriver(() => _driver.FindElementById("ctl00_ContentBody_SearchByRadioButtonList_3").Click());
        }

        private static RemoteWebDriver GetDriver()
        {
            //return new ChromeDriver();
            return new PhantomJSDriver();
        }
    }

    internal class NasData
    {
        public List<string> Sectors { get; set; }
        public List<Vacancy> Vacancies { get; set; }
    }

    internal class Vacancy
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public string Available { get; set; }
        public string Location { get; set; }
        public string Role { get; set; }
        public string Sector { get; set; }
        public string CloseDate { get; set; }
        public string Provider { get; set; }
        public string Description { get; set; }        
    }
}
