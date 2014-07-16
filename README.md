

# Generating Static Site

There's probably a better way to do this... hmm.

TODO: evaluate: stasis.me, middleman, etc


* source $ARRAY/array_env.bash

* rebuild assets:


    RAILS_ENV=production bundle exec rake assets:precompile

* start server in production mode. eg:


    RAILS_ENV=production rails s -p 8555

* generate html files:

    ./script/rebuild.rb 8555


* Then copy public directory to Github Pages site


    rsync -vcr $ARRAY/public/ $ARRAY/../arraybiostat.github.com/


* git push arraybiostat.github.com

* Finally, clean up public/assets for future development mode

    ./script/cleanup.rb



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


