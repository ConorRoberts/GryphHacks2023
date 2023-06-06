# Habit Step
Our submission for the GrypHacks2023 hackathon.

## The Devpost
Check out the [**Devpost here**](https://devpost.com/software/habit-plan) for more info about the project!
<br/>
<br/>

## Setup & Installation
1. You will need your own set of environemnt variables. <br/>
Create a `.env` file in the **root directory** and paste the following in the file.<br/>
_(you will need to replace_ `your_key_here` _with your own variables)_
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

2. To install the packages and dependencies

    ```
    npm install
    ```

3. To run the app

    ```
    npm run dev
    ```
