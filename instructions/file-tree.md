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
│   │   │   │   
│   │   │   ├── dashboard/   
│   │   │   │   └── *any components created specifically for the dashboard page...*
│   │   │   │   
│   │   │   ├── feed/  
│   │   │   │   └── *any components created specifically for the feed page...* 
│   │   │   │   
│   │   │   ├── home/  
│   │   │   │   ├──  LoginForm.tsx  
│   │   │   │   ├──  RegisterForm.tsx  
│   │   │   │   └── *any components created specifically for the home page...*
│   │   │   │   
│   │   │   ├── tracker/  
│   │   │   │   ├──  moodChart.tsx  
│   │   │   │   ├──  moodSelector.tsx  
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
│   │   │   │   └── *things like "PaggeWrapper.tsx", etc...*  
│   │   │   │  
│   │   │   ├── nav/  
│   │   │   │   ├──  BottomNav.tsx  
│   │   │   │   └── *things like "Navbar.tsx", PaggeWrapper.tsx, etc...*  
│   │   │   │   
│   │   │   ├── common/   
│   │   │   │   └── *things like "ErrorMessage.tsx", "LoadingSpinner.tsx", "Button.tsx", etc...*
│   │   │   │   
│   │   │   └── user/   
│   │   │       └── *things like "FriendsList.tsx", "FriendGroups.tsx", "UserProfile.tsx", etc...*
│   │   │
│   │   ├── context/  
│   │   │   ├── authContext.tsx 
│   │   │   └── themeContext.tsx
│   │   │
│   │   ├── graphql/  
│   │   │   ├── queries.ts  
│   │   │   └── mutations.ts  
│   │   │
│   │   ├── models/  
│   │   │   ├── Index.ts 
│   │   │   ├── Auth.ts 
│   │   │   ├── GraphQL.ts            
│   │   │   ├── User.ts            
│   │   │   ├── Mood.ts            
│   │   │   ├── Journal.ts    
│   │   │   ├── Post.ts (not yet created)            
│   │   │   ├── Group.ts (not yet created)           
│   │   │   └── Library.ts (not yet created)    
│   │   │
│   │   ├── pages/  
│   │   │   ├── Home.tsx  
│   │   │   ├── Dashboard.tsx  
│   │   │   ├── Privacy.tsx  
│   │   │   ├── Terms.tsx 
│   │   │   ├── Journal.tsx (not yet created)  
│   │   │   ├── Tracker.tsx (not yet created)  
│   │   │   ├── UserProfile.tsx (not yet created)  
│   │   │   ├── FriendGroup.tsx (not yet created)  
│   │   │   ├── Feed.tsx (not yet created)  
│   │   │   ├── Library.tsx (not yet created)  
│   │   │   └── NotFound.tsx (not yet created)  
│   │   │
│   │   ├── utils/
│   │   │   ├── auth.ts           
│   │   │   ├── API.ts 
│   │   │   ├── formatDate.ts (not yet created) 
│   │   │   ├── privacyFilter.ts (not yet created) 
│   │   │   └── audioPlayer.ts (not yet created) 
│   │   │
│   │   ├── appolloClient.ts
│   │   ├── App.tsx  
│   │   ├── index.css  
│   │   ├── main.tsx  
│   │   └── vite-env.d.ts 
│   │
│   ├── node_modules/   
│   │    └── ...    
│   │      
│   ├── .eslintrc.cjs   
│   ├── .gitignore  
│   ├── index.html    
│   ├── package.json    
│   ├── postcss.config.cjs   
│   ├── tailwind.config.ts    
│   ├── tsconfig.json    
│   ├── tsconfig.node.json    
│   ├── vite.config.ts   
│   └── vitest.config.ts   
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
│   │   │   ├── index.ts
│   │   │   ├── authController.ts        # signup, login, token handling
│   │   │   ├── userController.ts        # get profile, friends, group membership
│   │   │   ├── trackerController.ts     # log moods, get recent moods
│   │   │   ├── journalController.ts     # create, update, delete journal entries
│   │   │   ├── video.ts  
│   │   │   ├── postController.ts        # create/read posts with privacy logic
│   │   │   ├── groupController.ts       # manage friend pods
│   │   │   └── libraryController.ts     # get meditation/music content
│   │   │ 
│   │   ├── middleware/
│   │   │   ├── multer.ts    
│   │   │   └── auth.ts              # JWT auth middleware (adds user to context)  
│   │   │  
│   │   ├── models/              # Mongoose schemas
│   │   │   ├── index.ts
│   │   │   ├── User.ts              # *name, email, password, friends, groups*
│   │   │   ├── Tracker.ts           # *emoji, timestamp, note, user ref*  
│   │   │   ├── Journal.ts           # *full journal entry, user ref, optional tags*  
│   │   │   ├── Video.ts           
│   │   │   ├── Post.ts              # *content, privacy level, user ref, createdAt*  
│   │   │   ├── Group.ts             # *name, members, createdBy*  
│   │   │   └── Library.ts           # *title, type (music/meditation), url, tags* 
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
│   │   │   ├── trackerColors.ts
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
