const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const session = require("express-session");

require('dotenv').config();


const MySQLStore = require("express-mysql-session")(session);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
// console.log(process.env.DB_HOST)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const sessionStore = new MySQLStore({}, db.promise());

app.use(
  session({
    secret: "secret_key",
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);
app.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "not logged in" });
  }

  res.json({  user: req.session.user });
});

app.get("/api/userinfo", async (req, res) => {
  console.log('User info API hit'); // Log when the API is hit

  const user = req.session.user;

  if (!user) {
    console.log("User not logged in");
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    console.log('Fetching data for user ID:', user.id); // Log the user ID

    const [rows] = await db.execute(
      `SELECT 
        id,
        name,
        profile_photo,
        dob,
        email,
        phone,
        city,
        state,
        country,
        gender,
        current_status,
        followers,
        age_group,
        education
      FROM users 
      WHERE id = ?`,
      [user.id]
    );

    if (rows.length === 0) {
      console.log("User not found in the database");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User data fetched successfully:", rows[0]); // Log the fetched data
    res.status(200).json(rows[0]);

  } catch (error) {
    console.error("Error fetching user data:", error); // Log the error stack
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const user = results[0]; // contains id, name, email, etc.
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ error: "Session error." });
      }
      console.log("Session after login:", req.session);
      res.status(200).json({ message: "Login successful." });
    });
  });
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error. 1" });

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Hashing algorithm can be added here

    const insertNewUser =
      "INSERT INTO users (name, email, password, followers) VALUES (?, ?, ?, 0)";
    db.query(insertNewUser, [name, email, password], (err, results) => {
      if (err) return res.status(500).json({ error: "Database error." });

      req.session.user = { email: email };
      console.log("Session after signup: ", req.session);
      res.json({ message: "Signup successful!", user: req.session.user });
    });
  });
});

app.post("/saveUserDetails", (req, res) => {
  const { city, state, country, dob, phone, education, gender, email } =
    req.body;

  const calculate_age = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    return age_now;
  };

  var age_group = null;
  const age = calculate_age(dob);
  if (age < 20) age_group = "0-19";
  else if (age < 36) age_group = "19-35";
  else if (age < 51) age_group = "36-50";
  else age_group = "51+";

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  const query = `
    UPDATE users 
    SET city = ?, state = ?, country = ?, dob = ?, phone = ?, education = ?, gender = ?, age_group = ?
    WHERE email = ?;
  `;

  db.query(
    query,
    [city, state, country, dob, phone, education, gender, age_group, email],
    (err) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "hehe" });
      }
      res.json({ message: "User details saved successfully" });
    }
  );
});

app.post("/saveHobbies", (req, res) => {
  const { email, hobbies } = req.body;

  if (!Array.isArray(hobbies) || hobbies.length === 0) {
    return res.status(400).json({ message: "No hobbies selected" });
  }

  // Remove old hobbies before inserting new ones
  db.query("DELETE FROM user_hobbies WHERE email = ?", [email], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Insert new hobbies
    const values = hobbies.map((hobby) => [email, hobby]);
    db.query(
      "INSERT INTO user_hobbies (email, hobby) VALUES ?",
      [values],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Hobbies saved successfully" });
      }
    );
  });
});

app.post("/saveHobbyDetails", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "User not logged in" });
  }

  const email = req.session.user.email;
  const { hobby, description, experience } = req.body;

  const updateQuery = `
    UPDATE user_hobbies 
    SET description = ?, experience = ? 
    WHERE email = ? AND hobby = ?`;

  db.query(
    updateQuery,
    [description, experience, email, hobby],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.affectedRows === 0) {
        // If no rows were updated, insert a new hobby
        const insertQuery = `
        INSERT INTO user_hobbies (email, hobby, description, experience)
        VALUES (?, ?, ?, ?)`;

        db.query(
          insertQuery,
          [email, hobby, description, experience],
          (err, insertResult) => {
            if (err) {
              console.error("Database error on insert:", err);
              return res.status(500).json({ message: "Database error" });
            }
            return res
              .status(201)
              .json({ message: "Hobby added successfully!" });
          }
        );
      } else {
        res
          .status(200)
          .json({ message: "Hobby details updated successfully!" });
      }
    }
  );
});

app.post("/profiles", (req, res) => {
  const email = req.session.user.email;
  const { city, state, country, age, gender, education, followers, experience } = req.body.filters;

  // Constructing the dynamic query based on the filters
  let query = `
    SELECT DISTINCT u.id, u.name, u.followers, u.city, u.state, u.country, 
           u.gender, u.dob, u.email, u.age_group, u.education, h.hobby
    FROM users u
    JOIN user_hobbies h ON u.email = h.email
    WHERE h.hobby IN (SELECT hobby FROM user_hobbies WHERE email = ?) 
      AND u.email <> ?`;

  // Adding filters to the query
  if (city) query += ` AND u.city = ?`;
  if (state) query += ` AND u.state = ?`;
  if (country) query += ` AND u.country = ?`;
  if (age) query += ` AND u.age_group = ?`;
  if (gender) query += ` AND u.gender = ?`;
  if (education) query += ` AND u.education = ?`;
  if (followers) query += ` AND u.followers BETWEEN ? AND ?`;

  const queryParams = [email, email];

  // Adding filter values to the queryParams array
  if (city) queryParams.push(city);
  if (state) queryParams.push(state);
  if (country) queryParams.push(country);
  if (age) queryParams.push(age);
  if (gender) queryParams.push(gender);
  if (education) queryParams.push(education);
  if (followers) {
    const [minFollowers, maxFollowers] = followers.split("-");
    queryParams.push(minFollowers, maxFollowers);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching profiles:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Group users by their ID and aggregate their hobbies
    const groupedProfiles = results.reduce((group, profile) => {
      if (!group[profile.id]) {
        group[profile.id] = {
          id: profile.id,
          name: profile.name,
          followers: profile.followers,
          city: profile.city,
          state: profile.state,
          country: profile.country,
          gender: profile.gender,
          dob: profile.dob,
          email: profile.email,
          age_group: profile.age_group,
          education: profile.education,
          hobbies: []
        };
      }

      if (!group[profile.id].hobbies.includes(profile.hobby)) {
        group[profile.id].hobbies.push(profile.hobby);
      }

      return group;
    }, {});

    res.json(Object.values(groupedProfiles));
  });
});

app.get("/gethobbies", (req, res) => {
  const query = "SELECT hobby from hobbies";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching hobbies: ", err);
      return res.status(500).json({ error: "database error" });
    }
    res.json(results);
  });
});

app.post("/gethobbyrisk", (req, res) => {
  const { hobby } = req.body;

  const query =
    "SELECT fin, func, phys, psych, social, sat, time from hobbies WHERE hobby = ?";
  db.query(query, [hobby], (err, results) => {
    if (err) {
      console.error("Error fetching risks: ", err);
      return res.status(500).json({ error: "database error" });
    }

    res.json(results);
  });
});

app.post("/userhobby", (req, res) => {
  const { email } = req.body;

  const query =
    "SELECT hobby, experience, description FROM user_hobbies WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching hobbies: ", err);
      return res.status(500).json({ error: "database error" });
    }

    res.json(results);
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // Default session cookie name
    res.json({ message: "Logged out successfully" });
  });
});

app.listen(3005, () => {
  console.log("Server listening on port 3005");
});
