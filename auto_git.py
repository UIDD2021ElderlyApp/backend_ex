#https://github.com/a607ernie/git_auto_pull
from flask import jsonify,request,Flask
import subprocess
from pathlib import Path,PurePath
import urllib.request
app = Flask(__name__)

globe_var_last_update=""

@app.route('/')
def api_root():
    print(Path(__file__).parent.absolute())
    #p = subprocess.run("git pull", shell=True,cwd=Path(__file__).parent.absolute())
    #return "welcome to github auto deploy<p>"+globe_var_last_update
    f=open('./important_server_runtime/gui.html')
    text=f.read()
    f.close
    return text

@app.route('/index.js')
def index_js():
    print(Path(__file__).parent.absolute())
    #p = subprocess.run("git pull", shell=True,cwd=Path(__file__).parent.absolute())
    #return "welcome to github auto deploy<p>"+globe_var_last_update
    f=open('./important_server_runtime/index.js')
    text=f.read()
    f.close
    return text

@app.route('/webhook',methods=['POST'])
def webhook():
    data = request.json
    print(request.json)
    global globe_var_last_update;globe_var_last_update = str(data)
    repository_name = data['repository']['name']
    #p = subprocess.run("cd %s && git pull"%repository_name, shell=True,cwd=Path(__file__).parent.absolute())
    p = subprocess.run("git pull && ../NPMrestart", shell=True,cwd=Path(__file__).parent.absolute())
    return ""

@app.route('/Pull_the_remote_code_to_the_local_end_and_trigger_the_update',methods=['POST'])
def Pull_the_remote_code_to_the_local_end_and_trigger_the_update():
    print("Pull_the_remote_code_to_the_local_end_and_trigger_the_update")
    p = subprocess.run("git pull && ../NPMrestart", shell=True,cwd=Path(__file__).parent.absolute())
    return "success"

@app.route('/trigger_version_change_git_reset_hard',methods=['POST'])
def trigger_version_change_git_reset_hard():
    data = request.form
    print("\033[92m")
    print(data.getlist('trigger_version_change_git_reset_hard_sha')[0])
    var_cmd="git reset --hard "+str(data.getlist('trigger_version_change_git_reset_hard_sha')[0])+" && ../NPMrestart"
    print(var_cmd)
    print("\033[0m")
    p = subprocess.run(var_cmd, shell=True,cwd=Path(__file__).parent.absolute())
    return "success"

@app.route('/git_version_info',methods=['POST'])
def git_version_info():
    #data = request.form
    print("\033[92m")
    process = subprocess.Popen(['git', 'show'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, err = process.communicate()
    print('========')
    print(out)
    print("\033[0m")
    return str(out)

@app.route('/game_main_website_status',methods=['POST'])
def game_main_website_status():
    #data = request.form
    print("\033[92m")
    var_stat=urllib.request.urlopen("http://luffy.ee.ncku.edu.tw:16443/users/login").getcode()
    print(var_stat)
    print("\033[0m")
    return str(var_stat)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=int('15487'),ssl_context=('/home/yichung/ssl/certificate.crt', '/home/yichung/ssl/private.key'),debug=True)
