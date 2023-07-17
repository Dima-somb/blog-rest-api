////USER CRUD

//REGISTER
    URL = localhost:5000/api/auth/login (POST)
    require {
        "password",
        unique {
            "username",
            "email"
        },
        ?"profilePic"
    }

//LOGIN
URL = localhost:5000/api/auth/login (POST)
    require {
        "password",
        unique {
            "username",
            "email"
        },
        ?"profilePic"
    }

//UPDATE USER
URL = localhost:5000/api/users/<userId> (PUT)
    require {
        "userId",
        "password"
    },
    Can be changed {
        "username",
        "email",
        "profilePic"
    }

//DELETE USER
URL = localhost:5000/api/users/<userId> (DELETE)
    require {
        "userId"
    }

//GET USER
URL = localhost:5000/api/users/<userId> (GET)

//-----------------------------------------------

////POST CRUD

//CREATE POST
URL = localhost:5000/api/posts/ (POST)
    require { 
        "username", 
        unique { 
            "title",
            "description"
        },
        ?"categories",   //"categories": "music" or "categories": ["music", "life"]
        ?"photo"
    }
    


//UPDATE POST
URL = localhost:5000/api/posts/<PostId> (PUT)
    require {
        "username"
    },
    Can be changed {
        "title",
        "description",
        "category"
        "categories",
        "photo"
    }

//DELETE POST
URL = localhost:5000/api/posts/<PostId> (DELETE)
    require {
        "username"
    }

//GET POST
URL = localhost:5000/api/posts/<PostId> (GET)

//GET ALL POST
URL = localhost:5000/api/posts/ (GET)
 //- show all posts

URL = localhost:5000/api/posts?user=<username> (GET)
 //- show all posts by user 

URL = localhost:5000/api/posts?catName=<catName> (GET)
//- show all posts by category 

//-------------------------------------

////CATEGORY

//CREATE CATEGORY
URL = localhost:5000/api/categories (POST)
    require {
        "name"
    }

//GET CATEGORY (show)
URL = localhost:5000/api/categories (GET)

////IMAGE UPLOAD

![img.png](readme/img.png)

![img_1.png](readme/img_1.png)