From node:10
RUN mkdir srv-customers
COPY . /srv-customers
WORKDIR srv-customers
 
RUN npm i
EXPOSE 3007
ENTRYPOINT  node --max-old-space-size=4096  bin/www 
 
