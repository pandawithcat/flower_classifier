# Steps for creating a simple frontend app

### Writing simple react code

### Deploying the app using Docker

#### For development purpose

To run just the app in a docker for the devlopement purpose, you can simply run

```console
user@bar:~$ docker build -t client -f Dockerfile.dev .
123456789abc
user@bar:~$ docker run -it -p 3000:3000 123456789abc
```

To explain the commands line by line, the first line will build the docker image with the tag "client" using Dockerfile.dev
As you can see -t stands for tag and -f stands for file so that we can specify which dockerfile we are using. And the last dot
means we are building the docker image with everything in this directory.

Then, after build docker will create an image with an image ID which i just wrote "123456789abc". You can check this using
"docker images". Then we create the docker container using the second command. We are using -d for detached -p for port mapping.
Port mapping is necessary so that we can access the app within the docker server(think of it as a mini computer itself). We want to connect our computer to the docker server, so we do port mapping!

-it flag is for the interaction mode which is needed because by default react script would close before server starts if you just run the command without the -it flag.

After you do this, you will be able to access the app on your machine through http://localhost:3000/
