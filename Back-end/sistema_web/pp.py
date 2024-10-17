from flask import Flask , render_template

app = Flask(__name__)

@app.route('/')
def hello():
    user = "Alexandre Veloso"
    return render_template('index.html', user = user)

@app.route('/sobre')
def sobre():
    return render_template('sobre.html')

if __name__ == '__main__':
    app.run(port = 8000)
    app.run(debug = True)

