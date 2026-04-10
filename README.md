# Overpourd ☕

A mobile-friendly web app for coffee lovers to check in at cafes, share drinks, and discover new coffee spots.

##  Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   npm install react-leaflet@4 leaflet
   npm install react-icons
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will automatically open at `http://localhost:5173`

3. **(Optional) Start the fake API in another terminal:**
   ```bash
   npm run api
   ```
   API runs at `http://localhost:3000` with data from `src/data/db.json`

### Extra

**Fetch New Locations:**
```bash
npm run fetch-cafes
```

**GeoJson to Json converter(for manually updating locations)**
```
# Automotically updates db.json file
node scripts/convert-geojson.mjs /path/to/GeoJsonFile
```

##  Features

- **Feed** - View recent check-ins from the community
- **Explore** - Browse and discover cafes
- **Check In** - Log your coffee visit and what you're drinking
- **Profile** - View your check-in stats and favorite drinks
- **Bottom Navigation** - Easy navigation between pages

##  Tech Stack

| Tool | Purpose |
|------|---------|
| **React** | UI framework for building components |
| **Vite** | Lightning-fast dev server and build tool |
| **React Router** | Page navigation and routing |
| **Tailwind CSS** | Utility-first styling |
| **Axios** | API requests to the backend |
| **json-server** | Fake REST API from `db.json` |

##  Project Structure

```
overpourd/
├── public/
│   └── manifest.json          # PWA configuration
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx     # Top header
│   │   │   └── BottomNav.jsx  # Navigation menu
│   │   └── ui/
│   │       ├── CheckinCard.jsx    # Single check-in display
│   │       ├── CafeCard.jsx       # Cafe card component
│   │       ├── CheckinModal.jsx   # Check-in form modal
│   │       └── DrinkBadge.jsx     # Drink badge display
│   ├── pages/
│   │   ├── Feed.jsx           # Recent activity feed
│   │   ├── Explore.jsx        # Cafe discovery
│   │   ├── CafePage.jsx       # Single cafe details
│   │   ├── Checkin.jsx        # Check-in form
│   │   └── Profile.jsx        # User profile
│   ├── hooks/
│   │   ├── useCheckins.js     # Fetch/manage check-ins
│   │   └── useCafes.js        # Fetch/manage cafes
│   ├── data/
│   │   └── db.json            # Fake database
│   ├── App.jsx                # Main app routing
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles + Tailwind
├── .env                       # API configuration
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML template
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
└── postcss.config.js          # PostCSS for Tailwind
```

##  Available Scripts

```bash
# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start fake API server
npm run api
```

##  Styling

The app uses **Tailwind CSS** for styling with a custom coffee-brown color:
- Coffee color: `#8B4513`
- Use class `bg-coffee` or `text-coffee` for the theme color

Example:
```jsx
<button className="bg-coffee text-white rounded-lg py-2">Check In</button>
```

##  API Integration

The app connects to a fake REST API using **Axios** and **json-server**. 

### Available Endpoints (when running `npm run api`):
- `GET /cafes` - Get all cafes
- `GET /cafes/:id` - Get cafe by ID
- `GET /checkins` - Get all check-ins
- `POST /checkins` - Create new check-in
- `GET /users` - Get users

### Example Hook Usage:
```jsx
import { useCheckins } from '../hooks/useCheckins';

function MyComponent() {
  const { checkins, loading, addCheckin } = useCheckins();
  
  if (loading) return <div>Loading...</div>;
  
  return <div>{checkins.length} check-ins found</div>;
}
```

##  Running Both Servers

**Terminal 1** - Start the development server:
```bash
npm run dev
```

**Terminal 2** - Start the API:
```bash
npm run api
```

Now you can visit `http://localhost:5173` and the app will make requests to `http://localhost:3000`.

## Contributing

1. Create a new branch for your feature
2. Make changes and test locally
3. Commit your changes
4. Push to GitHub and create a pull request

##  Environment Variables

Create a `.env` file in the root directory (or copy `.env.example`):
```
VITE_API_URL=http://localhost:3000
```

##  Troubleshooting

**Blank white page?**
- Check browser console (F12) for errors
- Make sure `npm install` completed successfully
- Try hard refresh (Cmd+Shift+R on Mac)

**API not working?**
- Make sure `npm run api` is running in another terminal
- Check that port 3000 is not in use

**Port already in use?**
- Dev server uses port 5173
- API uses port 3000
- If ports are in use, modify the config files

##  Next Steps

- Add real backend API
- Integrate authentication (login/signup)
- Add coffee ratings system
- Improve UI with images and animations
- Deploy to production

---

**Built for NMSU Hackathon** 
