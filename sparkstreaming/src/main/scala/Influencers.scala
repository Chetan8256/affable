
import org.json4s._
import org.json4s.native.JsonMethods._
import scala.collection.mutable.Map
import com.datastax.spark.connector._
import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.sql.SparkSession
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.apache.spark.streaming.kafka010._
import org.apache.spark.streaming.kafka010.LocationStrategies.PreferConsistent
import org.apache.spark.streaming.kafka010.ConsumerStrategies.Subscribe
import org.apache.kafka.common.TopicPartition
import org.apache.spark.sql.cassandra._
import java.text.SimpleDateFormat
import java.util.Calendar
import com.datastax.driver.core.utils.UUIDs
import org.apache.spark.sql.functions.udf

//bin/spark-submit --packages org.json4s:json4s-native_2.11:3.6.3,com.datastax.spark:spark-cassandra-connector_2.11:2.4.0,org.apache.spark:spark-streaming-kafka-0-10_2.11:2.1.1 --master spark://127.0.0.1:7077 --class Influencers --deploy-mode client /Users/cruise/Documents/developer/affable/target/scala-2.11/affable_2.11-0.1.jar
//create keyspace affable with replication = {'class':'SimpleStrategy', 'replication_factor':1};
//create table affable.influencers (id UUID, pk int, username text, "followerCount" int, "followingCount" int, createdat timestamp, primary key (id));
//select * from influencers;


object Influencers {

	case class Influencers(id:java.util.UUID, createdat:String ,pk: BigInt, username : String, followerCount : BigInt, followingCount : BigInt)

	def main( args : Array [ String ] ) {


		val conf = new SparkConf().setAppName("Simple Application").set("master", "spark://127.0.0.1:7077")
		  .set("spark.driver.allowMultipleContexts", "true")

		val sc = new SparkContext(conf)


		val ssc = new StreamingContext(sc, Seconds(15))


		val spark = SparkSession
		  .builder()
		  .appName("Spark SQL basic example")
		  .config(conf)
		  .getOrCreate()


		val kafkaParams = Map[String, Object](
			"bootstrap.servers" -> "localhost:9092",
			"value.deserializer" -> "org.apache.kafka.common.serialization.StringDeserializer",
			"key.deserializer" -> "org.apache.kafka.common.serialization.StringDeserializer",
			"group.id" -> "test1",
			"auto.offset.reset" -> "latest",
			"enable.auto.commit" -> (false: java.lang.Boolean)
		)

		val topics = Array("affable")
		val stream = KafkaUtils.createDirectStream[String, String](
			ssc,
			PreferConsistent,
			Subscribe[String, String](topics, kafkaParams)
		)

		val info = ( str : String ) => {
			scala.io.Source.fromURL ( "http://192.168.0.55:3000/api/v1/influencers/" + str ).mkString
		}
		/*
		val encrypt: String => String = (str: String) => {
			val md = java.security.MessageDigest.getInstance("SHA-1")
			md.digest(str.getBytes("UTF-8")).map("%02x".format(_)).mkString
		}
		val encryptUDF = udf(encrypt)
		*/
		val format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")

		stream.foreachRDD { rddRaw =>
			println("let me check. ==  = = =      ---------------")
			//val spark = SparkSession.builder.config(rdd.sparkContext.getConf).getOrCreate()
			//import spark.implicits._

			val rdd = rddRaw.map(_.value.toString)
			val df = spark.read.json(rdd)
			val columns = df.columns

			df.show()

			val rddMap = df.rdd.map { r =>
				val map = scala.collection.mutable.Map[String, String]()

				for (i <- 0 until columns.length) {
					map(columns(i)) = r(i).toString
				}
				map
			}

			val infulencer_details = rddMap.map { r =>
				implicit val formats = DefaultFormats
				val json = info ( r("INFLUENCER_ID").toString() )

				val md = java.security.MessageDigest.getInstance("SHA-1")
				val id = md.digest(r("INFLUENCER_ID").toString().getBytes("UTF-8")).map("%02x".format(_)).mkString("")

				val createdat = format.format(Calendar.getInstance().getTime)
				val rowimmutable = parse ( json ).values.asInstanceOf[scala.collection.immutable.Map[String, String]]
				val row = Map(rowimmutable.toSeq: _*)

				Influencers(UUIDs.timeBased(), createdat.toString, row("pk").asInstanceOf[BigInt], row("username"), row("followerCount").asInstanceOf[BigInt], row("followingCount").asInstanceOf[BigInt])

			}

			//infulencer_details.take(10).foreach(println)

			infulencer_details.saveToCassandra ( "affable", "influencers", SomeColumns("id", "createdat", "pk", "username", "followerCount", "followingCount") )

		}

		//stream.map(record => (record.key, record.value))
		//stream.map(record=>(record.value().toString)).print

		ssc.start()
		ssc.awaitTermination()

		/*
		val df = spark.read.format ( "csv" ).load ( "file:///Users/cruise/Documents/influencerids.csv" )

		df.show ( )

		val info = ( str : String ) => {
			scala.io.Source.fromURL ( "http://192.168.0.53:3000/api/v1/influencers/" + str ).mkString
		}

		val infulencer_details = df.rdd.map { r =>
			implicit val formats = DefaultFormats
			val json = info ( r(0).toString() )
			parse ( json ).extract[Influencers]
		}


		infulencer_details.saveToCassandra ( "affable", "influencers", SomeColumns("pk", "username", "followerCount", "followingCount") )
		//infulencer_details.write.format("org.apache.spark.sql.cassandra").options(Map( "table" -> "influencers", "keyspace" -> "affable")).save()
		*/
	}
}