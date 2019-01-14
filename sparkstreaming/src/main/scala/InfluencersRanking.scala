import com.datastax.spark.connector._
import com.datastax.spark.connector.types.BigIntType
import org.apache.spark.{ SparkConf, SparkContext }
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.types._
import org.apache.spark.sql.Row
import org.apache.spark.SparkContext._
import org.apache.spark.sql.cassandra._

import scala.collection.mutable.Map
import scala.collection.mutable.WrappedArray


object InfluencersRanking {
	def main( args : Array [ String ] ) : Unit = {
		val conf = new SparkConf().setAppName("Simple Application").set("master", "spark://127.0.0.1:7077")
		     .set("spark.driver.allowMultipleContexts", "true")

		val sc = new SparkContext(conf)

		val spark = SparkSession
		  .builder()
		  .appName("Spark SQL basic example")
		  .config(conf)
		  .getOrCreate()

		import spark.implicits ._

		val schemaString = "pk followers"

		val fields = schemaString.split(" ")
		  .map(fieldName => StructField(fieldName, IntegerType, nullable = true))
		val schema = StructType(fields)

		val influencersrdd = sc.cassandraTable("affable", "influencers").select("pk", "followerCount")

		val influencers = influencersrdd.map { r =>
			val values = r.columnValues
			Row(values(0), values(1))
		}
		val df = spark.createDataFrame(influencers, schema)

		df.show()

		val groupBydf = df.groupBy("pk").sum("followers").orderBy($"sum(followers)".desc)
		groupBydf.show()
		/*


		val newSchema = StructType(groupBydf.schema.fields ++ Array(StructField("rank", LongType, false)))

		val rddwithRank = groupBydf.rdd.zipWithIndex()

		val dfZippedWithId =  spark.createDataFrame(rddwithRank.map{ case (row, index) => Row.fromSeq(row.toSeq ++ Array(index))}, newSchema)
		// Show results
		dfZippedWithId.show

		*/

		val newdf = groupBydf.select($"pk", $"sum(followers)".alias("followers"))
		newdf.createOrReplaceTempView("ranking")

		val finaldf = spark.sqlContext.sql("select pk, followers, row_number() over (order by followers desc) as rank from ranking")

		finaldf.show(1000)

		finaldf.rdd.saveToCassandra("affable", "influencersranking", SomeColumns("pk", "followers", "rank"))
	}
}
