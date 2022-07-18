#####################################
##################################
#  Install Node Image             #
###################################
FROM node:12.14
#RUN apk --no-cache add curl

###################################
#  Create Directory               #
###################################
RUN mkdir -p /usr/src/app/

###################################
#  Give Permission To Directory   #
###################################
RUN chmod 777 -R /usr/src/app/

###################################
#  Make Working Directory         #
###################################
WORKDIR /usr/src/app

###################################
#Copy Package File To Working Dir.#
###################################
COPY package*.json /usr/src/app/

###################################
#     NPM Package Install         #
###################################
RUN npm install

####################################
#Copy Source Code Into Working Dir.#
####################################
COPY . /usr/src/app


##RUN export NODE_ENV=staging

####################################
#    Expose 7025 Port              #
####################################
EXPOSE 8000

####################################
#    Start Backend Server          #
####################################
CMD ["npm", "start"]