const fs = require('fs');
const { execSync } = require('child_process');

const envContent = fs.readFileSync('.env.local', 'utf8');
const lines = envContent.split('\n');

for (const line of lines) {
    if (!line.includes('=') || line.startsWith('#') || line.trim() === '') continue;
    
    const index = line.indexOf('=');
    const key = line.substring(0, index).trim();
    let value = line.substring(index + 1).trim();
    
    if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
    }
    
    fs.writeFileSync('.temp_env_val', value);
    try {
        console.log(`Pusheando ${key} a Vercel Production...`);
        // We might need to rm it first if it exists, but 'add' can fail if it exists, so we just try.
        // Actually Vercel CLI prompts to overwrite if it exists. We can pipe "y" or just use `rm` first.
        try { execSync(`npx vercel env rm ${key} production -y`, { stdio: 'ignore' }); } catch(e) {}
        execSync(`npx vercel env add ${key} production < .temp_env_val`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Error pusheando ${key}`);
    }
}
try { fs.unlinkSync('.temp_env_val'); } catch(e){}
