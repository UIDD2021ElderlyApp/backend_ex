#https://github.com/a607ernie/git_auto_pull
from flask import jsonify,request,Flask
import subprocess
from pathlib import Path,PurePath
import urllib.request
import hashlib
import requests
import json
import hmac
from ipaddress import ip_address, ip_network
app = Flask(__name__)

print(json.loads(requests.get("https://api.github.com/repos/UIDD2021ElderlyApp/backend_ex/commits").text)[0].get('sha'))

def ckpsw(var_string):
    # 建立 SHA1 物件
    s = hashlib.sha3_256()
    data = var_string
    s.update(data.encode("utf-8"))
    h = s.hexdigest()
    if str(h)=="b58c0fc303a482eedbed0f324e201cceecf8b75822ac9cb93b40d3cf7ce3b8ba":
        return True
    else:
        return False 

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
    print("\033[92m")
    #print(request.json.validate_signature())
    #print(request.body.read)
    src_ip = ip_address(
            u'{}'.format(request.access_route[0])  # Fix stupid ipaddress issue
        )
    whitelist = requests.get('https://api.github.com/meta').json()['hooks']

    for valid_ip in whitelist:
        if src_ip in ip_network(valid_ip):
            break
    else:
        logging.error('IP {} not allowed'.format(
            src_ip
        ))
        abort(403)
    print("\033[0m")
    # 開啟檔案
    #fp = open("filename.txt", "a")
    # 寫入 This is a testing! 到檔案
    #fp.write(str(data))
    # 關閉檔案
    #fp.close()
    #print(data.get('commit'))
    global globe_var_last_update;globe_var_last_update = str(data)
    repository_name = data['repository']['name']
    #p = subprocess.run("cd %s && git pull"%repository_name, shell=True,cwd=Path(__file__).parent.absolute())
    p = subprocess.run("git pull && ../NPMrestart", shell=True,cwd=Path(__file__).parent.absolute())
    return ""

@app.route('/Pull_the_remote_code_to_the_local_end_and_trigger_the_update',methods=['POST'])
def Pull_the_remote_code_to_the_local_end_and_trigger_the_update():
    data = request.form
    if ckpsw(data.getlist('psw')[0]):
        print("Pull_the_remote_code_to_the_local_end_and_trigger_the_update")
        p = subprocess.run("git pull && ../NPMrestart", shell=True,cwd=Path(__file__).parent.absolute())
        return "success"
    else:
        return "False"

@app.route('/trigger_version_change_git_reset_hard',methods=['POST'])
def trigger_version_change_git_reset_hard():
    data = request.form
    print("\033[92m")
    if ckpsw(data.getlist('psw')[0]):
        print(data.getlist('trigger_version_change_git_reset_hard_sha')[0])
        var_cmd="git reset --hard "+str(data.getlist('trigger_version_change_git_reset_hard_sha')[0])+" && ../NPMrestart"
        print(var_cmd)
        print("\033[0m")
        p = subprocess.run(var_cmd, shell=True,cwd=Path(__file__).parent.absolute())
        return "success"
    else:
        return "False"

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

@app.route('/chkPsw',methods=['POST'])
def chkPsw():
    data = request.form
    if ckpsw(data.getlist('psw')[0]):
        return "True"
    else:
        return "False"

@app.route('/game_main_website_status',methods=['POST'])
def game_main_website_status():
    var_stat=None
    try:     
        var_stat=urllib.request.urlopen("http://luffy.ee.ncku.edu.tw:16443/users/login").getcode()
    except Exception as e: 
        print("\033[92m");print(e);print("\033[0m")
        var_stat=e
    else:
        print("\033[92m");print(var_stat);print("\033[0m")
        #return str(var_stat)
        var_stat="is working"+str(var_stat)
    finally:
        #print("\033[92m");print("you can't come here");print("\033[0m")
        return str(var_stat)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=int('15487'),ssl_context=('/home/yichung/ssl/certificate.crt', '/home/yichung/ssl/private.key'),debug=True)
