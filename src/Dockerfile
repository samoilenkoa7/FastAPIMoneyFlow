FROM ubuntu
RUN apt-get update -qy
RUN apt-get install -qy python3.10 python3-pip python3.10-dev
COPY . ./app
WORKDIR ./app
EXPOSE 8000:8080
RUN pip3 install -r requirements.txt
