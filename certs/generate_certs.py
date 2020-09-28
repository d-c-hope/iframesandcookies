import subprocess
from jinja2 import Template, Environment, FileSystemLoader
import os

domains_and_files = [
    {"certfile" : "idmyskycom", "commonname": "myskyid.mysky.com"},
    {"certfile" : "myskycom", "commonname": "mysky.com"},
    {"certfile" : "sportsskycom", "commonname": "myskysports.com"},
    {"certfile" : "myskyid", "commonname": "myskyid.com"},
    {"certfile" : "myidsportsskycom", "commonname": "myskyid.myskysports.com"}
]

file_loader = FileSystemLoader('certs/template')
env = Environment(loader=file_loader)

try:
    os.mkdir("tmp")
except:
    pass

for item in domains_and_files:
    template = env.get_template('cert_config_template.conf')
    output = template.render(commonname=item["commonname"])

    filename = "tmp/{}.conf".format(item["certfile"])
    print(filename)

    with open(filename, 'w') as f:
        f.write(output)

    keyfilename = "tmp/{}.key".format(item["certfile"])
    certfilename = "tmp/{}.crt".format(item["certfile"])
    subprocess.run(["openssl", "req", "-x509", "-nodes", "-days", "365", "-newkey", "rsa:2048",
     "-keyout", keyfilename, "-out", certfilename, "-config", filename, "-extensions", "x509_ext"])