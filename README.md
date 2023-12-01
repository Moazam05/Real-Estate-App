
# MERN 🏛 Real Estate App

Real Estate App built on the MERN (MongoDB, Express, React, Node.js) stack. Whether you're looking to explore available properties for rent or sale, or you want to manage your own listings, our app has got you covered!


## Features
Browse Public Listings
- Discover a variety of rental and sale properties in your preferred locations.

User Friendly Sign Up
- Create your account effortlessly using your email and password.

Sign Up with Google
-  For your convenience, the application supports Google account authentication.

Listing Management
- Once you're logged in, take control of your property listings!
- Create new listings, update existing ones, or remove listings that are no longer relevant.

View Your Listings
- Easily keep track of all your property listings in one place.

## Tech Stack

**Client:** React, ReactTypeScript, Redux Toolkit, Material UI, Formik

**API Handlers:** RTK Query

**Server:** Node, Express

**Database:** Mongo DB

**Firebase:** Google account authentication, Image Uploading







## Screenshots

![signup](https://i.postimg.cc/Gtt1X9qz/Sign-Up.png)

![Sign in](https://i.postimg.cc/LXqcPGX0/Log-in.png)

![Dashboard](https://i.postimg.cc/J4Bh8d5x/Home.png)

![About](https://i.postimg.cc/kX9nrXDJ/About.png)

![Profile](https://i.postimg.cc/DwT5dHCY/Profile.png)

![Listing a](https://i.postimg.cc/9FWrdBdY/Create-Listing-a.png)

![Listing b](https://i.postimg.cc/xjk3MnPP/Create-Listing-b.png)

![Update Listing](https://i.postimg.cc/KYDx06rq/Update-Listing.png)

![Listing Lists](https://i.postimg.cc/cCnDm8VQ/Listing-Lists.png)

![Listing View](https://i.postimg.cc/Z0kJ7p0Z/Listing-View.png)

![Filter 1](https://i.postimg.cc/sDFkQVhk/Filter-1.png)

![Filter 2](https://i.postimg.cc/bvJnxfnP/Filter-2.png)

![Filter 3](https://i.postimg.cc/XJ6VVw4P/Filter-3.png)

![Filter 4](https://i.postimg.cc/cHxbMHmH/Filter-4.png)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend ###

```bash
 NODE_ENV:  development
 PORT:      5000
 DATABASE:  Insert your MongoDB database connection link
```

### Frontend ###

```bash
 REACT_APP_API_URL:  'http://127.0.0.1:5000/api/v1/'
```

```bash
 REACT_APP_FIREBASE_API_KEY:  'Enter your Firebase key'
```


## API Reference

### ROUTES

- Endpoint: `http://127.0.0.1:5000/api/v1/users`
- Endpoint: `http://127.0.0.1:5000/api/v1/listings`

### USER API

#### Signup
- **Method:** `POST`
- **Endpoint:** `/signup`

#### Login
- **Method:** `POST`
- **Endpoint:** `/login`

#### Get User
- **Method:** `GET`
- **Endpoint:** `/:id`

#### Update User
- **Method:** `PUT`
- **Endpoint:** `/update/:id`

#### Delete User
- **Method:** `DELETE`
- **Endpoint:** `/delete/:id`

#### Google Authentication
- **Method:** `POST`
- **Endpoint:** `/google`

### LISTING API

#### Get All Listings
- **Method:** `GET`
- **Endpoint:** `/get`

#### Get Single Listing
- **Method:** `GET`
- **Endpoint:** `/listing/:id`

#### Create Listing
- **Method:** `POST`
- **Endpoint:** `/`

#### Get User Listings
- **Method:** `GET`
- **Endpoint:** `/:id`

#### Delete Listing
- **Method:** `DELETE`
- **Endpoint:** `/:id`

#### Update Listing
- **Method:** `PUT`
- **Endpoint:** `/:id`

<div align="center">

---

Made with ❤️ by Muazam

</div>
