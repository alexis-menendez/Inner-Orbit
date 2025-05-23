Stable as of commit: 0aac851

Running "dev:clean:install:build:start" from root:
- successfully builds client
- successfully boots server

Checks that Pass / Fail:
- client build + server boot checks pass
- Typescript error check passes

Functionality:
- Login works for seeded and created users
- journal creation works and saves to db
- constellation logic works
- tracker creation works and saves to db




5/23/25 update:

tracker does not work.

when I go to tracker I do not see the logs I have created.

I cannot create new logs, when I try this is what happens:

chrome dev tools:

react-dom_client.js?v=abacfe74:5747 Encountered two children with the same key, `resentful`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.

Tracker.tsx:203 [MODAL SUBMIT] resolvedDate: Thu May 22 2025 00:00:00 GMT-0500 (Central Daylight Time)
Tracker.tsx:39 [TRACKER] localStorage token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmQ0MDVmNTJmMTc3YzI4Yzg5NzU3NyIsInVzZXJuYW1lIjoiV2hpbXN5V29vZHMiLCJpc0RldiI6dHJ1ZSwiaWF0IjoxNzQ3OTg1MTYxLCJleHAiOjE3NDc5OTIzNjF9.0li3Ddl2zwbvNuri5TiKIF9bixy4HEdhypqXZIUYBM0
Tracker.tsx:41 [TRACKER SUBMIT] values.date: Thu May 22 2025 00:00:00 GMT-0500 (Central Daylight Time)
react-dom_client.js?v=abacfe74:5747 Encountered two children with the same key, `resentful`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.


console log:

[0] [1] MongoDB Connected: ac-4zv9fm9-shard-00-01.byfeg4v.mongodb.net
[0] [1] Server ready at http://localhost:3001/graphql
[0] [1] [LOGIN] Attempt: { username: 'WhimsyWoods' }
[0] [1] [LOGIN] Found user: {
[0] [1]   id: new ObjectId('682d405f52f177c28c897577'),
[0] [1]   passwordHash: '$2b$10$886tas1lbGmNSOBB3joD4u.B8EzkimBip77zUChPnFYJg.H8CpGUS'
[0] [1] }
[0] [1] [LOGIN] Password valid: true
[0] [1] [LOGIN] Success. Token issued.
[0] [1] [AUTH] No authenticated user in context.
