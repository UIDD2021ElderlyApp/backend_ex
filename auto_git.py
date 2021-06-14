#https://github.com/a607ernie/git_auto_pull
from flask import jsonify,request,Flask
import subprocess
from pathlib import Path,PurePath
app = Flask(__name__)

@app.route('/')
def api_root():
    print(Path(__file__).parent.absolute())
    #p = subprocess.run("git pull", shell=True,cwd=Path(__file__).parent.absolute())
    return "welcome to github auto deploy"

@app.route('/webhook',methods=['POST'])
def webhook():
    data = request.json
    print(request.json)
    repository_name = data['repository']['name']
    #p = subprocess.run("cd %s && git pull"%repository_name, shell=True,cwd=Path(__file__).parent.absolute())
    p = subprocess.run("git pull", shell=True,cwd=Path(__file__).parent.absolute())
    return ""

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=int('15487'),ssl_context=('/home/yichung/ssl/certificate.crt', '/home/yichung/ssl/private.key'),debug=True)
