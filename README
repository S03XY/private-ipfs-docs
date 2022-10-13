## Create a private IPFS network

This repository help you to bootstrap a private ipfs network quickly with 5 ipfs node in a private network.

### Prerequisite:

1. [Go-lang](https://www.cyberciti.biz/faq/how-to-install-gol-ang-on-ubuntu-linux/)

2. [Docker and Docker-Compose](https://support.netfoundry.io/hc/en-us/articles/360057865692-Installing-Docker-and-docker-compose-for-Ubuntu-20-04)

3. [go-ipfs-swarm-key-gen](https://github.com/Kubuxu/go-ipfs-swarm-key-gen)

### Steps

1. Open a new terminal and dowload go-ipfs-swarm-key-gen.

```
go install github.com/Kubuxu/go-ipfs-swarm-key-gen/ipfs-swarm-key-gen@latest
```

2. Navigate inside the go/bin/ directory and run.

```
./ipfs-swarm-key-gen
```

sample output : `/key/swarm/psk/1.0.0/ /base16/ 7de64650243ef226b81c6d590d7f742618640470177d6f6920be8b4b06348b98 `

3. Copy the key and save it.

4. Start up docker services.

```
docker-compose up
```

5. Stop docker services.

```
docker-compose kill
```

6. Open a new terminal and navigate inside the compose folder.

```
cd ./ipfs0
sudo touch swarm.key
sudo nano swarm.key
```

7. Paste the swarm.key generated in the 2 step and then save it.

8. repeat step 6 and step 7 for reamining ipfs directories.

9. Start docker services.

10. Run the command inside each IPFS node container.

```
ipfs bootstrap rm –all
```

11. bootstrap all the peer nodes buy navigating inside each running ipfs node container and running command. (OPTIONAL)

```
ipfs bootstrap add <ipfs node address>
```

12. Run a private custer by providing a cluster secret in the docker-compose file. (OPTIONAL)

### Create private ipfs network from scratch

1. Download the docker file from https://raw.githubusercontent.com/ipfs/ipfs-cluster/v1.0.4/docker-compose.yml

2. Modify the docker file as per IPFS node requirement and IPFS cluster requirement

   Note: IPFS cluster manages data replication over a network of node so more than one cluster may be required or not, choose the configuration that suites the need of your application).

3. Modify the docker file by setting the environment variable LIBP2P_FORCE_PNET=1 for each IPFS node.

4. Then run docker-compose up by navigating inside the folder containing docker file that you have downloaded.

5. Use the swarm key gen tool to generate the key for the private network

6. Install ipfs-swarm-key-gen tool using go install

7. Run ipfs-swarm-key-gen after navigating inside the folder where go packages are installed.

8. Copy the generated key.

9. Then navigate inside the volume mounted for each of the nodes and create a file with name swarm.key and paste the key which was copied in the previous step.

10. Copy the swarm.key file to each of the ipfs node volumes.

11. Navigate inside the each running container console and run ipfs bootstrap rm –all.

    Note: This step can be done by create custom image and adding that command in the docker image file itself.

12. Navigate inside each running IPFS node container and add all other nodes in the network by running ipfs bootstrap add [ipfs node]

    for example, ipfs bootstrap add /ip4/192.168.10.1/tcp/4001/ipfs/QmQVvZEmvjhYgsyEC7NvMn8EWf131EcgTXFFJQYGSz4Y83

    /ip4/192.168.10.1/tcp/4001/ => SWARM protocol listening address

    QmQVvZEmvjhYgsyEC7NvMn8EWf131EcgTXFFJQYGSz4Y83 => hash of node

    You can get the hash of the node from ipfs config show command.

    Note: This step is required for IPFS peer discovery on a network and can be ignored if that is not a concern.

13. You can run a private cluster service running on top of the a private network of nodes and clusters can also be made private by adding cluster secret in the each of the clusters.

14. You can interact with ipfs private network by using ipfs http client and initiating it with any exposed ipfs node api.
