if [[ `git status --porcelain` ]]; then
  echo "Repository should be clean before a release!"
  exit
fi
if [[ `git rev-parse --abbrev-ref HEAD` != "master" ]]; then
  echo "You need to be on master to release!"
  exit
fi

npm run release

# Bring release up to date
git checkout release
git merge master

rm -rf docs/
mkdir docs
cp -r dist/* docs/

# create new version
git add .
git commit -m "New release"
git push
git checkout master