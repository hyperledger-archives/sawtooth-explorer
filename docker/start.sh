#!/bin/bash

sed -e "s/host.docker.internal:8008/$SAWTOOTH_REST/g" /etc/nginx/nginx.conf.tpl > /etc/nginx/nginx.conf

find /www/ste -type f -name '*.js' -exec sed -i "s/localhost:8090/$SAWTOOTH_EXPLORER_PROXY/g" {} \;

nginx -g "daemon off;"