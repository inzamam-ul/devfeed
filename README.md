## DevFeed: A Community Platform for Developers

DevFeed is a platform designed to foster connections and knowledge sharing among developers. It empowers users to:

* **Connect:** Join communities of interest and discover fellow developers.
* **Share:** Post news, articles, tutorials, or any tech-related content.
* **Engage:** Comment on others' posts and participate in discussions.
* **Vote:** Upvote valuable content and curate the community feed.

### Tech Stack

* **Frontend:** Next.js, ChakraUI
* **Authentication:** Firebase (Sign-in/Login)
* **Image Optimization:** Next.js Image component
* **Database:** Firestore (User data, Posts, Comments)
* **State Management:** Recoil

### Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/inzamam-ul/devfeed
```

2. **Install dependencies:**

```bash
cd devfeed
npm install
```

3. **Set up Firebase:**

* Create a Firebase project and obtain your configuration details.
* Create a `.env.local` file at the root of the project and set the following environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

4. **Start the development server:**

```bash
npm run dev
```

This will start the application in development mode at http://localhost:3000.

### Contributing

We welcome contributions to devfeed! Please see the CONTRIBUTING.md file for guidelines on how to contribute.


