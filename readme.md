# Let's generate the server pass key

ssl/: $ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048

# now generate the server key from the pass key

ssl/: $ openssl rsa -passin pass:x -in server.pass.key -out server.key

# we remove the pass key

ssl/: $ rm server.pass.key

# now let's create the .csr file

ssl/: $ openssl req -new -key server.key -out server.csr
...
Country Name (2 letter code) [AU]:MX
State or Province Name (full name) [Some-State]:Michoacan
...
A challenge password []:
...

# now let's create the .crt file

ssl/: $ openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
