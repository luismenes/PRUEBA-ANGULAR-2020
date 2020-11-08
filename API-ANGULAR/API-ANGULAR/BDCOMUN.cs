using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

namespace API_ANGULAR
{
    public class BDCOMUN
    {

        
        public static SqlConnection obtenerCOnexion()
        {
            SqlConnection conn = new SqlConnection("Data Source=SISTEMAS\\MSSQLSERVER2;Initial Catalog=ANGULAR;Persist Security In" +
            "fo=True;User ID=sa;Password=luisdeimaluis");
            conn.Open();
            return conn;
        }
    }
}