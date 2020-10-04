# README

## Updating the app

The app is currently running on Heroku.  To push the latest version up, run

`git push heroku main`

## Creating a user

To avoid spam signups and complexity, management is done manually via the Rails console.

password = SecureRandom.alphanumeric
User.create!(email: 'test@example.com', password: password, password_confirmation: password)

To get to the rails console on the Heroku production environment: 

`heroku run rails console` 