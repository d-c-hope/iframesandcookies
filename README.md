# README

## To run
Install Flask (ideally use venv)
export FLASK_APP=main.py
python -m flask run

To setup nginx: 
See here https://gist.github.com/beatfactor/a093e872824f770a2a0174345cacf171

Think it's basically what I did below:
Basically download pcre 8.44 (not sure if version 2 works) https://ftp.pcre.org/pub/pcre/
and openssl here https://www.openssl.org/source/ (I used 1.1 not sure about new one, didn't try)
and then run
./configure --with-pcre=../pcre-8.44 --with-http_ssl_module --with-openssl=../openssl-1.1.1g


Generate keys:
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /<base>/myskycom.key -out /Users/davidhope/Desktop/myskycom.crt
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /<base>/davidhope/Desktop/idmyskycom.key -out /Users/davidhope/Desktop/idmyskycom.crt
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /<base>/davidhope/Desktop/sportsskycom.key -out /Users/davidhope/Desktop/sportsskycom.crt
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /Users/davidhope/Desktop/myskyid.key -out /Users/davidhope/Desktop/myskyid.crt 
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /Users/davidhope/Desktop/idmysportscom.key -out /Users/davidhope/Desktop/idmysportscom.crt

Or to use config do:
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout mykey.pem -out mycert.pem -config ~/Desktop/cert_config.conf -extensions x509_ext

Or now use the generate_certs.py script to genreate them. Should be run from top level and will make a tmp directory under that and put the certs in there.
You should then search and replace (e.g. sed or in intellij with a copy of the nginx.conf file) so that the  <mypath> is replaced with the path to the tmp directory
Note I could have templated this or scripted but not got round to it 

Hosts file:
127.0.0.1       localhost testsocialsignin.com myskysports.com myskyid.mysky.com mysky.com myskyid.com myskyid.mskysp
orts.com


/usr/local/nginx/sbin/nginx -s reload