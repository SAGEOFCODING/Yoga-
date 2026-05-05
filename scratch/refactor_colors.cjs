const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace hardcoded #000000 and #FFFFFF depending on context
      // Border / boxShadow #000000 -> var(--color-border)
      content = content.replace(/border:\s*['"][^'"]*#000000['"]/g, match => match.replace('#000000', 'var(--color-border)'));
      content = content.replace(/borderRight:\s*['"][^'"]*#000000['"]/g, match => match.replace('#000000', 'var(--color-border)'));
      content = content.replace(/borderBottom:\s*['"][^'"]*#000000['"]/g, match => match.replace('#000000', 'var(--color-border)'));
      content = content.replace(/boxShadow:\s*['"][^'"]*#000000['"]/g, match => match.replace('#000000', 'var(--color-border)'));
      
      // Text color #000000 -> var(--color-text-primary)
      content = content.replace(/color:\s*['"]#000000['"]/g, "color: 'var(--color-text-primary)'");
      content = content.replace(/color:\s*['"]#111827['"]/g, "color: 'var(--color-text-primary)'");
      content = content.replace(/color:\s*['"]#374151['"]/g, "color: 'var(--color-text-secondary)'");
      content = content.replace(/color:\s*['"]#4B5563['"]/g, "color: 'var(--color-text-tertiary)'");
      content = content.replace(/color:\s*['"]#6B7280['"]/g, "color: 'var(--color-text-tertiary)'");
      content = content.replace(/color:\s*['"]#9CA3AF['"]/g, "color: 'var(--color-text-tertiary)'");
      
      // Text color #FFFFFF -> var(--color-text-primary)
      content = content.replace(/color:\s*['"]#FFFFFF['"]/g, "color: 'var(--color-text-primary)'");
      
      // Backgrounds
      content = content.replace(/background:\s*['"]#000000['"]/g, "background: 'var(--color-accent-primary)'");
      content = content.replace(/background:\s*['"]#FFFFFF['"]/g, "background: 'var(--color-bg-secondary)'");
      content = content.replace(/background:\s*['"]#F9FAFB['"]/g, "background: 'var(--color-bg-elevated)'");
      content = content.replace(/background:\s*['"]#F3F4F6['"]/g, "background: 'var(--color-bg-elevated)'");
      content = content.replace(/background:\s*['"]#111827['"]/g, "background: 'var(--color-bg-secondary)'");
      content = content.replace(/backgroundColor:\s*['"]#FFFFFF['"]/g, "backgroundColor: 'var(--color-bg-secondary)'");

      // Borders
      content = content.replace(/border:\s*['"][^'"]*#E5E7EB['"]/g, match => match.replace('#E5E7EB', 'var(--color-border)'));
      content = content.replace(/borderTop:\s*['"][^'"]*#E5E7EB['"]/g, match => match.replace('#E5E7EB', 'var(--color-border)'));
      
      // Purple / Primary Accent
      content = content.replace(/#7C3AED/g, 'var(--color-accent-primary)');
      
      // Save
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDirectory(srcDir);
console.log('Refactoring complete.');
