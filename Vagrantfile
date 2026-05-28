# Vagrant Configuration for Limbus Company Team Builder
# Provides a fully isolated development environment with Docker

Vagrant.configure("2") do |config|
  # Ubuntu 22.04 LTS base box
  config.vm.box = "ubuntu/jammy64"
  config.vm.box_version = ">= 20240101.0.0"

  # VM Networking
  config.vm.hostname = "limbus-dev"
  config.vm.network "private_network", ip: "192.168.56.10"
  config.vm.network "forwarded_port", guest: 3000, host: 3000, auto_correct: true
  config.vm.network "forwarded_port", guest: 5000, host: 5000, auto_correct: true
  config.vm.network "forwarded_port", guest: 27017, host: 27017, auto_correct: true

  # Provider Configuration
  config.vm.provider "virtualbox" do |vb|
    vb.name = "limbus-company-builder"
    vb.gui = false
    vb.memory = 4096      # 4GB RAM
    vb.cpus = 2           # 2 CPU cores
    
    # Performance optimizations
    vb.customize ["modifyvm", :id, "--nested-paging", "on"]
    vb.customize ["modifyvm", :id, "--paravirtprovider", "kvm"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  end

  # Shared folder (Windows host paths need special syntax)
  config.vm.synced_folder ".", "/home/vagrant/limbus", 
    type: "virtualbox",
    owner: "vagrant",
    group: "vagrant",
    mount_options: ["dmode=775,fmode=664"]

  # Provisioning: Install Docker and dependencies
  config.vm.provision "shell", inline: <<-SHELL
    set -e
    
    echo "=================================================="
    echo "Installing Docker and Docker Compose..."
    echo "=================================================="
    
    # Update system packages
    apt-get update
    apt-get upgrade -y
    
    # Install dependencies
    apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg \
      lsb-release \
      jq \
      git \
      wget
    
    # Add Docker GPG key
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    
    # Add Docker repository
    echo \
      "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Install Docker
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    # Download Docker Compose standalone (for better compatibility)
    curl -L "https://github.com/docker/compose/releases/download/v2.28.0/docker-compose-$(uname -s)-$(uname -m)" \
      -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    
    # Add vagrant user to docker group
    usermod -aG docker vagrant
    
    # Enable and start Docker
    systemctl enable docker
    systemctl start docker
    
    echo "=================================================="
    echo "Docker Installation Complete!"
    echo "Docker version: $(docker --version)"
    echo "Docker Compose version: $(/usr/local/bin/docker-compose --version)"
    echo "=================================================="
  SHELL

  # Provisioning: Build and start containers
  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    set -e
    
    cd /home/vagrant/limbus
    
    echo "=================================================="
    echo "Building Docker containers..."
    echo "=================================================="
    
    # Build containers
    /usr/local/bin/docker-compose build
    
    echo "=================================================="
    echo "Starting containers..."
    echo "=================================================="
    
    # Start containers in background
    /usr/local/bin/docker-compose up -d
    
    # Wait for services to be healthy
    echo "Waiting for services to initialize..."
    max_attempts=30
    attempt=1
    healthy=false
    
    while [ $attempt -le $max_attempts ]; do
      if curl -s http://localhost:5000/api/health | grep -q "healthy"; then
        healthy=true
        break
      fi
      echo "Attempt $attempt/$max_attempts: Waiting for backend..."
      sleep 2
      attempt=$((attempt + 1))
    done
    
    if [ "$healthy" = true ]; then
      echo "=================================================="
      echo "✓ ALL SERVICES ONLINE!"
      echo "=================================================="
      echo ""
      echo "Access the application:"
      echo "  Frontend:   http://localhost:3000"
      echo "  Backend:    http://localhost:5000/api/health"
      echo "  Database:   mongodb://localhost:27017/limbus_teams"
      echo ""
      echo "SSH into VM: vagrant ssh"
      echo "View logs:   vagrant ssh -c 'cd /home/vagrant/limbus && docker-compose logs -f'"
      echo "=================================================="
    else
      echo "Services took longer to initialize. Check logs:"
      echo "  vagrant ssh -c 'docker-compose logs'"
    fi
  SHELL

  # Message displayed after vagrant up completes
  config.vm.post_up_message = <<-MSG
╔════════════════════════════════════════════════════════════════╗
║     Limbus Company Team Builder - Vagrant Development VM       ║
╚════════════════════════════════════════════════════════════════╝

✓ Virtual Machine is running!

QUICK COMMANDS:
  • SSH into VM:              vagrant ssh
  • Stop VM:                  vagrant halt
  • Resume VM:                vagrant up
  • Destroy VM:               vagrant destroy
  • View container logs:      vagrant ssh -c 'docker-compose logs -f'
  • Rebuild containers:       vagrant ssh -c 'cd /home/vagrant/limbus && docker-compose build --no-cache'

ACCESSING SERVICES:
  • Frontend:     http://localhost:3000
  • Backend API:  http://localhost:5000
  • Database:     mongodb://localhost:27017/limbus_teams

VM DETAILS:
  • Hostname:     limbus-dev
  • IP Address:   192.168.56.10
  • Memory:       4GB RAM
  • CPUs:         2 cores
  • Shared Folder: /home/vagrant/limbus (synced to project root)

FIRST TIME SETUP:
  1. Code changes sync automatically to the VM
  2. Containers rebuild on: vagrant reload --provision
  3. To rebuild without provisioning: vagrant ssh -c 'docker-compose build --no-cache'

TROUBLESHOOTING:
  • Services not starting? Check logs: vagrant ssh -c 'docker-compose logs'
  • Port conflicts? Edit Vagrantfile forwarded_port entries
  • Out of disk space? Run: vagrant ssh -c 'docker system prune -a'
  MSG
end
