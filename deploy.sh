#!/usr/bin/env sh

# abort on errors
set -e

# build
echo "Building the project..."
npm run build

# navigate into the build output directory
cd dist

# create a new git repository
git init
git add -A
git commit -m 'deploy'

# push to GitHub Pages
echo "Deploying to GitHub Pages..."
git push -f git@github.com:gadm21/gadm21.github.io.git main:gh-pages

cd -

echo "Deployment complete!"
