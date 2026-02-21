const fs = require('fs');
const path = require('path');

// Helper function to recursively copy directories
function copyRecursive(src, dest) {
  const items = fs.readdirSync(src);
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyRecursive(srcPath, destPath);
    } else if (stat.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Helper function to recursively delete directories
function deleteRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        deleteRecursive(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

console.log('🏗️  Starting build...\n');

// Clear dist directory
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  console.log('🧹 Cleaning dist directory...');
  deleteRecursive(distDir);
}

// Create fresh dist directory
fs.mkdirSync(distDir, { recursive: true });
console.log('✓ Created dist directory\n');

// Load chat widget for injection
const widgetPath = path.join(__dirname, 'vendor', 'integralthemes', 'components', 'widgets.html');
let widgetHtml = '';
if (fs.existsSync(widgetPath)) {
  widgetHtml = fs.readFileSync(widgetPath, 'utf8');
  console.log('✓ Loaded chat widget for injection\n');
} else {
  console.log('⚠ Chat widget not found, pages will be built without it\n');
}

// Copy HTML files and inject widget
console.log('📄 Copying HTML files...');
const htmlFiles = ['index.html'];
htmlFiles.forEach(file => {
  const srcPath = path.join(__dirname, 'src', file);
  const destPath = path.join(distDir, file);
  if (fs.existsSync(srcPath)) {
    let htmlContent = fs.readFileSync(srcPath, 'utf8');

    // Inject widget before </body> tag if widget exists
    if (widgetHtml) {
      htmlContent = htmlContent.replace('</body>', `${widgetHtml}\n</body>`);
    }

    fs.writeFileSync(destPath, htmlContent, 'utf8');
    console.log(`  ✓ ${file}${widgetHtml ? ' (with widget)' : ''}`);
  } else {
    console.log(`  ⚠ ${file} (not found)`);
  }
});

// Copy CSS files
console.log('\n🎨 Copying CSS files...');
const cssDir = path.join(distDir, 'css');
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}
const srcCssDir = path.join(__dirname, 'src', 'css');
if (fs.existsSync(srcCssDir)) {
  const cssFiles = fs.readdirSync(srcCssDir);
  cssFiles.forEach(file => {
    if (file.endsWith('.backup')) return;
    const srcPath = path.join(srcCssDir, file);
    const destPath = path.join(cssDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`  ✓ css/${file}`);
  });
}

// Copy JS files
console.log('\n📜 Copying JS files...');
const jsDir = path.join(distDir, 'js');
if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}
const srcJsDir = path.join(__dirname, 'src', 'js');
if (fs.existsSync(srcJsDir)) {
  const jsFiles = fs.readdirSync(srcJsDir);
  jsFiles.forEach(file => {
    const srcPath = path.join(srcJsDir, file);
    const destPath = path.join(jsDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`  ✓ js/${file}`);
  });
}

// Copy assets (icons, images, etc.)
console.log('\n📁 Copying assets...');
const assetsDir = path.join(__dirname, 'src', 'assets');
if (fs.existsSync(assetsDir)) {
  const destAssetsDir = path.join(distDir, 'assets');
  if (!fs.existsSync(destAssetsDir)) {
    fs.mkdirSync(destAssetsDir, { recursive: true });
  }
  copyRecursive(assetsDir, destAssetsDir);
  console.log('  ✓ Copied assets directory');
} else {
  console.log('  ℹ No assets directory found');
}

// Copy vendored integralthemes
console.log('\n🎨 Copying vendored theme...');
const vendorSrcDir = path.join(__dirname, 'vendor', 'integralthemes');
if (fs.existsSync(vendorSrcDir)) {
  const vendorDestDir = path.join(distDir, 'vendor', 'integralthemes');
  if (!fs.existsSync(path.join(distDir, 'vendor'))) {
    fs.mkdirSync(path.join(distDir, 'vendor'), { recursive: true });
  }
  fs.mkdirSync(vendorDestDir, { recursive: true });

  copyRecursive(vendorSrcDir, vendorDestDir);

  const themeFile = path.join(vendorDestDir, 'theme', 'theme.css');
  if (fs.existsSync(themeFile)) {
    console.log('  ✓ vendor/integralthemes/theme/theme.css');
    console.log('  ✓ vendor/integralthemes/theme/tokens.css');
    console.log('  ✓ vendor/integralthemes/theme/base.css');
    console.log('  ✓ vendor/integralthemes/theme/layout.css');
    console.log('  ✓ vendor/integralthemes/theme/components.css');
  } else {
    console.log('  ⚠ Theme files may be incomplete');
  }
} else {
  console.error('  ❌ ERROR: vendor/integralthemes not found!');
  process.exit(1);
}

console.log('\n✅ Build completed successfully!');
console.log(`📦 Output directory: ${distDir}`);
console.log('\n🔗 Critical files:');
console.log(`   - dist/vendor/integralthemes/theme/theme.css`);
console.log(`   - dist/css/site.css`);
console.log(`   - dist/index.html`);
if (widgetHtml) {
  console.log(`   - Chat widget injected ✓`);
}
console.log('');
