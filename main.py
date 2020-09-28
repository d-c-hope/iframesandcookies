from flask import Flask
from flask import render_template
from flask import make_response
from flask import request
from flask import jsonify


app = Flask(__name__)

# domains in hosts file:
#       127.0.0.1       testsignin.com testsports.com testsocialsignin.com

# domain 1
@app.route('/sports')
def sports(name=None):
    return render_template('sportsouter.html')

@app.route('/sportst')
def sportstransition(name=None):
    return render_template('sportsoutertransition.html')

@app.route('/home')
def home(name=None):
    return render_template('outer.html')


# signin domain 2
@app.route('/signin/')
def signin(name=None):
    encrypstate = request.cookies.get('encrypstate')
    print("cookies are: {}".format(request.cookies))
    return render_template('signin.html', encrypstate=encrypstate)

@app.route('/signinbutton')
def signinbutton(name=None):
    encrypstate = request.cookies.get('encrypstate')
    print("cookies are: {}".format(request.cookies))
    return render_template('signinbutton.html', encrypstate=encrypstate)

@app.route('/signinbuttonclicked')
def signinbuttonclicked(name=None):
    # encrypstate = request.cookies.get('encrypstate')
    email = request.cookies.get('email')
    print("cookies are: {}".format(request.cookies))

    r = {"email" : email}
    resp = make_response(jsonify(r), 200)

    return r

@app.route('/signincompleted')
def signincompleted(name=None):
    return render_template('signincompleted.html')

#for authenticate html
@app.route('/authenticate/')
def authenticate(name=None):
    return render_template('authenticate.html')

# for submitting creds
@app.route('/authenticate/authcreds', methods=['POST'])
def authcreds(name=None):
    print("data is : {}".format(request.data))
    j = request.get_json()
    print("authenticating, email is {}".format(j['email']))
    r = {
        "authenticated" : True,
        "email" : j['email']
    }
    print("r is {}".format(r))
    # resp = jsonify(r)
    resp = make_response(jsonify(r), 200)
    # resp = make_response(r)
    # resp.set_cookie('encrypstate', 'authndone', samesite="Strict")
    resp.set_cookie('encrypstate', 'authndone')
    resp.set_cookie('email', j['email'])
    return resp

@app.route('/coordinator')
def coordinator(name=None):
    return render_template('coordinator.html')

# domain 3
@app.route('/socialsignin')
def socialsignin(name=None):
    return render_template('socialsignin.html')

@app.route('/facebooksdksignin')
def facebooksdkignin(name=None):
    return render_template('facebook_sdk_signin.html')

@app.route('/googlesignin')
def googlesignin(name=None):
    client_id = "61090701945-hm35f4g53qrg87mmhbrgcuikrf6mjklv.apps.googleusercontent.com"
    client_secret = ""
    return render_template('googlesignin.html', clientid=client_id, redirecturi="http://localhost:5000" )


@app.route('/done')
def socialsignindone(name=None):
    return render_template('socialsignindone.html')


app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

