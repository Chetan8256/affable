from cassandra.cluster import Cluster
import json
from flask_cors import CORS

from flask import Flask
app = Flask(__name__)
CORS(app)
 
@app.route("/")
def hello():
	cluster = Cluster(["192.168.0.52"])
	session = cluster.connect('affable')
	rows = session.execute('SELECT * FROM influencersranking limit 100')
	data = {}

	for row in rows:
		data[row.rank] = {
			"x": row.followers,
			"y": row.pk
		}

	return json.dumps(data)
 
@app.route("/members")
def members():
	return "Members"

if __name__ == "__main__":
    app.run()
