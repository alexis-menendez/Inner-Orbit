

NOT UP TO DATE SINCE THE REPO RESTRUCTURE, DO NOT USE UNTIL UPDATES /ALEXIS

                        ┌──────────────────────┐  
                        │ Landing Page         │  
                        │  ("/")               │   
                        │ * App overview       │  
                        │ * Login/Register     │  
                        └──────────────────────┘  
                                 │  
              ┌──────────────────┴─────────────────────┐  
              ▼                                        ▼  
┌────────────────────────────┐         ┌──────────────────────────┐  
│      Register Page         │         │      Login Page          │  
│  ("/register")             │         │  ("/login")              │  
│  * Create account          │         │  * Authenticate user     │  
└────────────┬───────────────┘         └────────────┬─────────────┘  
             │                                      │  
             ▼                                      ▼  
     ┌─────────────────────────────────────────────────────────┐  
     │                  Authenticated Main App View            │  
     │               (JWT-protected routes below)              │  
     └────────────┬────────────────────────────────────────────┘  
                  ▼  
        ┌───────────────────────────┐  
        │     Dashboard             │
        │  ("/dashboard")           │  
        │  * Log today’s mood       │  
        │  * View past entries      │  
        │  * Star visualization     │  
        └─────┬─────────────┬───────┘  
              │             │  
              ▼             ▼  
┌──────────────────────┐ ┌──────────────────────────────┐  
│ New Mood Log Page    │ │  Mood Entry Detail Modal     │  
│ ("/new")             │ │  (Triggered via star click)  │  
│ * Emoji + journal    │ │  * Mood, text, timestamp     │  
│ * Optional: Share    │ │  * “Resonate” toggle         │  
└──────────────────────┘ └──────────────────────────────┘  
              │  
              ▼  
┌────────────────────────────┐  
│     Public Nebula Feed     │  
│    ("/nebula")             │  
│ * Anonymous shared moods   │  
│ * “Resonate” feature       │  
└────────────────────────────┘  
              │  
              ▼  
┌────────────────────────────┐  
│  Prompt Reflection View    │  
│ ("/prompts")               │  
│ * Weekly themes            │  
│ * User can submit entry    │  
│ * Stars shown by theme     │  
└────────────────────────────┘  
              │  
              ▼  
┌─────────────────────────────┐  
│   Orbit Circle Page         │  
│ ("/orbit")                  │  
│ * Private mood group view   │  
│ * See other members' moods  │  
│ * Send reactions            │  
└─────────────────────────────┘  
  