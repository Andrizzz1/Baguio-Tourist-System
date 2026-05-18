# Ask Baguio

Ask Baguio is a web-based tourism platform designed to help visitors explore Baguio City more easily and intelligently. The platform allows users to discover famous tourist spots, learn the history of each place, interact with a smart AI chatbot, and connect with other users through a community posting system.

## Features

- Modern landing page
- Featured tourist spots section
- About the Platform section
- How It Works section
- About Us page
- Contact Us section
- AI chatbot integration for tourist guidance
- Tourist spot information and place history
- Responsive design for desktop and mobile
- User registration and login
- PostgreSQL database integration
- Community page for user posts
- Image and location attachment for community posts
- Dashboard section showing the logged-in user’s own posts
- Total community members counter
- Top contributors section based on user post count
- Trending hashtags based on recent community posts
- Google social login using Firebase Authentication

## Purpose

This project was created to provide tourists with a smarter and more interactive way to explore Baguio City. Instead of only showing places to visit, the platform also gives historical background, helpful information, AI-assisted guidance, and a community space where users can share their own Baguio experiences.

## Project Layout

### Landing Page

- Hero Section
- Featured Tourist Spots
- About the Platform
- How It Works
- Call to Action
- Footer
- AI chatbot for Baguio-related tourism questions

### Dashboard

- Personalized greeting
- Weather display
- User quick actions
- Featured dashboard spots
- Community share section
- User’s own community posts

### Community Page

- Community post composer
- Text post support
- Image attachment support
- Location support
- Feed showing all community posts
- Total members count
- Top contributors
- Trending hashtags

### About Us Page

- Team introduction
- Developer profile cards
- Contact Us section

## Tech Stack

- React.js
- JavaScript
- Tailwind CSS
- Node.js
- Express.js
- PostgreSQL
- Vite
- Firebase Authentication
- Vercel Serverless API Routes

## Database Features

The project uses PostgreSQL for storing user and community data.

Main database tables include:

- `users`
- `community_posts`

The `community_posts` table stores posts made by users and connects each post to a specific user through `user_id`.

Example:

```sql
CREATE TABLE community_posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(users_id) ON DELETE CASCADE,
    content VARCHAR(500),
    location TEXT DEFAULT 'Baguio City',
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## Installation

Clone the repository and install the dependencies:

```bash
git clone <your-repository-link>
cd <your-project-folder>
npm install
