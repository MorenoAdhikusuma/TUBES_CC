# LIMBUS COMPANY TEAM BUILDER

A full-stack web application for building and managing team compositions in *Limbus Company*. Deploy Sinners, equip Identities and E.G.Os, and evaluate team synergy production across multiple affinity types.

---

## 🎯 Project Overview

The **Limbus Company Team Builder** is a comprehensive application designed to help players:
- **Deploy Sinners** to team slots
- **Equip Identities** (with different rarity levels)
- **Manage E.G.Os** (Egos) with risk levels and affinity costs
- **Analyze Team Synergy** across 7 affinity types (Wrath, Lust, Sloth, Gluttony, Gloom, Pride, Envy)
- **Save and Load Team Compositions** for later reference

The application features a **dark-themed UI** inspired by Limbus Company's aesthetic, with real-time synergy calculations and health checks.

---

## 🏗️ Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript + Vite | Interactive UI with real-time state management |
| **Backend** | Node.js + Express | RESTful API for team data management |
| **Database** | MongoDB | Persistent storage for Sinners, Identities, E.G.Os, and Teams |
| **Containerization** | Docker + Docker Compose | Orchestration and deployment |

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Docker Network                         │
│                  (limbus-network)                        │
└─────────────────────────────────────────────────────────┘
         │                    │                    │
    ┌────▼────┐          ┌────▼────┐          ┌───▼──────┐
    │Frontend │          │ Backend  │          │ MongoDB  │
    │Container│          │Container │          │Container │
    │ (nginx)  │          │(Express) │          │          │
    │ :3000   │          │ :5000   │          │ :27017   │
    └─────────┘          └─────────┘          └──────────┘
         ▲                    ▲                    ▲
         │                    │                    │
         └────────────────────┴────────────────────┘
         Shared Docker Compose Network
```

---

## 🐳 Containerization Explained

### Docker Compose Services

#### **1. MongoDB Service**
```yaml
mongodb:
  image: mongo:latest
  container_name: limbus-mongodb
  ports: ["27017:27017"]
  volumes: [mongo-data:/data/db]
```
- **Purpose**: NoSQL database for all application data
- **Persistence**: Data stored in `mongo-data` volume (survives container restarts)
- **Network**: Connected to `limbus-network` for inter-container communication
- **Port Mapping**: `27017:27017` (host:container)

#### **2. Backend Service**
```yaml
backend:
  build:
    context: ./backend
    dockerfile: Dockerfile
  container_name: limbus-backend
  ports: ["5000:5000"]
  depends_on: [mongodb]
  healthcheck: /api/health
```
- **Purpose**: Node.js/Express API server
- **Build Context**: Builds from `./backend/Dockerfile`
- **Dependencies**: Waits for MongoDB to be ready
- **Health Check**: Periodically tests `http://localhost:5000/api/health`
- **Environment Variables**:
  - `MONGODB_URI=mongodb://mongodb:27017/limbus_teams` (uses MongoDB container DNS)
  - `PORT=5000`
  - `NODE_ENV=production`

**Key Note**: The backend uses the container hostname `mongodb` instead of `localhost` because services communicate within the Docker network.

#### **3. Frontend Service**
```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
  container_name: limbus-frontend
  ports: ["3000:80"]
  depends_on:
    backend:
      condition: service_healthy
```
- **Purpose**: React/Nginx frontend server
- **Build Process**: 
  - TypeScript compilation (`tsc`)
  - Vite bundling (`vite build`)
  - Multi-stage Docker build (dev stage → production stage with nginx)
- **Dependencies**: Only starts after backend reports healthy status
- **Port Mapping**: `3000:80` (host port 3000 → container nginx port 80)

### Docker Network & Volumes

**Network (`limbus-network`)**
- Type: Bridge network
- Purpose: Allows all containers to communicate by hostname
- Example: Backend connects to `mongodb://mongodb:27017` (not `localhost`)

**Volume (`mongo-data`)**
- Type: Local driver
- Purpose: Persists MongoDB data between container restarts
- Location: Docker-managed storage on host machine

### Container Lifecycle

```
1. docker-compose up
   ├─ MongoDB starts (no dependencies)
   ├─ Backend builds and starts
   │  └─ Waits for MongoDB connectivity
   │  └─ Runs health check
   └─ Frontend builds and starts
      └─ Waits for backend healthy status

2. docker-compose down
   ├─ Frontend container stopped & removed
   ├─ Backend container stopped & removed
   └─ MongoDB container stopped & removed
      (mongo-data volume persists)
```

---

## 🚀 Getting Started

### Choose Your Deployment Method

| Method | Best For | Setup Time | Resources |
|--------|----------|-----------|-----------|
| **Docker Desktop** | Quick local dev, Windows Pro/Enterprise | 5 min | 4-6GB |
| **Docker + Vagrant** | Isolated dev env, all Windows editions | 10 min | 2-4GB |
| **Production** | Deployment to cloud (AWS, Azure, etc.) | N/A | Auto-scaling |

**Recommended for development**: Use **Vagrant** for the best isolation and consistency.  
👉 See **[VAGRANT_SETUP.md](VAGRANT_SETUP.md)** for detailed Vagrant instructions.

### Prerequisites (Docker Desktop - Direct)

- **Windows 10/11** with PowerShell 5.0+
- **Docker Desktop** (installed and running)
  - Download: https://www.docker.com/products/docker-desktop
  - Verify: `docker --version` in PowerShell

### Prerequisites (Vagrant - Recommended)

- **Windows 10/11** with PowerShell 5.0+
- **VirtualBox** (free)
  - Download: https://www.virtualbox.org/wiki/Downloads
- **Vagrant** (free)
  - Download: https://www.vagrantup.com/downloads
  - Verify: `vagrant --version` in PowerShell

### Quick Start (Windows)

#### **Option A: Vagrant (Recommended - Full Isolation)**

```powershell
cd C:\path\to\RAFI\CC
vagrant up
```

That's it! Vagrant handles:
- ✅ VM creation and configuration
- ✅ Docker and Docker Compose installation
- ✅ Container building and startup
- ✅ Service health checks

Access at: **http://localhost:3000**

For detailed Vagrant instructions, see **[VAGRANT_SETUP.md](VAGRANT_SETUP.md)**

#### **Option B: Docker Desktop (Direct)**

#### **Step 1: Setup**
```powershell
cd C:\path\to\RAFI\CC
.\setup.ps1
```

**What `setup.ps1` does:**
1. ✅ Checks Docker installation
2. ✅ Normalizes shell script line endings (CRLF → LF for Unix compatibility)
3. ✅ Attempts local npm installs (for IDE support)
4. ✅ Builds all Docker containers (`docker-compose build`)

**Expected Output:**
```
[1/3] Preparing workspace libraries...
[2/3] Building Orchestration Containers...
[3/3] Complete!
To boot the team builder stack, execute:
  .\start.ps1
```

#### **Step 2: Start Application**
```powershell
.\start.ps1
```

**What `start.ps1` does:**
1. 🐳 Starts all containers in background (`docker-compose up -d`)
2. ⏳ Waits for backend API health check (max 30 seconds)
3. 🌐 Auto-opens browser to `http://localhost:3000`

**Expected Output:**
```
[+] Running 5/5
 ✔ Container limbus-mongodb    Started
 ✔ Container limbus-backend    Healthy
 ✔ Container limbus-frontend   Started

System is online!
Launching web browser at http://localhost:3000...
```

#### **Step 3: Access Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:27017 (MongoDB)

#### **Step 4: Stop Application**
```powershell
docker-compose down
```

Removes all containers but preserves MongoDB data in the volume.

---

## 📂 Project Structure

```
RAFI/CC/
├── README.md                          # This file
├── docker-compose.yml                 # Container orchestration config
├── setup.ps1                          # Windows setup script
├── start.ps1                          # Windows boot script
├── setup.sh                           # Unix setup script
├── start.sh                           # Unix boot script
│
├── backend/
│   ├── Dockerfile                     # Backend container image
│   ├── package.json                   # Node.js dependencies
│   ├── server.js                      # Express API entry point
│   ├── db/
│   │   ├── seeder.js                  # Database seeding logic
│   │   └── seedData.js                # Sample data (Sinners, Identities, Egos)
│   └── models/
│       ├── Sinner.js                  # Mongoose schema: Sinner characters
│       ├── Identity.js                # Mongoose schema: Identities (weapon forms)
│       ├── Ego.js                     # Mongoose schema: E.G.Os (abilities)
│       └── Team.js                    # Mongoose schema: Team compositions
│
└── frontend/
    ├── Dockerfile                     # Frontend container image (multi-stage)
    ├── package.json                   # React dependencies
    ├── tsconfig.json                  # TypeScript configuration
    ├── vite.config.ts                 # Vite bundler config
    ├── nginx.conf                     # Nginx reverse proxy config
    ├── index.html                     # HTML entry point
    └── src/
        ├── main.tsx                   # React entry point
        ├── App.tsx                    # Main application component
        ├── types.ts                   # TypeScript interfaces
        ├── index.css                  # Global styles (Limbus Company themed)
        └── components/
            ├── SelectionModal.tsx      # Modal for selecting Sinners/Identities/Egos
            ├── SynergyDashboard.tsx    # Synergy calculation display
            └── TeamGrid.tsx            # Team slot grid visualization
```

---

## 🔌 API Endpoints

### Health Check
```
GET /api/health
Response: { "status": "healthy", "database": "connected" }
```

### Sinners
```
GET    /api/sinners                # List all Sinners
GET    /api/sinners/:id            # Get specific Sinner
```

### Identities
```
GET    /api/identities             # List all Identities
GET    /api/identities/:id         # Get specific Identity
```

### E.G.Os
```
GET    /api/egos                   # List all E.G.Os
GET    /api/egos/:id               # Get specific E.G.O
```

### Teams
```
GET    /api/teams                  # List all saved teams
POST   /api/teams                  # Create new team
GET    /api/teams/:id              # Get specific team
PUT    /api/teams/:id              # Update team
DELETE /api/teams/:id              # Delete team
```

---

## 🛠️ Development

### Using Vagrant

All changes in your local project sync automatically to the VM:

```powershell
# SSH into the VM
vagrant ssh

# Inside VM - common commands
docker-compose logs -f                      # View all logs
docker-compose restart limbus-backend      # Restart backend after edits
docker system prune -a                     # Clean up images
exit                                        # Exit SSH session
```

**Suspending/Resuming:**
```powershell
vagrant suspend   # Pause VM (saves state)
vagrant up        # Resume
vagrant halt      # Full shutdown
vagrant destroy   # Delete VM
```

See **[VAGRANT_SETUP.md](VAGRANT_SETUP.md)** for complete Vagrant workflow and troubleshooting.

### Local Development (with Docker)

If you want to modify code while containers run:

```powershell
# Keep containers running in background
docker-compose up -d

# Edit files locally - frontend rebuilds automatically in Docker
# Edit backend code - requires container restart
docker-compose restart limbus-backend
```

### View Logs

```powershell
# All containers
docker-compose logs -f

# Specific container
docker-compose logs -f limbus-backend
docker-compose logs -f limbus-mongodb

# Last 50 lines
docker-compose logs --tail=50
```

### Database Seeding

The database is automatically seeded when the backend container starts. To manually reseed:

```powershell
# Inside backend container
docker exec limbus-backend npm run seed

# Or through the UI
# Click the ⟳ button in the header to trigger re-seeding
```

---

## 🐛 Troubleshooting

### Vagrant Issues

**"vagrant command not found"**
- Verify Vagrant is installed: https://www.vagrantup.com/downloads
- Add to PATH if needed (restart PowerShell after)

**"VirtualBox not found"**
- Install VirtualBox: https://www.virtualbox.org/wiki/Downloads

**Provisioning takes too long**
- First run downloads Ubuntu image (~1GB) and builds containers
- Subsequent `vagrant up` is much faster

**VM provisioning failed**
```powershell
vagrant destroy -f
vagrant up
```

**Services not starting in VM**
```powershell
vagrant ssh -c "docker-compose logs"
vagrant ssh -c "docker-compose down && docker-compose up -d"
```

**Port conflicts**
Edit `Vagrantfile` forwarded_port entries or check:
```powershell
Get-NetTCPConnection -LocalPort 3000
```

For more Vagrant help, see **[VAGRANT_SETUP.md](VAGRANT_SETUP.md#troubleshooting)**

### Docker Desktop Issues
**Error**: Setup script fails with "Docker is not detected in your PATH"

**Solution**: 
- Ensure Docker Desktop is installed and running
- Restart PowerShell or your system
- Check installation: `docker --version`

### "Cannot connect to database"
**Error**: Backend shows "database: disconnected"

**Solution**:
```powershell
# Check container status
docker-compose ps

# Restart MongoDB
docker-compose restart limbus-mongodb

# View MongoDB logs
docker-compose logs limbus-mongodb
```

### "Backend container keeps restarting"
**Error**: Backend health check fails repeatedly

**Solution**:
```powershell
# Check backend logs
docker-compose logs limbus-backend

# Restart backend with fresh build
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### "Port 3000 or 5000 already in use"
**Error**: `Address already in use`

**Solution**:
```powershell
# Find process using port
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Stop-Process -Force

# Or change port in docker-compose.yml
# Change "3000:80" to "3001:80"
```

### "Frontend shows blank/doesn't load"
**Error**: Page loads but shows nothing

**Solution**:
1. Check browser console for errors (F12)
2. Verify backend is responding: `curl http://localhost:5000/api/health`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart frontend: `docker-compose restart limbus-frontend`

---

## 📊 Data Models

### Sinner
```typescript
{
  _id: ObjectId,
  id: string,              // Unique identifier (e.g., "dont")
  name: string,            // Display name (e.g., "Don Quixote")
  code: number             // Sinner code (1-13)
}
```

### Identity
```typescript
{
  _id: ObjectId,
  sinnerId: string,        // Reference to Sinner
  name: string,            // Identity name
  rarity: 1 | 2 | 3,       // Rarity level
  speedRange: string,      // Speed range (e.g., "24-30")
  hp: number,
  defense: number,
  resistances: {
    slash: 'Fatal' | 'Normal' | 'Ineffective',
    pierce: 'Fatal' | 'Normal' | 'Ineffective',
    blunt: 'Fatal' | 'Normal' | 'Ineffective'
  },
  skills: {
    s1, s2, s3, defense    // Skill objects
  }
}
```

### E.G.O
```typescript
{
  _id: ObjectId,
  sinnerId: string,        // Reference to Sinner
  name: string,            // E.G.O name
  riskLevel: string,       // Risk level (ZAYIN, TETH, HE, VAV, etc.)
  type: string,            // E.G.O type (Attack, Support, etc.)
  cost: {
    Wrath, Lust, Sloth, Gluttony, Gloom, Pride, Envy  // Resource costs
  }
}
```

### Team
```typescript
{
  _id: ObjectId,
  name: string,            // Team name (e.g., "Wrath Focus")
  description: string,     // Optional description
  slots: [
    {
      sinnerId: string,    // Deployed Sinner ID
      identityId: string,  // Equipped Identity ID
      egoIds: [string]     // Equipped E.G.O IDs
    }
  ]
}
```

---

## 🎨 UI/UX Features

- **Glass-morphism Design**: Frosted glass panels with semi-transparent backgrounds
- **Real-time Synergy Calculation**: Instant affinity production analysis
- **Responsive Grid**: Team slots with drag-and-drop support (planned)
- **Toast Notifications**: Feedback for actions (deploy, equip, save)
- **Dark Theme**: Limbus Company aesthetic with color-coded affinity types
- **Health Status**: Backend connectivity indicator in header

---

## 📝 Notes for Developers

### Adding New Endpoints
1. Create route handler in `backend/server.js`
2. Add corresponding API call in React component
3. Restart backend: `docker-compose restart limbus-backend`

### Modifying Database Schema
1. Edit model in `backend/models/*.js`
2. Update seed data in `backend/db/seedData.js`
3. Rebuild and restart: `docker-compose down && docker-compose build --no-cache && docker-compose up`

### Frontend Styling
- Global styles: `frontend/src/index.css`
- CSS Variables: `:root` defines `--sin-*` colors and `--font-*` families
- Component-scoped styles: Inline styles or CSS modules

---

## 📄 License

This project is for educational and fan purposes. Limbus Company is developed by Project Moon.

---

## 🔗 Useful Links

- **Limbus Company Official**: https://limbuscompany.com
- **Docker Documentation**: https://docs.docker.com
- **React Documentation**: https://react.dev
- **Express.js Guide**: https://expressjs.com
- **MongoDB Manual**: https://docs.mongodb.com

---

## 🚀 Deployment Approaches

### Local Development Comparison

| Aspect | Docker Desktop | Vagrant + Docker | Production |
|--------|----------------|-----------------|------------|
| **Setup Time** | 5 minutes | 10 minutes (first time) | N/A |
| **Platform Support** | Windows Pro/Enterprise only | All Windows versions | Cloud (AWS, Azure, etc.) |
| **File Sync** | Native (fastest) | VirtualBox (slower) | N/A |
| **Isolation** | Containers | Full VMs | Full infrastructure |
| **Debugging** | Limited | Full IDE support | Monitoring tools |
| **Resource Use** | 4-6GB RAM | 2-4GB RAM | Auto-scaling |
| **Team Consistency** | May vary | Always identical | Infrastructure as Code |

### Choose Your Path

**→ Quick local testing:**
```powershell
docker-compose up -d
```

**→ Full development environment (recommended):**
```powershell
vagrant up
```

**→ Production deployment:**
Deploy Docker images to Kubernetes, AWS ECS, or Docker Swarm

---

## ❓ FAQ

**Q: Should I use Docker Desktop or Vagrant?**
A: For development, **Vagrant is recommended** because:
- Works on all Windows editions (not just Pro/Enterprise)
- Full VM isolation prevents system conflicts
- Better IDE support for debugging
- Easy to reset with `vagrant destroy && vagrant up`
- Team members get identical environments

**Q: Can I use both Docker Desktop and Vagrant?**
A: Not at the same time - they'd use the same ports. Choose one approach.

**Q: How do I switch from Docker Desktop to Vagrant?**
```powershell
# Stop Docker Desktop
docker-compose down

# Create Vagrant VM
vagrant up
```

**Q: Why is Vagrant slower than Docker Desktop?**
A: Vagrant runs a full VM, not just containers. But isolation benefits outweigh the small performance difference for development.

**Q: Can I use Vagrant with Docker on macOS/Linux?**
A: Yes! Edit the Vagrantfile to use `type: "nfs"` for better performance.

**Q: How do I access the VM's file system?**
A: Use `vagrant ssh` to connect, or files auto-sync to `/home/vagrant/limbus`

**Q: What if I need to install additional tools in the VM?**
A: SSH into the VM:
```powershell
vagrant ssh
sudo apt-get install package-name
```

**Q: Can I run this on macOS/Linux?**
A: Yes! Use `./setup.sh` and `./start.sh` instead of the PowerShell scripts. For Vagrant on macOS, use:
```bash
vagrant up --provision
```

**Q: Do I need Node.js installed locally?**
A: No. Docker containers include Node.js. Local installation is optional for IDE support.

**Q: How do I backup the database?**
A: The MongoDB data is stored in the `mongo-data` Docker volume. Export with:
```powershell
docker run --rm -v cc_mongo-data:/data -v ${PWD}:/backup mongo mongodump --out /backup/db_backup
```

**Q: Can I connect to MongoDB from another tool?**
A: Yes, use connection string: `mongodb://localhost:27017/limbus_teams` (or via VM: `mongodb://192.168.56.10:27017/limbus_teams`)

**Q: What if I want to change the API port?**
A: In docker-compose.yml, change `"5000:5000"` to `"YOUR_PORT:5000"`, then rebuild:
```powershell
docker-compose build --no-cache && docker-compose up
```
Or in Vagrantfile, update the `forwarded_port` entries, then `vagrant reload`

---

**Last Updated**: May 28, 2026  
**Version**: 1.0.0
