# Vagrant Development Environment Guide

This guide covers using **Vagrant** to run the Limbus Company Team Builder in a fully isolated virtual machine, separate from your host system.

## Why Vagrant?

| Aspect | Vagrant | Docker (Windows) | Docker (VM) |
|--------|---------|-----------------|------------|
| **Isolation** | Full VM | Container | Full VM |
| **Performance** | Good | Slower on Windows | Excellent |
| **Setup** | One command | Docker Desktop | One command |
| **IDE Support** | Full debugging | Limited | Full debugging |
| **Resource Use** | ~2-4GB | ~4-6GB | ~2-4GB |
| **Collaboration** | Consistent environments | Varies by OS | Consistent environments |

## Prerequisites

### Windows

1. **VirtualBox** (free)
   - Download: https://www.virtualbox.org/wiki/Downloads
   - Install with default settings

2. **Vagrant** (free)
   - Download: https://www.vagrantup.com/downloads
   - Add to PATH during installation
   - Verify: Open PowerShell and run `vagrant --version`

3. **Git** (optional, but recommended)
   - Download: https://git-scm.com/download/win

## Quick Start (Vagrant)

### Step 1: Initialize VM

```powershell
cd C:\path\to\RAFI\CC

# Download and provision the VM (first time only, takes 5-10 minutes)
vagrant up

# Wait for the provisioning to complete...
# You'll see Docker being installed and containers starting
```

**What happens automatically:**
- ✅ Ubuntu 22.04 VM created
- ✅ Docker & Docker Compose installed
- ✅ Project files synced to `/home/vagrant/limbus`
- ✅ Containers built and started
- ✅ Services health-checked

### Step 2: Access Application

Once provisioning completes, services are available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000/api/health
- **Database**: mongodb://localhost:27017/limbus_teams

### Step 3: Develop

All code changes in your local project folder automatically sync to the VM:

```powershell
# Edit files locally in VS Code
# Changes sync automatically
# Containers auto-reload (frontend) or manual restart (backend)

# SSH into VM to manage containers
vagrant ssh

# Inside VM:
$ cd /home/vagrant/limbus
$ docker-compose logs -f           # View all logs
$ docker-compose restart limbus-backend  # Restart backend
$ docker system prune -a           # Clean up unused images
```

### Step 4: Stop/Resume

```powershell
# Suspend VM (saves state, fast resume)
vagrant suspend

# Resume from suspension
vagrant up

# Halt VM (fully stop, more resource efficient)
vagrant halt

# Resume from halt
vagrant up

# Destroy VM completely (deletes everything)
vagrant destroy
vagrant up  # Recreates from scratch
```

---

## Common Vagrant Commands

```powershell
# View VM status
vagrant status

# SSH into VM
vagrant ssh

# Run command in VM without SSH
vagrant ssh -c "docker-compose logs"

# Reload VM and re-run provisioning
vagrant reload --provision

# Reload VM without provisioning
vagrant reload

# View VM configuration
vagrant global-status

# Destroy VM and free resources
vagrant destroy -f

# Recreate VM from scratch
vagrant destroy -f
vagrant up
```

---

## Development Workflow

### Scenario: Editing Backend Code

```powershell
# 1. Edit backend file locally
notepad backend\server.js

# 2. File automatically syncs to VM
# (/home/vagrant/limbus/backend/server.js)

# 3. SSH and restart container
vagrant ssh -c "cd /home/vagrant/limbus && docker-compose restart limbus-backend"

# 4. Check logs
vagrant ssh -c "cd /home/vagrant/limbus && docker-compose logs limbus-backend"

# 5. Test changes at http://localhost:5000/api/health
```

### Scenario: Editing Frontend Code

```powershell
# 1. Edit React component locally
notepad frontend\src\App.tsx

# 2. File syncs to VM
# Vite dev server in Docker auto-recompiles

# 3. Refresh browser at http://localhost:3000
# Changes appear instantly
```

### Scenario: Modifying Package Dependencies

```powershell
# 1. Edit frontend/package.json or backend/package.json

# 2. Rebuild containers with new dependencies
vagrant ssh -c "cd /home/vagrant/limbus && docker-compose build --no-cache"

# 3. Restart services
vagrant ssh -c "cd /home/vagrant/limbus && docker-compose down && docker-compose up -d"
```

---

## Troubleshooting

### "vagrant command not found"
```powershell
# Add Vagrant to PATH
# 1. Control Panel → System → Advanced system settings
# 2. Environment Variables
# 3. Add: C:\Program Files\Vagrant\bin
# 4. Restart PowerShell
```

### "VirtualBox not found"
```powershell
# Ensure VirtualBox is installed
# Download from: https://www.virtualbox.org/wiki/Downloads
# Install and restart your system
```

### "VM provisioning failed"
```powershell
# Destroy and retry
vagrant destroy -f
vagrant up

# If still failing, check logs:
vagrant ssh -c "docker-compose logs"
```

### "Shared folder not syncing"
```powershell
# Reinstall guest additions
vagrant plugin install vagrant-vbguest
vagrant reload

# Or use NFS (faster but requires WSL2)
# Edit Vagrantfile:
# type: "nfs"
# requires: vagrant plugin install vagrant-nfs_guest
```

### "Out of disk space in VM"
```powershell
vagrant ssh -c "docker system prune -a"

# If still insufficient:
vagrant destroy -f
vagrant up
```

### "Port 3000/5000 already in use"
Edit `Vagrantfile`:
```ruby
config.vm.network "forwarded_port", guest: 3000, host: 3001  # Use 3001
config.vm.network "forwarded_port", guest: 5000, host: 5001  # Use 5001
```

Then: `vagrant reload`

---

## VM Configuration

### Change VM Memory/CPU

Edit `Vagrantfile`:
```ruby
vb.memory = 8192      # 8GB instead of 4GB
vb.cpus = 4           # 4 cores instead of 2
```

Then: `vagrant reload`

### Change VM IP Address

Edit `Vagrantfile`:
```ruby
config.vm.network "private_network", ip: "192.168.56.20"
```

Then: `vagrant reload`

### Add Additional Port Forward

Edit `Vagrantfile`:
```ruby
config.vm.network "forwarded_port", guest: 6000, host: 6000
```

Then: `vagrant reload`

---

## Advanced: Using Vagrant SSH Keys

```powershell
# Generate SSH key (if needed)
ssh-keygen -t rsa -b 4096

# SSH into VM with key
vagrant ssh

# Get private key path
vagrant ssh-config

# Manual SSH
ssh -i .vagrant\machines\default\virtualbox\private_key vagrant@192.168.56.10
```

---

## Comparing Approaches

### Docker Desktop (Direct, No Vagrant)
```powershell
# Pros
+ Simplest setup for Windows 10/11 Pro/Enterprise
+ Integrated with Windows
+ Fastest (native containers)

# Cons
- Requires Hyper-V or WSL2
- Can be memory-intensive
- Docker for Windows has performance issues
```

### Vagrant + Docker
```powershell
# Pros
+ Works on all Windows editions
+ Full VM isolation
+ Better IDE support for debugging
+ Consistent with team environment
+ Easy to provision new machines

# Cons
- Slightly more setup
- VM overhead (~500MB-1GB memory)
- File sync can be slower (use NFS for speed)
```

### Docker + Production Deployment
```powershell
# Workflow:
1. Dev: Use Vagrant locally
2. Test: Docker on staging server
3. Prod: Docker on cloud (AWS, Azure, etc.)
```

---

## Next Steps

- **Debugging**: Set breakpoints in VS Code by attaching to container
- **Database**: Connect MongoDB GUI tools to `mongodb://localhost:27017`
- **CI/CD**: Use Docker images from container registry
- **Deployment**: Push images to Docker Hub or private registry

---

**Need help?** Check the main [README.md](../README.md) for general project documentation.
