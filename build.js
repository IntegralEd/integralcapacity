const fs = require('fs');
const path = require('path');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy HTML files
const htmlFiles = ['index.html'];
htmlFiles.forEach(file => {
  const srcPath = path.join(__dirname, 'src', file);
  const destPath = path.join(distDir, file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${file}`);
  }
});

// Copy CSS files
const cssDir = path.join(distDir, 'css');
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}
const cssFiles = fs.readdirSync(path.join(__dirname, 'src', 'css'));
cssFiles.forEach(file => {
  const srcPath = path.join(__dirname, 'src', 'css', file);
  const destPath = path.join(cssDir, file);
  fs.copyFileSync(srcPath, destPath);
  console.log(`✓ Copied css/${file}`);
});

// Copy JS files
const jsDir = path.join(distDir, 'js');
if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}
const jsFiles = fs.readdirSync(path.join(__dirname, 'src', 'js'));
jsFiles.forEach(file => {
  const srcPath = path.join(__dirname, 'src', 'js', file);
  const destPath = path.join(jsDir, file);
  fs.copyFileSync(srcPath, destPath);
  console.log(`✓ Copied js/${file}`);
});

// Copy assets if they exist
const assetsDir = path.join(__dirname, 'src', 'assets');
if (fs.existsSync(assetsDir)) {
  const destAssetsDir = path.join(distDir, 'assets');
  if (!fs.existsSync(destAssetsDir)) {
    fs.mkdirSync(destAssetsDir, { recursive: true });
  }

  // Recursively copy assets
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
        const relativePath = path.relative(path.join(__dirname, 'src'), srcPath);
        console.log(`✓ Copied ${relativePath}`);
      }
    });
  }

  copyRecursive(assetsDir, destAssetsDir);
}

console.log('\n✅ Build completed successfully!');
console.log(`📦 Output directory: ${distDir}`);
