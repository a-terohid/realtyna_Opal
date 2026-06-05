This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To begin, follow these steps:

### 1. Setting Up Environment Variables

Edit and save necessary information in `.env.*` files. Below are the variables you need to configure:

```dotenv
# Configure your RealtyFeed API credentials
API_KEY=haZFHvywMh9LfJ14cg9oF9QtEXMmsKdL7jioFxcf
CLIENT_ID=mk45lcvi1cc5u6ln5p88jpt4q
CLIENT_SECRET=utfb28fo59fn7icq4r5r1p8i7n4j61st8apahmopto887ee1idp

# API base URL for RealtyFeed (No need to modify this)
NEXT_PUBLIC_API_BASE_URL=https://api.realtyfeed.com

# Demographic API base URL
NEXT_PUBLIC_DEMOGRAPHIC_API_BASE_URL=http://realtyfeed-apps-579289856.us-east-1.elb.amazonaws.com/demographic

# Google Maps API keys (one with referer restriction , one without any restriction)
NEXT_PUBLIC_GOOGLE_MAP_KEY=AIzaSyAIWdoDuYbsR-J1Zdp7Ktf1m4Gsnf7MuE0
GOOGLE_API_KEY_SERVER=AIzaSyC4NElIBqjtDJijTrhxwZcLaODf9GI5e8g

# Adjust the base URL according to your environment
# This is the base URL for your Next.js app
NEXT_PUBLIC_BASE_URL=https://demos.realtyfeed.com/opal
NEXT_PUBLIC_BASE_PATH=/opal/

# WordPress URL for blogs and configurations
NEXT_PUBLIC_WP_URL=https://deandevsite.realtyna.info/lavender-flower-wp

# Gravity Forms API credentials from WordPress
GRAVITYFORMS_CONSUMER_KEY=ck_2d9dd09a89f0cc7a322e7e571bcc0e6ae7603992
GRAVITYFORMS_CONSUMER_SECRET=cs_72212fc43f04f4a9aa25661d87a29ebb46c7108d

# SMTP credentials in case of using SMTP (choose either SMTP or GravityForms)
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@sandboxcb86322779ac4288b6d27a9fa17907fa.mailgun.org
SMTP_PASS=34d33594a087004595e8cccb124e6796-2b91eb47-da7cc432
SMTP_TO=dean.a@realtyna.com

MAILING_LIST_ID=
MAILING_API_KEY=
MAILING_API_ADDRESS=https://api.mailgun.net/v3/lists

# Adjust the origin URL according to your environment
# This is the origin URL for your Next.js app
# Not needed if your site address is not restricted in Realtyfeed
ORIGIN=https://demos.realtyfeed.com/opal

# Adjust the latitude and longitude for map default location
NEXT_PUBLIC_LAT=34.0549
NEXT_PUBLIC_LNG=-118.2426

# Adjust the script URL for the Roomvo API
ROOMVO_SCRIPT=https://cdn.roomvo.com/static/scripts/b2b/realtyfeed.js

# Adjust the recaptcha site key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcJtUAqAAAAADzTRbCxuWdJw1C-Rs1ilJRdwnEJ
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=6LcJtUAqAAAAAPUGNDVf_JW8tbEnrwU9WIppI2Wa

```

### 2. Run the Development Server (Optional)

If you don't need to modify the application and just want to deploy it as-is, you can skip this step. However, if you do need to make changes or test the app locally, follow these instructions to run the development server:

```bash
npm install (if you runing this for first time)

npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:9144](http://localhost:9144) with your browser to see the result.

## Deploy on Server

#### The procedure for deploying your Next.js app on a server can vary depending on the server environment. Below is a general guideline, but keep in mind that the exact steps may differ:

Transfer Files: Transfer the built application to your server using FTP, SCP, or any other file transfer method.

Install Dependencies: On your server, navigate to the directory where you transferred your application and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Build the Application:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Open in Browser: Once the server is running, open your browser and navigate to your server's IP address or domain name with the appropriate port number.

Keep in mind that these steps are general guidelines. Depending on your server environment, the procedure may differ. Refer to your server's documentation or consult with your system administrator for specific instructions.

## Deploy on Vercel

To deploy this project on Vercel, you’ll need to adjust its structure by moving site settings and authentication tokens from external JSON files outside the src directory (files folder) to a database solution. This modification will ensure secure storage and improve compatibility with Vercel's deployment environment.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
