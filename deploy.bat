
@REM npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git remote add origin https://github.com/maldestor95/maldestor95.github.io.git
git push -f origin master:gh-pages

cd ..