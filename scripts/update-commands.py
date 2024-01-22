import requests
import os
import shutil
from sdkgenerator import generate

branch = 'main'

files = [f'https://raw.githubusercontent.com/szolotykh/kinisi-motor-controller-firmware/{branch}/commands.json']

shutil.rmtree('./tmp', ignore_errors=True)
os.mkdir('./tmp')
for url in files:
  response = requests.get(url)
  with open(f"./tmp/{url.split('/')[-1]}", 'wb') as f:
    f.write(response.content)

generate("./tmp/commands.json", "./../src/commands/kinisi_commands.js", "ES6")
shutil.rmtree('./tmp', ignore_errors=True)