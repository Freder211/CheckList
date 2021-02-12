#!/bin/bash

npm run publish

cd dist

git init

git add .

git commit -m "Deploy Github Pages"

git push -f https://github.com/Freder211/CheckList.git master:publish