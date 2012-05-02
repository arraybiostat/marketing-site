

# Generating Static Site

There's probably a better way to do this... hmm.

* rebuild assets:

    RAILS_ENV=production rake assets:precompile

* start server in production mode. eg:

    RAILS_ENV=production rails s -p 8555


* generate html files:

    ./script/rebuild 8555


* Then copy public directory to Github Pages site

    rsync -vcr $ARRAY/public/ $ARRAY/../arraybiostat.github.com/

* push


### Using a secondary Github account?

* add to ~/.ssh/config:

    Host array-github
         HostName github.com
         User git
         IdentityFile /Volumes/someSecureVolume/path/to/private/key
         IdentitiesOnly yes


* edit .git/config to look something like this:

    [remote "origin"]
      url = git@array-github:arraybiostat/arraybiostat.github.com.git


