using System;

namespace Domain
{
    public class Customer
    {
        public Guid Id  { get; set; }
        public string Company { get; set; }
        public string MainEmail { get; set; }
        public string MainPhoneNumber { get; set; }
        public string Address { get; set; }
        public string HP { get; set; }
        public string CustomerName { get; set; }
        public string customerType { get; set; }
        public string BookkeepingName { get; set; }
        public string BookkeepingEmail { get; set; }
        public string BookkeepingPhoneNumber { get; set; }
        public string MoreInfo { get; set; }

    }
}