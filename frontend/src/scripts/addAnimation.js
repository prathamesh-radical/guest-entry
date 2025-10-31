const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, '..', 'screens');
const files = fs.readdirSync(screensDir).filter(file => file.endsWith('.jsx') && file !== 'Dashboard.jsx');

files.forEach(file => {
    const filePath = path.join(screensDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add AnimatedScreen import
    if (!content.includes('AnimatedScreen')) {
        content = content.replace(
            /import.*?from.*?'react-native';/,
            `$&\nimport { AnimatedScreen } from '../components/AnimatedScreen';`
        );
    }
    
    // Wrap the main content with AnimatedScreen
    content = content.replace(
        /<ScrollView|<View/,
        `<AnimatedScreen>\n        $&`
    );
    
    content = content.replace(
        /<\/ScrollView>|<\/View>(?=\s*[\r\n]*\s*\);?\s*})/,
        `$&\n      </AnimatedScreen>`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
});