const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const session = require('express-session')
const app = express()
app.use(cors({
    origin:true,
    credentials: true
}))
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect(function(err) { 
    if (err) throw err;
    console.log("connected to database");
})

app.use(session({
    secret: "secret_key",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      httpOnly: true, 
      sameSite: "lax", 
    },
}));

app.get("/me", (req, res) => {
    console.log(req.session)
    return res.json({email: req.session.email});
})


app.post("/login", (req, res) => {
    const {email, password} = req.body;
    const checkEmailQuery = "SELECT * FROM vendor WHERE vendor_email = ?";
    
    connection.query(checkEmailQuery, [email], (err, results) => {
      if (err) return res.status(500).json({error:"Database error. 1"});
  
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid login." });
      }
  
      if (results[0].vendor_pass != password) {
        return res.status(401).json({ error: "wrong password." });
      }
      
      req.session.email = email;
      console.log(req.session);
      return res.status(200).json({message: "logged in"});
    })
    
})


app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
  
    const checkEmailQuery = "SELECT * FROM vendor WHERE vendor_email = ?";
  
    connection.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        console.error("Database error on email check:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (results.length > 0) {
        return res.status(401).json({ error: "Email already in use" });
      }
  
      const insertQuery = "INSERT INTO vendor (vendor_name, vendor_email, vendor_pass) VALUES (?, ?, ?)";
  
      connection.query(insertQuery, [name, email, password], (err, insertResults) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ error: "Error signing up" });
        }
  
        return res.status(200).json({ message: "Signed up successfully" });
      });
    });
  });
  
app.post("/getproducts", (req, res) => {
    const email = req.body.user;

    const query = "SELECT p.* FROM products p JOIN vendor v ON p.vendor_id = v.vendor_id WHERE v.vendor_email = ?;";

    connection.query(query, [email], (err, results) => {
        return res.status(200).json({results})
        
    })
})

app.post("/getads", (req, res) => {
    const email = req.body.user;

    const query = "SELECT a.* FROM ads a JOIN vendor v ON a.vendor_id = v.vendor_id WHERE v.vendor_email = ?;";
    connection.query(query, [email], (err, results) => {
        console.log(results);
        return res.status(200).json({results})
        
    })

})

app.post("/addproduct", (req, res) => {
    const { email, product_name, product_hobby, rentorbuy, price } = req.body;

    const vendorIdQuery = "SELECT vendor_id FROM vendor WHERE vendor_email = ?";
    const insertProductQuery = `
        INSERT INTO products (product_name, product_hobby, vendor_id, rentorbuy, price)
        VALUES (?, ?, ?, ?, ?);
    `;


    connection.query(vendorIdQuery, [email], (err, results) => {
        if (err) {
            console.error("Error fetching vendor:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const vendor_id = results[0].vendor_id;
        console.log(vendor_id);

        connection.query(insertProductQuery, [product_name, product_hobby, vendor_id, rentorbuy, price], (err, result) => {
            if (err) {
                console.error("Insert error:", err);
                return res.status(500).json({ message: "Failed to insert product", error: err });
            }

            return res.status(200).json({ message: "Product added successfully!" });
        });
    });
});

app.post("/addad", (req, res) => {
    const { email, ad_name, description} = req.body;

    const vendorIdQuery = "SELECT vendor_id FROM vendor WHERE vendor_email = ?";
    const insertProductQuery = `
        INSERT INTO ads (ad_name, description, vendor_id)
        VALUES (?, ?, ?);
    `;


    connection.query(vendorIdQuery, [email], (err, results) => {
        if (err) {
            console.error("Error fetching vendor:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const vendor_id = results[0].vendor_id;
        console.log(vendor_id);

        connection.query(insertProductQuery, [ad_name, description, vendor_id], (err, result) => {
            if (err) {
                console.error("Insert error:", err);
                return res.status(500).json({ message: "Failed to insert ad", error: err });
            }

            return res.status(200).json({ message: "Ad added successfully!" });
        });
    });
});


app.listen(5000, () => console.log("server started on port 5000"));