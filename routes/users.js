const express = require("express");
const { required } = require("nodemon/lib/config");
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  res.send(JSON.stringify({ users }, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID


// POST request: Create a new user
router.post("/", (req, res) => {
  const user = {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    DOB: req.query.DOB,
  };
  users.push(user);
  res.send(`The user ${user.firstName} has been succesfully created.`);
});

// PUT request: Update the details of a user by email ID


router.get("/lastName/:lastName", (req, res) => {
  const lastName = req.params.lastName;
  const filtUsers = users.filter((user) => user.lastName == lastName);
  if (filtUsers.length > 0) {
    res.send(filtUsers);
  } else {
    res.send("No user Found");
  }
});

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd);
}

// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
    // Sort the users array by DOB in ascending order
    let sorted_users = users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    // Send the sorted_users array as the response to the client
    res.send(sorted_users);
});

router.put("/:email", (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0];

    // Extract and update DOB if provided

    let DOB = req.query.DOB;
    if (DOB) {
      filtered_user.DOB = DOB;
    }

    let firstName = req.query.firstName;
    if (firstName) {
      filtered_user.firstName = firstName;
    }

    let secondName = req.query.secondName;
    if (secondName) {
      filtered_user.firstName = secondName;
    }

    // Replace old user entry with updated user
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);

    // Send success message indicating the user has been updated
    res.send(`User with the email ${email} updated.`);
  } else {
    // Send error message if no user found
    res.send("Unable to find user!");
  }
});
// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with email: ${email} has been deleted.`);
});
router.get("/:email", (req, res) => {
  const email = req.params.email;
  const requiredUser = users.filter((person) => person.email == email);
  if (requiredUser.length > 0) {
    res.send(requiredUser);
  } else {
    res.send("User not Found");
  }
});
module.exports = router;
