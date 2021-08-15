using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedActivities(DataContext context){
            if (context.Activities.Any()) return;
            
            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Past Activity 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub",
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre",
                },
                new Activity
                {
                    Title = "Future Activity 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "culture",
                    City = "London",
                    Venue = "Natural History Museum",
                },
                new Activity
                {
                    Title = "Future Activity 2",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Activity 2 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "O2 Arena",
                },
                new Activity
                {
                    Title = "Future Activity 3",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Activity 3 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Another pub",
                },
                new Activity
                {
                    Title = "Future Activity 4",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Activity 4 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Yet another pub",
                },
                new Activity
                {
                    Title = "Future Activity 5",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Activity 5 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Just another pub",
                },
                new Activity
                {
                    Title = "Future Activity 6",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Activity 6 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "Roundhouse Camden",
                },
                new Activity
                {
                    Title = "Future Activity 7",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Activity 2 months ago",
                    Category = "travel",
                    City = "London",
                    Venue = "Somewhere on the Thames",
                },
                new Activity
                {
                    Title = "Future Activity 8",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Activity 8 months in future",
                    Category = "film",
                    City = "London",
                    Venue = "Cinema",
                }
            };
            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();

        }
        public static async Task SeedCustomers(DataContext context){
            if (context.Customers.Any()) return;
            var customers = new List<Customer>
            {
                new Customer
                {
                    Company = "אלעד סטפנסקי",
                    MainEmail = "Elad@somethinggood.co.il",
                    MainPhoneNumber = "0507895656",
                    Address = "לוטוס 21 נס ציונה",
                    HP = "34460436",
                    CustomerName = "בגסו קייק",
					CustomerRank = "מצויין",
                    BookkeepingName = "אלעד סטפנסקי",
                    BookkeepingEmail = "Elad@somethinggood.co.il",
                    BookkeepingPhoneNumber = "0507895656",
					MoreInfo = "יש זיכוי על סך 1000",
                },
                new Customer
                {
                    Company = "עדן פרדו בעמ",
                    MainEmail = "eden@gmail.com",
                    MainPhoneNumber = "0548104930",
                    Address = "בן יהודה תל אביב",
                    HP = "27732772",
                    CustomerName = "עדן פרדו",
					CustomerRank = "בינוני",
                    BookkeepingName = "עדן פרדו",
                    BookkeepingEmail = "eden@gmail.com",
                    BookkeepingPhoneNumber = "0548104930",
					MoreInfo = "לקוחה חייבת כסף מחודש מרץ",
                },
				new Customer
                {
                    Company = "ליגרף",
                    MainEmail = "yonatan@gmail.com",
                    MainPhoneNumber = "0546106140",
                    Address = "דיזינגוף 217 תל אביב",
                    HP = "872872",
                    CustomerName = "יונתן שרון",
					CustomerRank = "מצויין",
                    BookkeepingName = "יונתן שרון",
                    BookkeepingEmail = "yonatan@gmail.com",
                    BookkeepingPhoneNumber = "0546106140",
					MoreInfo = "",
                }
            };

            await context.Customers.AddRangeAsync(customers);
            await context.SaveChangesAsync();
        }
        public static async Task SeedData(DataContext context)
        {
            await SeedActivities(context);
            await SeedCustomers(context);
        }
    }
}