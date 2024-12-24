# MC SERVER STATUS 

![image](https://github.com/user-attachments/assets/91db381b-c0a5-467e-9415-be9d01b1b47e)

![image](https://github.com/user-attachments/assets/9eda0f66-cdef-4882-b781-fd20d1c5f694)

![image](https://github.com/user-attachments/assets/ccf53bcf-c191-4bd5-89e2-aa58adf905b0)

# FEATURES

- User Sign up/Sign in
- Voting
- Server MOTD and Ping
- Add Custom Server 
- Admin Mode

# installation

## WINDOWS AND LINUX INSTALLATIONS ARE VERY SIMILAR

### In windows just download the the source code & In linux git clone this repo and cd into it

- Run `npm i`
- Run npm run dev

  wallah youre done man

## Now for admin mode it is kind of tricky

( for this, fucking use youre supabase, replace the url and key in .env )

To make someone an admin:

Use Supabase dashboard
Go to Authentication > Users
Select the user
Add custom metadata: { "is_admin": true }
The admin panel will automatically appear for users with admin privileges. They can:

View all servers in a table format
Delete unwanted servers
See when servers were added
The changes maintain security through RLS policies and proper access checks

# FOR SUPPORT COME AT https://discord.gg/CR7s2aEf9T
