# GryphHacks2023

You will need your own set of environemnt variables. <br/>
Create a `.env` file in the root directory and paste the following in the file.<br/>
**(you will need to replace `your_variable_here` with your own variables)**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
OPENAI_API_KEY=your_key_here
HUGGINGFACE_API_KEY=your_key_here
DATABASE_URL=your_key_here
DIRECT_URL=your_key_here
```

To install

```
npm install
```

To run

```
npm run dev
```
