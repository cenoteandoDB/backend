# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

. ~/.bashrc

# Install node 18
nvm install 18
nvm use 18

# Update npm
npm i -g npm@latest
