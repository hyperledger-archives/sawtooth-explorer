# Copyright 2018 PokitDok, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ------------------------------------------------------------------------------

FROM ubuntu:xenial

RUN apt update && apt install -y \
    git \
    curl \
    nginx

# Install Node.js 6.x repository
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

# Install Node.js and npm
RUN apt-get install -y nodejs && apt update

EXPOSE 80


RUN \
 if [ ! -z $HTTP_PROXY ] && [ -z $http_proxy ]; then \
  http_proxy=$HTTP_PROXY; \
 fi; \
 if [ ! -z $HTTPS_PROXY ] && [ -z $https_proxy ]; then \
  https_proxy=$HTTPS_PROXY; \
 fi; \
 if [ ! -z $http_proxy ]; then \
  npm config set proxy $http_proxy; \
 fi; \
 if [ ! -z $https_proxy ]; then \
  npm config set https-proxy $https_proxy; \
 fi;

WORKDIR /app

RUN git clone http://github.com/MakeCents-NYC/sawtooth-explorer .

RUN npm install
#COPY . /app

#RUN cd /project

RUN npm run build -prod

# clean up the rest?

RUN mkdir /www/ste

RUN mv dist /www/ste/

