# cover_master
UM Cover Master | HackWeek


# Updating the Server 

1. Make sure to update the direct remote GitHub Repo with any of your local changes. Steps can be found here https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github
  a. `git add .`
  b. `git commit -m "some msg here"`
  b. `git pull --set-upstream origin main`
  c. `git push --set-upstream origin main`
2. Next you'll need to update the Heroku app repo. This is done by using `git push heroku main` which will push the code from the local repository to the heroku one. Steps found here: https://mysterious-waters-33133-7c241b07349c.herokuapp.com/
  a. After the above steps you should just be able to run `git push cover-master main` to update the heroku app
