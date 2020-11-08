using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using API_ANGULAR.Models;

namespace API_ANGULAR.Controllers
{
    public class TP_DATOS_BASICOSController : ApiController
    {

        private ANGULAREntities db = new ANGULAREntities();
        SqlConnection conn = BDCOMUN.obtenerCOnexion();
        SqlCommand cmd = null;
        SqlDataReader leer = null;

        // GET: api/TP_DATOS_BASICOS
        public IQueryable<TP_DATOS_BASICOS> GetTP_DATOS_BASICOS()
        {

            
            //try
            //{
            //    if (conn.State == System.Data.ConnectionState.Closed)
            //    {
            //        conn.Open();
            //    }
            //    SqlCommand cmd = new SqlCommand("[dbo].[STP_DATOS_BASICOS]", conn);
            //    cmd.CommandType = CommandType.StoredProcedure;
            //    cmd.Parameters.Add("@OPERACION", SqlDbType.Int).Value = 1;
            //    int resultado = cmd.ExecuteNonQuery();
            //    conn.Close();

            //}
            //catch (Exception)
            //{

            //    throw;
            //}
            
            return db.TP_DATOS_BASICOS;

        }

       

        // GET: api/TP_DATOS_BASICOS/5
        [ResponseType(typeof(TP_DATOS_BASICOS))]
        public IHttpActionResult GetTP_DATOS_BASICOS(int id)
        {


            var produc = (from a in db.TP_DATOS_BASICOS
                          where a.ID == id

                          select new
                          {
                              a.ID,
                              a.CODIGO,
                              a.DESCRIPCION,
                              a.NOMBRE,
                              a.REFERENCIA,
                              a.UBICACION,
                              a.SEDE_BODEGA,
                              a.IMAGEN,
                              DeletedOrderItemIDs = ""
                          }).FirstOrDefault();



            return Ok(new { produc });
        }

        // PUT: api/TP_DATOS_BASICOS/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTP_DATOS_BASICOS(int id, TP_DATOS_BASICOS tP_DATOS_BASICOS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tP_DATOS_BASICOS.ID)
            {
                return BadRequest();
            }

            db.Entry(tP_DATOS_BASICOS).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TP_DATOS_BASICOSExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/TP_DATOS_BASICOS
        [ResponseType(typeof(TP_DATOS_BASICOS))]
        public IHttpActionResult PostTP_DATOS_BASICOS(TP_DATOS_BASICOS tP_DATOS_BASICOS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TP_DATOS_BASICOS.Add(tP_DATOS_BASICOS);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tP_DATOS_BASICOS.ID }, tP_DATOS_BASICOS);
        }

        // DELETE: api/TP_DATOS_BASICOS/5
        [ResponseType(typeof(TP_DATOS_BASICOS))]
        public IHttpActionResult DeleteTP_DATOS_BASICOS(int id)
        {
            TP_DATOS_BASICOS tP_DATOS_BASICOS = db.TP_DATOS_BASICOS.Find(id);
            if (tP_DATOS_BASICOS == null)
            {
                return NotFound();
            }

            db.TP_DATOS_BASICOS.Remove(tP_DATOS_BASICOS);
            db.SaveChanges();

            return Ok(tP_DATOS_BASICOS);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TP_DATOS_BASICOSExists(int id)
        {
            return db.TP_DATOS_BASICOS.Count(e => e.ID == id) > 0;
        }
    }
}