InnerOrbit/  
│  
├── instructions/                  
│   └── *instructions, guides, etc...*   
│   
├── Assets/                         
│   └── *Screenshots for README, design references*
│  
├── client/                       
│   ├── public/  
│   │   └── assets/  
│   │       ├── animations/
│   │       ├── audio/
│   │       ├── images/
│   │       └── video/
│   │   
│   ├── src/  
│   │   │  
│   │   ├── assets/   
│   │   │   └── css/  
│   │   │       ├── common/      
│   │   │       │   ├── Button.module.css      
│   │   │       │   ├── CosmicBackground.module.css 
│   │   │       │   ├── Form.module.css   
│   │   │       │   └── *Global reusable styles like button styles, loading spinners, modals, etc...*
│   │   │       │  
│   │   │       ├── dashboard/ 
│   │   │       │   ├── PomodoroTimer.module.css    
│   │   │       │   └── *Dedicated styles for elements on the Dashboard.* 
│   │   │       │ 
│   │   │       ├── effects/   
│   │   │       │   └── *Dedicated styles for interactive or animated elements, like the starfield, nebula, and orbit visuals, etc.* 
│   │   │       │   
│   │   │       ├── journal/ 
│   │   │       │   ├── Stars.module.css    
│   │   │       │   └── *Dedicated styles for the journal and constellations pages.* 
│   │   │       │   
│   │   │       ├── layout/   
│   │   │       │   ├── Tracker.module.css              
│   │   │       │   └── *CSS for page or container-level layout components (grid/flexbox layouts, responsive wrappers, Navbars)* 
│   │   │       │   
│   │   │       └── tracker/  
│   │   │           ├── Stars.module.css   
│   │   │           └── *Dedicated styles for the tracker page*
│   │   │  
│   │   ├── components/  
│   │   │   ├── common/  
│   │   │   │   ├── StarBackground.tsx  
│   │   │   │   └── *things like "ErrorMessage.tsx", "LoadingSpinner.tsx", "Button.tsx", etc...*
│   │   │   │   
│   │   │   ├── dashboard/   
│   │   │   │   ├── pomdoro/
│   │   │   │   │   ├──  FocusTaskList.tsx
│   │   │   │   │   └──  PmodoroTimer.tsx
│   │   │   │   │  
│   │   │   │   ├──  WeeklyMoodCalendar.tsx   
│   │   │   │   └── *any components created specifically for the dashboard page...*
│   │   │   │   
│   │   │   ├── feed/  
│   │   │   │   ├──  (not yet created)   
│   │   │   │   └── *any components created specifically for the feed page...* 
│   │   │   │   
│   │   │   ├── home/  
│   │   │   │   ├──  LoginForm.tsx 
│   │   │   │   ├──  Privacy.tsx   
│   │   │   │   ├──  RegisterForm.tsx  
│   │   │   │   ├──  Terms.tsx  
│   │   │   │   └── *any components created specifically for the home page...*
│   │   │   │   
│   │   │   ├── journal/  
│   │   │   │   ├── dev/
│   │   │   │   │    ├── DevelopConstellations.tsx 
│   │   │   │   │    └── *these are dev files that will never be viewed on the site...* 
│   │   │   │   │    
│   │   │   │   ├──  Constellation.tsx  
│   │   │   │   ├──  ConstellationLogic.tsx 
│   │   │   │   ├──  CreateJournal.tsx 
│   │   │   │   └── *any components created specifically for the journal page...*
│   │   │   │  
│   │   │   ├── layout/  
│   │   │   │   ├──  MainLayout.tsx  
│   │   │   │   ├──  ProtectedRoute.tsx  
│   │   │   │   └── *things like "PaggeWrapper.tsx", etc...* 
│   │   │   │  
│   │   │   ├── nav/  
│   │   │   │   ├──  Footer.tsx 
│   │   │   │   ├──  NavBar.tsx 
│   │   │   │   └── *things like "Navbar.tsx", PaggeWrapper.tsx, etc...*  
│   │   │   │
│   │   │   ├── tracker/  
│   │   │   │   ├──  MoodCalender.tsx 
│   │   │   │   ├──  MoodChart.tsx  
│   │   │   │   ├──  MoodSelector.tsx  
│   │   │   │   └── *any components created specifically for the tracker page...*
│   │   │   │    
│   │   │   ├── library/  
│   │   │   │   ├──  (not yet created)   
│   │   │   │   └── *any components created specifically for the library page...* 
│   │   │   │     
│   │   │   └── user/   
│   │   │       ├──  (not yet created)  
│   │   │       └── *things like "FriendsList.tsx", "FriendGroups.tsx", "UserProfile.tsx", etc...*
│   │   │
│   │   ├── context/  
│   │   │   ├── authContext.tsx 
│   │   │   └── themeContext.tsx
│   │   │
│   │   ├── graphql/  
│   │   │   ├── mutations.ts 
│   │   │   └── queries.ts 
│   │   │
│   │   ├── hooks/   
│   │   │   └── useTaskStore.ts 
│   │   │
│   │   ├── models/  
│   │   │   ├── Auth.ts 
│   │   │   ├── GraphQL.ts 
│   │   │   ├── Group.ts           (not yet created)   
│   │   │   ├── index.ts 
│   │   │   ├── Journal.ts 
│   │   │   ├── Mood.ts 
│   │   │   ├── Post.ts            (not yet created)            
│   │   │   ├── Library.ts         (not yet created)                                             
│   │   │   └── User.ts       
│   │   │
│   │   ├── pages/  
│   │   │   ├── Dashboard.tsx 
│   │   │   ├── Home.tsx  
│   │   │   ├── Feed.tsx            (not yet created)
│   │   │   ├── FriendGroup.tsx     (not yet created)  
│   │   │   ├── Journal.tsx           
│   │   │   ├── Library.tsx         (not yet created) 
│   │   │   ├── NotFound.tsx        (not yet created) 
│   │   │   ├── Tracker.tsx         
│   │   │   └── UserProfile.tsx     (not yet created)       
│   │   │
│   │   ├── utils/
│   │   │   ├── API.ts 
│   │   │   ├── auth.ts  
│   │   │   ├── audioPlayer.ts      (not yet created)           
│   │   │   ├── formatDate.ts       (not yet created) 
│   │   │   └── privacyFilter.ts    (not yet created) 
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
│   ├── dist/   
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
├── server/                          
│   ├── scripts/   
│   │    └── clearUsers.ts    
│   │                         
│   ├── src/  
│   │   ├── config/  
│   │   │   └── connections.ts  
│   │   │   
│   │   ├── controllers/  
│   │   │   ├── index.ts
│   │   │   ├── authController.ts 
│   │   │   ├── groupController.ts       (not created yet)
│   │   │   ├── journalController.ts 
│   │   │   ├── libraryController.ts     (not created yet)
│   │   │   ├── postController.ts        (not created yet) 
│   │   │   ├── trackerController.ts        
│   │   │   ├── userController.ts                
│   │   │   └── videoController.ts  
│   │   │ 
│   │   ├── middleware/   
│   │   │   ├── auth.ts     
│   │   │   └── multer.ts         
│   │   │  
│   │   ├── models/            
│   │   │   ├── index.ts
│   │   │   ├── Group.ts              (not created yet)
│   │   │   ├── Journal.ts
│   │   │   ├── Library.ts            (not created yet)
│   │   │   ├── Post.ts               (not created yet) 
│   │   │   ├── Tracker.ts 
│   │   │   ├── User.ts                                    
│   │   │   └── Video.ts           
│   │   |    
│   │   ├── schemas/  
│   │   │   ├── index.ts
│   │   │   ├── resolvers.ts         
│   │   │   └── typeDefs.ts                    
│   │   │   
│   │   ├── seeds/  
│   │   │   ├── index.ts             
│   │   │   ├── user-seeds.ts        
│   │   │   ├── user.json             
│   │   │   ├── post-seeds.ts        (not yet created) 
│   │   │   ├── post.json            (not yet created) 
│   │   │   ├── tracker-seeds.ts     (not yet created) 
│   │   │   ├── tracker.json         (not yet created) 
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
│   │   │   ├── formatDate.ts
│   │   │   └── trackerColors.ts
│   │   │   
│   │   └── server.ts  
│   │  
│   ├── node_modules/   
│   │    └── ...    
│   │      
│   ├── dist/  
│   │   └── ...  
│   │   
│   ├── .env 
│   ├── .gitignore  
│   ├── jest.config.js
│   ├── package.json  
│   └── tsconfig.json   
│
├── node_modules/   
│    └── ...    
│      
├── .env 
├── .gitattributes 
├── .gitignore  
├── exampleENV.md 
├── notes.md 
├── package.json                  # Root-level for install-all, build-all, etc.  
├── tsconfig.json                 # Shared config  
└── README.md 
