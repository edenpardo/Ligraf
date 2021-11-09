using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class PVCTask:JobTask
    {
        public double WidthSize { get; set; }//רוחב
        public double LengthSize { get; set; }//אורך
        public string PrintType { get; set; }//מבריק מט
        public string Corners { get; set; }//פינות עגולות 
        public string Image { get; set; }//תמונה
        public string MoreInfo { get; set; }//מידע נוסף
    }
}