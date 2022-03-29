import connection from '../src/models/connection';

const dropSchema = async () => {
  await connection.execute('DROP SCHEMA IF EXISTS Trybesmith;');
  console.log('💀 Banco de Dados "Trybesmith" dropado\n');
};

const createSchema = async () => {
  await connection.execute('CREATE SCHEMA Trybesmith;');
  console.log('✔️  Banco de Dados "Trybesmith" criado\n');

  await connection.execute(`CREATE TABLE Trybesmith.Users
   (id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, username TEXT NOT NULL,
   classe TEXT NOT NULL, level INTEGER NOT NULL, password TEXT NOT NULL);`);
  console.log('✔️  Tabela "Users" criada');
  await connection.execute(`CREATE TABLE Trybesmith.Orders
   (id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, userId INTEGER, FOREIGN KEY (userId)
   REFERENCES Trybesmith.Users (id));`);
  console.log('✔️  Tabela "Orders" criada');
  await connection.execute(`CREATE TABLE Trybesmith.Products
   (id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL, name TEXT NOT NULL,
   amount TEXT NOT NULL, orderId INTEGER, FOREIGN KEY (orderId)
   REFERENCES Trybesmith.Orders (id));`);
  console.log('✔️  Tabela "Products" criada\n');
};

const seedUsers = async () => {
  await connection.execute(`INSERT INTO Trybesmith.Users
   (username, classe, level, password) VALUES ("reigal","Guerreiro", 10, "1dragaonoceu")`);
  await connection.execute(`INSERT INTO Trybesmith.Users
   (username, classe, level, password) VALUES ("vyrion","Inventor", 8, "pagandodividas")`);
  await connection.execute(`INSERT INTO Trybesmith.Users
   (username, classe, level, password) VALUES ("yraa","Ladina", 5, "valarmorg")`);
  console.log('✔️  Tabela "Users" populada');
};

const seedOrders = async () => {
  await connection.execute('INSERT INTO Trybesmith.Orders (userId) VALUES (1)');
  await connection.execute('INSERT INTO Trybesmith.Orders (userId) VALUES (3)');
  await connection.execute('INSERT INTO Trybesmith.Orders (userId) VALUES (2)');
  console.log('✔️  Tabela "Order" populada');
};

const seedProducts = async () => {
  await connection.execute(`INSERT INTO Trybesmith.Products
   (name, amount) VALUES ("Espada curta","10 peças de ouro")`);
  await connection.execute(`INSERT INTO Trybesmith.Products
   (name, amount, orderId) VALUES ("Escudo desnecessariamente grande","20 peças de ouro", 1)`);
  await connection.execute(`INSERT INTO Trybesmith.Products
   (name, amount, orderId) VALUES ("Adaga de Aço Valírico","1 peça de ouro", 2)`);
  await connection.execute(`INSERT INTO Trybesmith.Products
   (name, amount, orderId) VALUES ("Engenhoca aleatória","15 peças de ouro", 3)`);
  console.log('✔️  Tabela "Products" populada\n');
};

const recreateDatabase = async () => {
  try {
    await dropSchema();
    await createSchema();
    await seedUsers();
    await seedOrders();
    await seedProducts();
    await connection.end();
    console.log('🥳  Banco de Dados "Trybesmith" populado com sucesso');
  } catch (err) {
    console.log(err);
  }
};

recreateDatabase();