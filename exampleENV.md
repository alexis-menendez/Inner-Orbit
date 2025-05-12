# THIS IS WHAT EVERYONE NEEDS TO HAVE IN THIER .ENV

I noticed on server side some files called "MONGODB_URI" and other called "MONGO_URI" and also some called "JWT_SECRET_KEY" and other called "JWT_SECRET" which was causing breaking errors and inconsistencies. I changed all instances to use "MONGODB_URI" and "JWT_SECRET_KEY". Everyone should use the same naming convention to avoid confusion and errors going forward.


# MongoDB connection
MONGODB_URI=


# JWT Secret for authentication
JWT_SECRET_KEY=

# Cloud Image Storage (Cloudinary) configuration
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Server port
PORT=