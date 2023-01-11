This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Starter for Projects on Next JS 13

First, run the development server:

install sequilize-cli
```bash
npm install --save-dev sequelize-cli
```

Running migrations
```bash
sequelize db:migrate
```

Running seeds
```bash
sequelize db:seed:all
```

Test user will be created:
```
email: example1@example.com
password: password
```
Thereafter
```bash
npm run dev
# or
yarn dev
```

Project contains:
- Material UI
- Formik
- Yup
- JWT (access, refresh)
- Axios
- Sequelize
- Redux

Create env from env.example.

Implemented user registration and authorization.
Auto-update access token stored in redux state. Refresh token is obtained from cookies