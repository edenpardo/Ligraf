using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
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
					customerType = "אחר",
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
					customerType = "אחר",
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
					customerType = "אחר",
                    BookkeepingName = "יונתן שרון",
                    BookkeepingEmail = "yonatan@gmail.com",
                    BookkeepingPhoneNumber = "0546106140",
					MoreInfo = "",
                }
            };

            await context.Customers.AddRangeAsync(customers);
            await context.SaveChangesAsync();

            if (context.PVCTasks.Any()) return;
            var pvcTasks = new List<PVCTask>
            {
                new PVCTask
                {
                    WidthSize=10,
                    LengthSize=10,
                    PrintType="מבריק",
                    Corners="פינות עגולות",
                    Image="",
                    MoreInfo="",
                    FormatType="שילוט",
                    TaskType="PVC",
                    StartDate=DateTime.Now,
                    EndDate=DateTime.Now.AddMonths(1),
                    IsShipping=true,
                    IsPayed=false,
                    IsGotInvoice=false,
                    TaskStatus="בטיפול",
                    Price=10.99,
                    Count=2,
                    CustomerId= customers[0].Id,
                    CustomerName= customers[0].CustomerName
                }
            };

            await context.PVCTasks.AddRangeAsync(pvcTasks);
            await context.SaveChangesAsync();
        }

        // public static async Task SeedTasks(DataContext context){
            
        // }
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

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
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "The Louvre",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Category = "music",
                        City = "London",
                        Venue = "Wembly Stadium",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "food",
                        City = "London",
                        Venue = "Jamies Italian",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "British Museum",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Punch and Judy",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "O2 Arena",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 7 months in future",
                        Category = "travel",
                        City = "Berlin",
                        Venue = "All",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
            await SeedCustomers(context);
            //await SeedTasks(context);
        }
    }
}