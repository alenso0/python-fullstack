from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todoe.db'
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    desc = db.Column(db.String(500), nullable=True)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

    def __repr__(self):
        return '<Task %r>' % self.id

@app.route('/')
def hello_world():
    return render_template('home.html')

@app.route('/next')
def next_page():
    return "<h1>This is the next page!</h1>"

if __name__ == '__main__':
    app.run(debug=True)