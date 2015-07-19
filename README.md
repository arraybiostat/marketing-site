# Array Biostatistics Marketing Website

The [arraybiostat.com](http://arraybiostat.com) website is currently a static site hosted by [Github Pages](https://pages.github.com/). 
This [marketing-site](https://github.com/arraybiostat/marketing-site) project contains its source, using the Gulp](http://gulpjs.com/) 
build system to generate the files for (arraybiostat.github.com)[https://github.com/arraybiostat/arraybiostat.github.com],
permitting the use of [Jade](http://jade-lang.com/) templates for html and [SCSS](http://sass-lang.com/) for css. 
                       

## Installation

Note: we assume that the `$array` shell variable has been set to point to this marketing-site project directory. Eg, in .bashrc:

    export array="/some/path"


First install [nodejs](https://nodejs.org/) and then:

    cd $array
    npm install
  


## Run in Development Mode

To view the marketing site in a browser before publishing, run: 

    bin/dev-server


Then visit `localhost:8080` in your web browser.


 
## Build And Publish Production Site

The build script compiles the project source to the `$array/generated/production` directory. We then copy the result
to  

    bin/production-build
    

This will write the files to `$array/generated/production`


If you want to try the compiled/compressed site locally before publishing: `cd $array/generated/production; python -m SimpleHTTPServer 8080`


To publish, update arraybiostat.github.com with the newly generated files, and use git to commit and push the changes. Eg: 

    rsync --verbose --recursive --checksum --delete --exclude '.*' $array/generated/production/ $array/../arraybiostat.github.com/ 
    cd $array/../arraybiostat.github.com
    git add *
    git commit -am 'describe my changes'
    git push origin master
   

Github Pages takes minutes to update.


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


## TODO

* favicon
* Do not require each individual page to use jade commands for extending the template and defining a content block.
* sitemap
* Google Analytics
