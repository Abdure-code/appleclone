const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "myDBuser",
  password: "root",
  database: "mydb",
});

app.get("/install", (req, res) => {
  let message = "Tables created successfully";
  const tableProducts = `CREATE TABLE products (
        product_id int AUTO_INCREMENT,
        product_url varchar(255) NOT NULL,
        product_name varchar(255) NOT NULL,
        PRIMARY KEY (product_id)
    )`;

  const tableProductDescription = `CREATE TABLE product_description (
        description_id int AUTO_INCREMENT,
        product_id int NOT NULL,
        Product_brief_description varchar(255) NOT NULL, 
        Product_description varchar(255) NOT NULL,
        Product_img varchar(255) NOT NULL,
        Product_link varchar(255) NOT NULL,
        PRIMARY KEY (description_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`;

  const tableProductPrice = `CREATE TABLE product_price (
        price_id int AUTO_INCREMENT,
        product_id int NOT NULL,
        Starting_price varchar(255) NOT NULL,
        Price_range varchar(255) NOT NULL,
        PRIMARY KEY (price_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`;

  const tableUsers = `CREATE TABLE users (
        user_id int AUTO_INCREMENT,
        User_name varchar(255) NOT NULL,
        User_password varchar(255) NOT NULL,
        PRIMARY KEY (user_id)
    )`;

  const tableOrder = `CREATE TABLE orders (
        order_id int AUTO_INCREMENT,
        product_id int NOT NULL,
        user_id int NOT NULL,
        PRIMARY KEY (order_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`;

  connection.query(tableProducts, (err, results, fields) => {
    if (err) console.log(err);
  });
  connection.query(tableProductDescription, (err, results, fields) => {
    if (err) console.log(err);
  });
  connection.query(tableProductPrice, (err, results, fields) => {
    if (err) console.log(err);
  });
  connection.query(tableUsers, (err, results, fields) => {
    if (err) console.log(err);
  });
  connection.query(tableOrder, (err, results, fields) => {
    if (err) console.log(err);
  });

  res.send(message);
});

// Insert data
app.post("/addipones", (req, res) => {

  console.log(req.body  )
  const {
    iphoneId,
    imgPath,
    iphoneLink,
    iphoneTitle,
    briefDescription,
    startPrice,
    priceRange,
    fullDescription,
    UserName,
    password
  } = req.body;



  let insertProducts =
    "INSERT INTO Products (product_url, product_name) VALUES (?, ?)";
  let insertProductDescription =
    "INSERT INTO product_description (product_id,Product_brief_description, Product_description, Product_img, Product_link) VALUES ( ?, ?, ?, ?,?)";
  let insertProductPrice =
    "INSERT INTO product_price (product_id,Starting_price, Price_range) VALUES (?, ?, ?)";
  let insertUsers =
    "INSERT INTO users (User_name, User_password) VALUES (?, ?)";

  let insertOrder = "INSERT INTO orders (product_id, user_id) VALUES (?, ?)";
    
  connection.query(
    insertProducts,
    [iphoneId, iphoneTitle],
    (err, results, fields) => {
      if (err) console.log(err);
      console.log(results); // info about the affected row  - update , insert , delete
      let Id = results.insertId;  // 1 , 2
      connection.query(
        insertProductDescription,
        [Id, briefDescription, fullDescription, imgPath, iphoneLink],
        (err) => {
          if (err) console.log(err);
        }
      );
      connection.query(
        insertProductPrice,
        [Id, startPrice, priceRange],
        (err) => {
          if (err) console.log(err);
        }
      );

   connection.query(
        insertUsers, [UserName, password],(err, results, fields) => {
        
        
          if (err) console.log(err);
           let userId = results.insertId  // 1 ,2 ,3
          console.log("hello",results);
       connection.query(
          insertOrder,
          [Id, userId],
          (err) => {
            if (err) console.log(err);
          }
        );
      } 
      );
     
    }
  );
   
  res.send("Data inserted successfully");
  console.log("1 record inserted");
});

// Get data
app.get("/iphone", (req, res) => {
  const selectProducts = `
    SELECT 
      p.product_url, 
      p.product_name, 
      pd.Product_brief_description, 
      pd.Product_description, 
      pd.Product_img, 
      pd.Product_link, 
      pp.Starting_price, 
      pp.Price_range
    FROM Products p
    INNER JOIN product_description pd ON p.product_id = pd.product_id
    INNER JOIN product_price pp ON p.product_id = pp.product_id;
  `;

  connection.query(selectProducts, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving products");
    } else {
      res.json(results);
    }
  });
  
    
  });




connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port : http://localhost:${port}`);
});
