name := "affable"

version := "0.1"

scalaVersion := "2.11.8"

libraryDependencies += "org.apache.spark" %% "spark-core" % "2.1.1"

libraryDependencies += "com.datastax.spark" %% "spark-cassandra-connector" % "2.4.0"

libraryDependencies += "org.json4s" %% "json4s-native" % "3.6.3"

libraryDependencies += "org.apache.spark" %% "spark-sql" % "2.1.1"

libraryDependencies += "org.apache.spark" %% "spark-streaming" % "2.4.0" % "provided"

libraryDependencies += "org.apache.spark" %% "spark-streaming-kafka-0-10" % "2.1.1"

libraryDependencies += "org.apache.spark" %% "spark-sql-kafka-0-10" % "2.1.1"