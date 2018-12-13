
document.getElementById("gumbDelete").addEventListener("click", Delete);
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
function Delete() {
	console.log("not")
	var dbs = db.getMongo().getDBNames()
	for(var i in dbs){
	    db = db.getMongo().getDB( dbs[i] );
	    cols=db.getCollectionNames()
	    print( "current db contains the following collections: " + db.getCollectionNames() );
	    for(var j in cols){
	    	db.j.remove( { } );
	    } 
	}
}