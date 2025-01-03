# Minecraft Server Status

A beautiful React application for tracking and managing Minecraft server statuses. Built with React, Supabase, and Tailwind CSS.

![image](https://github.com/user-attachments/assets/91db381b-c0a5-467e-9415-be9d01b1b47e)

![image](https://github.com/user-attachments/assets/9eda0f66-cdef-4882-b781-fd20d1c5f694)

![image](https://github.com/user-attachments/assets/ccf53bcf-c191-4bd5-89e2-aa58adf905b0)

## Features

- 🎮 Real-time Minecraft server status monitoring
- 👥 User authentication and authorization
- ⬆️ Upvote/downvote system for servers
- 🎨 Multiple theme options
- 📱 Responsive design
- 👑 Admin panel for server management
- 🏷️ Category-based filtering

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/minecraft-server-status.git
   cd minecraft-server-status
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Database Setup

1. Create a new Supabase project
2. Run the migration files in the `supabase/migrations` directory
3. Set up email authentication in your Supabase dashboard

## Configuration

### Themes

The application comes with several built-in themes:
- Dark (default)
- Light
- Sunset
- Forest
- Ocean

To customize themes, modify the `src/lib/themes.ts` file:

```typescript
export const themes = [
  {
    id: 'custom-theme',
    name: 'Custom Theme',
    bgGradient: 'from-[color1] via-[color2] to-[color3]',
    cardBg: 'bg-white/10',
    textPrimary: 'text-[color]',
    textSecondary: 'text-[color]',
    accent: 'color-name'
  }
];
```

### Adding Categories

Add new categories through the Supabase dashboard or migrations:

```sql
INSERT INTO categories (name, slug, description)
VALUES ('Your Category', 'your-category', 'Description');
```

## Admin Access

The default admin account:
- Email: admin@admin.com
- Password: admin@admin.cum

To make a user an admin:
1. Access your Supabase dashboard
2. Go to Authentication > Users
3. Find the user
4. Set their metadata to: `{"is_admin": true}`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.


## Acknowledgments

- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)


### For Support; https://discord.gg/CR7s2aEf9T

## Do Not use This without giving me credits 
