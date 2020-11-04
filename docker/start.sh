#!/bin/bash

sed -e "s/{{EXPLORER_HOST}}/$EXPLORER_HOST/g" /etc/nginx/nginx.conf.tpl > /etc/nginx/nginx.conf

nginx -g "daemon off;" 