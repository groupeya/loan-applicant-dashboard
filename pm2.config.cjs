module.exports = {
  apps: [{
    name:"dashboard-applicants",
    script: "npm",
    args: "run dev",
    env: {
      NODE_ENV: "production",
    },
    instances: "max",
    exec_mode: "cluster",
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
  }]
}
