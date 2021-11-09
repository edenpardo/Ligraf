using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class JobTask
    {
        public Guid Id  { get; set; }
        public string FormatType { get; set; }//שילוט/מדבקות/חותמות/פורמט רחב/דפוס
        public string TaskType { get; set; }//PVC...
        public DateTime StartDate { get; set; }//תאריך פתיחת המשימה
        public DateTime EndDate { get; set; }//תאריך אספקה
        public bool IsShipping { get; set; }//האם משלוח
        public bool IsPayed { get; set; }//האם שולם
        public bool IsGotInvoice { get; set; }//האם יצאה חשבונית
        public string TaskStatus { get; set; }//בטיפול/ממתין לאיסוף/הושלמה
        public double Price { get; set; }   //מחיר
        public int Count { get; set; }  //כמות
        public Guid CustomerId { get; set; }   //לקוח ID
        public string CustomerName{ get; set; }// שם לקוח
    }
}