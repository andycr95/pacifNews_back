const oracledb = require('oracledb');


oracledb.initOracleClient({libDir: __dirname + '../../instantclient_19_8'});



export default class OracleController {
    
    public static async getUser () {
        
    let connection;

    connection = await oracledb.getConnection({ user: "reporteador", password: "reporteador", connectionString: "181.224.160.30/UNIPA1N" });

    // Insert some data
    const sql = `select * from ACADEMICO.V_ESTUDIANTES ve JOIN ACADEMICO.PROGRAMA p ON p.PROG_ID = ve.IDPROGRAMA WHERE ve.IDPEGE = 39975`;
    let result = await connection.query(sql);
    result = await connection.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    const rs = result.resultSet;
    let row;
    
    await rs.close();
    return row;
    
  }
}

