

***UP TO DATE AS OF 5/7/25 /ALEXIS  
  
┌──────────────────────┐  
│ Landing (Home) Page  │  
│  ("/")               │   
│ * Login              │  
│ * Register           │  
└──────────────────────┘  
           │  
┌──────────┴─────────┐  
▼                    ▼  
┌─────────────────┐  ┌────────────────────┐  
│Register Page    │  │Login Page          │  
│ ("/register")   │  │ ("/login")         │  
│ * Create account│  │ * Authenticate user│  
└────────┬────────┘  └──────────┬─────────┘  
         │                      │  
         ▼                      ▼  
┌─────────────────────────────────────┐  
│All Authenticated JWT-protected pages│  
└────────────────┬────────────────────┘  
                 │  
                 ▼  
┌──────────────────────────────┐  
│Dashboard                     │  
│ ("/dashboard")               │  
│ * Mood Tracker               │  
│ * Journal                    │  
│ * *(future additional pages)*│  
└──────────────────────────────┘  
               │  
┌──────────────┴───────────────────────────────────────────┬───────────────────────────┐  
▼                                                          ▼                           ▼  
┌─────────────────────────┐                                ┌─────────────────────┐     ┌─────────────────┐    
│Mood Tracker             │                                │Journal              │     │*future pages...*│  
│ ("/tracker")            │                                │ ("/journal")        │     └─────────────────┘  
│ * view/edit past entries│                                │ * view constellation│     
│ * create new entry      │                                │ * create new entry  │     
└─────────────────────────┘                                └─────────────────────┘     
             │                                                       │  
┌────────────┴────────────────┐                            ┌─────────┴─────────────────────┐    
▼                             ▼                            ▼                               ▼  
┌──────────────────────────┐  ┌──────────────────────┐     ┌────────────────────────────┐  ┌──────────────────────┐  
│View past entry           │  │Create New Enty       │     │View Constellation          │  │Create New Entry      │  
│ ("/history ")            │  │  ("/newmood")        │     │ ("/constellation")         │  │  ("/newjournal")     │  
│ * click on individual day│  │  * create entry modal│     │ * click on individual entry│  │  * create entry modal│  
│     │                    │  └──────────────────────┘     │     │                      │  └──────────────────────┘  
│     ▼                    │                               │     ▼                      │  
│ * view that days entry   │                               │ * view that entry          │  
│     │                    │                               │     │                      │  
│     ▼                    │                               │     ▼                      │  
│ * edit that days entry   │                               │ * edit that entry          │                          │                          │                               │                            │                     
└──────────────────────────┘                               └────────────────────────────┘    

