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

Hosts file:
127.0.0.1       localhost testsocialsignin.com myskysports.com myskyid.mysky.com mysky.com myskyid.com myskyid.mskysp
orts.com