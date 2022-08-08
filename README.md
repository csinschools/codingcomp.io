# README

## Getting the app running

### Start rails server

TODO: lots of steps, probably.  
Gotcha: current node-sass doesn't seem to work with node 16.  I've been using node 14.

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

```ruby
password = SecureRandom.alphanumeric
User.create!(name: "Test", email: 'test@example.com', password: password, password_confirmation: password)
```

To get to the rails console on the Heroku production environment: 

`heroku run rails console` 
