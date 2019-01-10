Use Case for Data Engineer

Import Influencers data in mysql by using below command.

mysql -u root -p < affable.sql

Create Mule flow for extracting data from mysql and Batch Porcessing

Create kafka topic -

bin/kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic affable

Execute Mule code

Then check in kafka topic consumer -

bin/kafka-console-consumer --bootstrap-server localhost:9092 --topic affable

Read kafka topic in spark scala for further process and save this to cassandra

Create cassandra table -

create table affable.influencers (pk int, username text, "followerCount" int, "followingCount" int, primary key (pk));

Execute Spark submit job -

bin/spark-submit --packages org.json4s:json4s-native_2.11:3.6.3,com.datastax.spark:spark-cassandra-connector_2.11:2.4.0,org.apache.spark:spark-streaming-kafka-0-10_2.11:2.1.1 --master spark://127.0.0.1:7077 --class Influencers --deploy-mode client /Users/cruise/Documents/developer/affable/target/scala-2.11/affable_2.11-0.1.jar

Then check data in cassandra table -

select * from influencers;
