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
│   │   │       │   ├── Logo.module.css   
│   │   │       │   ├── MainLayoutBackground.module.css   
│   │   │       │   ├── ShootingStar.module.css   
│   │   │       │   ├── TransparentStarsmodule.css   
│   │   │       │   └── *Global reusable styles like button styles, loading spinners, modals, etc...*
│   │   │       │  
│   │   │       ├── dashboard/ 
│   │   │       │   ├── Dashboard.module.css  
│   │   │       │   ├── MoodBubble.module.css  
│   │   │       │   ├── PomodoroTimer.module.css    
│   │   │       │   ├── SquidPet.module.css  
│   │   │       │   └── *Dedicated styles for elements on the Dashboard.* 
│   │   │       │   
│   │   │       ├── journal/ 
│   │   │       │   ├── Notebook.module.css  
│   │   │       │   ├── Stars.module.css    
│   │   │       │   └── *Dedicated styles for the journal and constellations pages.* 
│   │   │       │   
│   │   │       ├── layout/   
│   │   │       │   ├── NavBar.module.css             
│   │   │       │   └── *CSS for page or container-level layout components (grid/flexbox layouts, responsive wrappers, Navbars)* 
│   │   │       │   
│   │   │       ├── service/   
│   │   │       │   ├── PrivacyPolicy.module.css            
│   │   │       │   └── Terms.module.css
│   │   │       │  
│   │   │       └── tracker/  
│   │   │           ├── Tracker.module.css
│   │   │           └── *Dedicated styles for the tracker page*
│   │   │  
│   │   ├── components/  
│   │   │   ├── common/  
│   │   │   │   ├── MainLayoutBackground.tsx  
│   │   │   │   ├── ShootingStar.tsx  
│   │   │   │   ├── StarBackground.tsx  
│   │   │   │   ├── TransparentStars.tsx  
│   │   │   │   └── *things like "ErrorMessage.tsx", "LoadingSpinner.tsx", "Button.tsx", etc...*
│   │   │   │   
│   │   │   ├── dashboard/   
│   │   │   │   ├── pomodoro/
│   │   │   │   │   ├──  FocusTaskList.tsx
│   │   │   │   │   ├──  PomodoroTimer.tsx
│   │   │   │   │   └──  TimerSettings.tsx
│   │   │   │   │  
│   │   │   │   ├── pet/
│   │   │   │   │   ├──  dev/
│   │   │   │   │   │    └── SquidPetDev.tsx
│   │   │   │   │   ├──  MoodBubble.tsx
│   │   │   │   │   ├──  SpriteAnimator.tsx
│   │   │   │   │   └──  SquidPet.tsx
│   │   │   │   │  
│   │   │   │   ├──  weekly/
│   │   │   │   │   ├──  MoodNotes.tsx
│   │   │   │   │   └──  WeeklyMoodCalendar.tsx
│   │   │   │   │  
│   │   │   │   └── *any components created specifically for the dashboard page...*
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
│   │   │   │   ├──  ViewJournal.tsx 
│   │   │   │   └── *any components created specifically for the journal page...*
│   │   │   │  
│   │   │   ├── layout/  
│   │   │   │   ├──  JournalLayout.tsx 
│   │   │   │   ├──  LoginLayout.tsx 
│   │   │   │   ├──  MainLayout.tsx  
│   │   │   │   ├──  ProtectedRoute.tsx  
│   │   │   │   └── *things like "PaggeWrapper.tsx", etc...* 
│   │   │   │  
│   │   │   ├── library/   
│   │   │   │   ├──  CloudinaryWidget.tsx
│   │   │   │   └── *any components created specifically for the library page...*
│   │   │   │  
│   │   │   ├── nav/  
│   │   │   │   ├──  Footer.tsx 
│   │   │   │   ├──  NavBar.tsx 
│   │   │   │   └── *things like "Navbar.tsx", PaggeWrapper.tsx, etc...*  
│   │   │   │
│   │   │   ├── tracker/  
│   │   │   │   ├──  CreateMood.tsx 
│   │   │   │   ├──  MoodCalendar.tsx  
│   │   │   │   ├──  MoodComboBoxtsx  
│   │   │   │   ├──  MoodModal.tsx  
│   │   │   │   └── *any components created specifically for the tracker page...*
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
│   │   │   ├── usePetEmotion.ts 
│   │   │   └── useTaskStore.ts 
│   │   │
│   │   ├── models/  
│   │   │   ├── Auth.ts 
│   │   │   ├── GraphQL.ts 
│   │   │   ├── index.ts 
│   │   │   ├── Journal.ts 
│   │   │   ├── Mood.ts                                                     
│   │   │   └── User.ts       
│   │   │
│   │   ├── pages/  
│   │   │   ├── Dashboard.tsx 
│   │   │   ├── Home.tsx  
│   │   │   ├── Journal.tsx           
│   │   │   ├── Library.tsx         
│   │   │   ├── NotFound.tsx        (not yet created) 
│   │   │   ├── Tracker.tsx         
│   │   │   └── UserProfile.tsx     (not yet created)       
│   │   │
│   │   ├── utils/
│   │   │   ├── API.ts 
│   │   │   ├── auth.ts 
│   │   │   ├── loadFrames.ts 
│   │   │   └── moodQuotes.ts  
│   │   │
│   │   ├── appolloClient.ts
│   │   ├── App.tsx 
│   │   ├── custom.d.ts   
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
│   ├── src/  
│   │   ├── config/  
│   │   │   └── connections.ts  
│   │   │   
│   │   ├── controllers/  
│   │   │   ├── index.ts
│   │   │   ├── authController.ts 
│   │   │   ├── journalController.ts 
│   │   │   ├── libraryController.ts     
│   │   │   ├── trackerController.ts        
│   │   │   └── userController.ts                
│   │   │ 
│   │   ├── middleware/   
│   │   │   └── auth.ts          
│   │   │  
│   │   ├── models/            
│   │   │   ├── index.ts
│   │   │   ├── Journal.ts
│   │   │   ├── Tracker.ts 
│   │   │   └── User.ts                                              
│   │   |    
│   │   ├── routes/            
│   │   │   └── libraryRoutes.ts    
│   │   |    
│   │   ├── schemas/  
│   │   │   ├── scalars/
│   │   │   │   └── DateScalar.ts
│   │   │   │
│   │   │   ├── index.ts
│   │   │   ├── resolvers.ts         
│   │   │   └── typeDefs.ts                    
│   │   │   
│   │   ├── seeds/  
│   │   │   ├── index.ts             
│   │   │   ├── user-seeds.ts        
│   │   │   └── user.json                     
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
