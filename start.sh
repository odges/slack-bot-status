#!/bin/bash

PROJECT="statusbot"
NPM="v12.12.0"

source ~/.bash_profile
cd /home/digitalwand.ru/web/$PROJECT/api
nvm use $NPM
source ./.env
npm run start


