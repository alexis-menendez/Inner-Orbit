InnerOrbit/  
│  
├── instructions/                  
│   └── *instructions, guides, etc...*   
│   
├── Assets/                         
│   └── *Screenshots for README, design references*
│  
├── client/                       # *Frontend (React)*  
│   ├── public/  
│   │   └── assets/  
│   │       ├── animations/
│   │       ├── audio/
│   │       ├── images/
│   │       └── video/
│   │   
│   ├── dist/  
│   │   └── ...  
│   │   
│   ├── src/  
│   │   ├── api/  
│   │   │   ├── authAPI.ts         # *Login, signup, verify JWT, logout* 
│   │   │   ├── journalAPI.ts      # *Create/view/edit/delete journal entries* 
│   │   │   ├── moodAPI.ts         # *Log/view moods; used by Tracker*
│   │   │   ├── postAPI.ts         # *Create/view posts (with privacy logic: private/friends/public)*  
│   │   │   ├── userAPI.ts         # *Fetch user profile, settings, avatar, friends lists, groups, etc...*
│   │   │   ├── libraryAPI.ts      # *Fetch library items (books, movies, etc...)*
│   │   │   └── groupAPI.ts        # *Manage friend groups/pods (create, join, get members)*
│   │   │  
│   │   ├── assets/   
│   │   │   └── css/  
│   │   │       ├── common/              
│   │   │       │   └── *Global reusable styles like button styles, loading spinners, modals, etc...*
│   │   │       │   
│   │   │       ├── layout/                
│   │   │       │   └── *CSS for page or container-level layout components (grid/flexbox layouts, responsive wrappers, Navbars)* 
│   │   │       │   
│   │   │       └── effects/  
│   │   │           └── *Dedicated styles for interactive or animated elements, like the starfield, nebula, and orbit visuals, etc..*
│   │   │  
│   │   ├── components/  
│   │   │   ├── auth/  
│   │   │   │   ├── LoginForm.tsx  
│   │   │   │   └── RegisterForm.tsx  
│   │   │   │   
│   │   │   ├── dashboard/   
│   │   │   │   └── *any components created specifically for the dashboard page...*
│   │   │   │   
│   │   │   ├── feed/  
│   │   │   │   └── *any components created specifically for the feed page...* 
│   │   │   │   
│   │   │   ├── tracker/  
│   │   │   │   └── *any components created specifically for the tracker page...*
│   │   │   │   
│   │   │   ├── journal/  
│   │   │   │   └── *any components created specifically for the journal page...*
│   │   │   │   
│   │   │   ├── library/  
│   │   │   │   └── *any components created specifically for the library page...*
│   │   │   │  
│   │   │   ├── layout/  
│   │   │   │   ├──  ProtectedRoute.tsx  
│   │   │   │   └── *things like "Navbar.tsx", PaggeWrapper.tsx, etc...*  
│   │   │   │   
│   │   │   ├── common/   
│   │   │   │   └── *things like "ErrorMessage.tsx", "LoadingSpinner.tsx", "Button.tsx", etc...*
│   │   │   │   
│   │   │   └── user/   
│   │   │       └── *things like "FriendsList.tsx", "FriendGroups.tsx", "UserProfile.tsx", etc...*
│   │   │
│   │   ├── graphql/  
│   │   │   ├── queries.ts  
│   │   │   ├── mutations.ts  
│   │   │   └── client.ts  
│   │   │
│   │   ├── hooks/  
│   │   │   └── ...
│   │   │
│   │   ├── interfaces/  
│   │   │   ├── Auth.ts            # *Token data, login/signup responses*
│   │   │   ├── User.ts            # *User profile data, friend lists, groups*
│   │   │   ├── Mood.ts            # *Mood log (emoji, timestamp, optional note)*
│   │   │   ├── JournalEntry.ts    # *Full journal entries*
│   │   │   ├── Post.ts            # *Post content, author, privacy level*
│   │   │   ├── Group.ts           # *Friend group metadata (name, members, activity)*
│   │   │   └── LibraryItem.ts     # *Music or meditation items (title, url, tags)* 
│   │   │
│   │   ├── pages/  
│   │   │   ├── Home.tsx  
│   │   │   ├── Dashboard.tsx  
│   │   │   ├── Journal.tsx  
│   │   │   ├── Tracker.tsx  
│   │   │   ├── UserProfile.tsx  
│   │   │   ├── FriendGroup.tsx  
│   │   │   ├── Feed.tsx  
│   │   │   ├── Library.tsx  
│   │   │   └── NotFound.tsx  
│   │   │
│   │   ├── utils/
│   │   │   ├── auth.ts            # *JWT handling, getUserFromToken(), isLoggedIn()*
│   │   │   ├── formatDate.ts      # *Convert timestamps to readable formats*
│   │   │   ├── privacyFilter.ts   # *Filter posts or journals by privacy (optional but useful?)*
│   │   │   └── audioPlayer.ts     # *Play/pause helpers for meditation/music (for Library)*
│   │   │
│   │   ├── App.tsx  
│   │   ├── index.css  
│   │   └── main.tsx  
│   │
│   ├── node_modules/   
│   │    └── ...    
│   │      
│   ├── .eslintrc.cjs   
│   ├── .gitignore  
│   ├── index.html    
│   ├── package.json    
│   ├── postcss.config.js   
│   ├── tailwind.config.js    
│   ├── tsconfig.json    
│   ├── tsconfig.node.json    
│   ├── vite.config.js   
│   └── vitest.config.js   
│
├── server/                          # *Backend (Node + GraphQL + Mongo)* 
│   │   
│   ├── dist/  
│   │   └── ...  
│   │                       
│   ├── src/  
│   │   ├── config/  
│   │   │   └── connection.ts  
│   │   │   
│   │   ├── controllers/  
│   │   │   ├── authController.ts     # signup, login, token handling
│   │   │   ├── userController.ts     # get profile, friends, group membership
│   │   │   ├── moodController.ts     # log moods, get recent moods
│   │   │   ├── journalController.ts  # create, update, delete journal entries
│   │   │   ├── postController.ts     # create/read posts with privacy logic
│   │   │   ├── groupController.ts    # manage friend pods
│   │   │   └── libraryController.ts  # get meditation/music content
│   │   │ 
│   │   ├── middleware/
│   │   │   └── auth.ts              # JWT auth middleware (adds user to context)  
│   │   │  
│   │   ├── models/              # Mongoose schemas
│   │   │   ├── User.ts              # *name, email, password, friends, groups*
│   │   │   ├── Mood.ts              # *emoji, timestamp, note, user ref*  
│   │   │   ├── JournalEntry.ts      # *full journal entry, user ref, optional tags*  
│   │   │   ├── Post.ts              # *content, privacy level, user ref, createdAt*  
│   │   │   ├── Group.ts             # *name, members, createdBy*  
│   │   │   └── LibraryItem.ts       # *title, type (music/meditation), url, tags* 
│   │   │     
│   │   ├── routes/  
│   │   │   ├── api/    
│   │   │   │   ├── index.ts
│   │   │   │   ├── userRoutes.ts
│   │   │   │   ├── moodRoutes.ts
│   │   │   │   ├── journalRoutes.ts
│   │   │   │   ├── groupRoutes.ts (would this be in user routes???? /Alexis)
│   │   │   │   └── libraryRoutes.ts
│   │   │   │   
│   │   │   ├── index.ts
│   │   │   └── authRoutes.ts
│   │   |    
│   │   ├── schemas/  
│   │   │   ├── resolvers.ts         # Query + Mutation logic using controllers/models
│   │   │   ├── typeDefs.ts          # All types: Query, Mutation, types for User, Post, etc.
│   │   │   └── index.ts             # Combines typeDefs + resolvers for Apollo
│   │   │   
│   │   ├── seeds/  
│   │   │   ├── index.ts
│   │   │   ├── user-seeds.ts
│   │   │   ├── user.json
│   │   │   ├── post-seeds.ts
│   │   │   ├── post.json
│   │   │   ├── mood-seeds.ts
│   │   │   ├── mood.json
│   │   │   ├── journal-seeds.ts
│   │   │   └── journal.json
│   │   │      
│   │   ├── types/   
│   │   │   └── express/  
│   │   │       └── index.d.ts 
│   │   │    
│   │   ├── utils/  
│   │   │   ├── auth.ts  
│   │   │   ├── cloudinary.ts  
│   │   │   ├── errorHandler.ts  
│   │   │   └── formatDate.ts 
│   │   │   
│   │   └── server.ts  
│   │  
│   ├── node_modules/   
│   │    └── ...    
│   │      
│   ├── dist/  
│   ├── package.json  
│   ├── tsconfig.json  
│   ├── jest.config.js 
│   ├── .gitignore  
│   └── .env  
│
├── node_modules/   
│    └── ...    
│      
├── .env 
├── .gitattributes 
├── .gitignore  
├── README.md  
├── package.json                  # Root-level for install-all, build-all, etc.  
├── tsconfig.json                 # Shared config  
└── README.md 
