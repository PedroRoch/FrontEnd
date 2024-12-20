# Gestão de Veículos, Motoristas e Viagens - Frontend

Este projeto é uma aplicação web para gerenciar veículos, motoristas e viagens. Ele permite a criação, atualização, exclusão e visualização de dados relacionados a veículos, motoristas e viagens, bem como a interação em tempo real via WebSocket.
Desafio proposto por Motora-ai para seleção de um Processo Seletivo

## Tecnologias Utilizadas

- **Frontend**: React, Material-UI, Socket.IO-client

## Objetivos

Utilizando a aplicação backend disponibilizada no repositório https://github.com/motora-ai/processo-seletivo-trainee, construa uma interface com os seguintes requisitos:
 - Seja capaz de apresentar as informações de veículos, motoristas e viagens de forma organizada e intuitiva;
 - Seja capaz de cadastrar novos veículos, motoristas e viagens;
 - Seja capaz de modificar os veículos, motoristas e viagens existentes;
 - Seja capaz de excluir veículos, motoristas e viagens.

##Funcionalidades: 

### Veículos

#### Criação de Veículo:
- Utiliza a função `createVehicle` para adicionar um novo veículo.
- Exibe um formulário (`VehicleForm`) para inserir dados como tipo, placa, latitude, longitude, velocidade e status do veículo.

#### Edição de Veículo:
- Utiliza a função `updateVehicle` para atualizar as informações de um veículo existente.
- O formulário (`VehicleForm`) é preenchido com os dados do veículo selecionado para edição.

#### Visualização de Veículos:
- Utiliza a função `getVehicles` para obter todos os veículos.
- Os veículos são exibidos em uma lista (`VehicleList`), mostrando detalhes como tipo, placa, latitude, longitude, velocidade e status.

#### Remoção de Veículo:
- Utiliza a função `deleteVehicle` para remover um veículo.
- O usuário pode excluir um veículo diretamente da lista de veículos (`VehicleList`).

### Motoristas

#### Criação de Motorista:
- Utiliza a função `createDriver` para adicionar um novo motorista.
- Exibe um formulário (`DriverForm`) para inserir dados como nome, CPF, CNH e status do motorista.

#### Edição de Motorista:
- Utiliza a função `updateDriver` para atualizar as informações de um motorista existente.
- O formulário (`DriverForm`) é preenchido com os dados do motorista selecionado para edição.

#### Visualização de Motoristas:
- Utiliza a função `getDrivers` para obter todos os motoristas.
- Os motoristas são exibidos em uma lista (`DriverList`), mostrando detalhes como nome, CPF, CNH e status.

#### Remoção de Motorista:
- Utiliza a função `deleteDriver` para remover um motorista.
- O usuário pode excluir um motorista diretamente da lista de motoristas (`DriverList`).

### Viagens

#### Criação de Viagem:
- Utiliza a função `createTravel` para adicionar uma nova viagem.
- Exibe um formulário (`TravelForm`) para inserir dados como ID do motorista, ID do veículo, status, data de início e data de fim.

#### Edição de Viagem:
- Utiliza a função `updateTravel` para atualizar as informações de uma viagem existente.
- O formulário (`TravelForm`) é preenchido com os dados da viagem selecionada para edição.

#### Visualização de Viagens:
- Utiliza a função `getTravels` para obter todas as viagens.
- As viagens são exibidas em uma lista (`TravelList`), mostrando detalhes como ID do motorista, ID do veículo, status, data de início e data de fim.

#### Remoção de Viagem:
- Utiliza a função `deleteTravel` para remover uma viagem.
- O usuário pode excluir uma viagem diretamente da lista de viagens (`TravelList`).

## Estrutura do Código

### src/App.js
- **ThemeProvider**: Provedor de tema para a aplicação, utilizando o tema personalizado do Material-UI.
- **CssBaseline**: Fornece um baseline CSS global.
- **AppBar e Toolbar**: Barra de navegação superior.
- **Tabs**: Navegação entre as seções de Motoristas, Veículos e Viagens.
- **Formulários**: Modal para criar e editar motoristas, veículos e viagens.

### src/services/api.js
- **Funções de API**: Funções para realizar operações CRUD (Create, Read, Update, Delete) para veículos, motoristas e viagens.

### src/components/Vehicles/VehicleForm.js
- **Formulário de Veículos**: Modal para criar e editar veículos. Inclui campos para tipo, placa, latitude, longitude, velocidade e status do veículo.

### src/components/Vehicles/VehicleList.js
- **Lista de Veículos**: Exibe a lista de veículos. Inclui funcionalidades para editar e excluir veículos.

### src/components/Drivers/DriverForm.js
- **Formulário de Motoristas**: Modal para criar e editar motoristas. Inclui campos para nome, CPF, CNH e status do motorista.

### src/components/Drivers/DriverList.js
- **Lista de Motoristas**: Exibe a lista de motoristas. Inclui funcionalidades para editar e excluir motoristas.

### src/components/Travels/TravelForm.js
- **Formulário de Viagens**: Modal para criar e editar viagens. Inclui campos para ID do motorista, ID do veículo, status, data de início e data de fim.

### src/components/Travels/TravelList.js
- **Lista de Viagens**: Exibe a lista de viagens. Inclui funcionalidades para editar e excluir viagens.


## Instalação e Configuração

### Requisitos

- Node.js

### Passos para Instalação

1. **Clone o repositório do frontend**:
   ```bash
   git clone https://github.com/PedroRoch/FrontEnd/tree/main/FrontEnd-Monitoramento
   cd FrontEnd-Monitoramento
2. **Instale as Dependências**
   ```bash
   npm install
   ```
3. Iniciar o sistema
   ```bash
   npm start
   ```
Atenção: certifique-se que o Backend esteja inicializado para funcionar corretamente



