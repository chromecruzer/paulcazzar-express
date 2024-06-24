const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const certsDir = path.join(__dirname, 'certs');

// Ensure the certs directory exists
fs.ensureDirSync(certsDir);

// Command to generate certificates using Docker
const generateCertsCommand = `docker run -v ${certsDir}:/certs -e SSL_SUBJECT=localhost paulczar/omgwtfssl`;

// Function to execute shell commands
function runCommand(command) {
  try {
    console.log(`Running command: ${command}`);
    execSync(command, { stdio: 'inherit' });
    console.log('Certificates generated successfully.');
  } catch (error) {
    console.error('Failed to generate certificates:', error);
    process.exit(1);
  }
}

// Run the command to generate certificates
runCommand(generateCertsCommand);
