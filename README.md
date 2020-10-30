# README

## Getting the app running

### Start rails server

TODO: lots of steps, probably

`bundle exec rails s`

### Seed the database

`bundle exec rake db:seed`

See db/seeds.rb for login details

### Preview the emails
http://localhost:3000/rails/mailers/submission_mailer/new_submission

## Updating the app in production

The app is currently running on Heroku.  To push the latest version up, run

`git push heroku main`

## Creating a user

To avoid spam signups and complexity, management is done manually via the Rails console.

password = SecureRandom.alphanumeric
User.create!(name: "Test", email: 'test@example.com', password: password, password_confirmation: password)

To get to the rails console on the Heroku production environment: 

`heroku run rails console` 