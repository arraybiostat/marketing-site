# Array Biostatistics Marketing Website

This repository contains the source code for the [arraybiostat.com](http://arraybiostat.com) website. It uses 
the [Gulp](http://gulpjs.com/) build system to compile [Jade](http://jade-lang.com/) files to html,
[SCSS](http://sass-lang.com/) files to css, and to organize other images and assets into a format suitable for the static site.
The generated files can then be pushed to the [arraybiostat.github.com](https://github.com/arraybiostat/arraybiostat.github.com) git 
repository, which [Github Pages](https://pages.github.com/) serves as arraybiostat.com.
                         

## Installation

Install [nodejs](https://nodejs.org/) and then:

    cd $arraybio/marketing-site
    npm install
  

NOTE: we assume that the `$arraybio` shell variable has been set to point to the parent of this marketing-site project directory. Eg, in .bashrc:

    export arraybio="/some/path/to/arraybiostat/repos"



## Run in Development Mode

To view the marketing site in a browser before publishing, run: 

    bin/dev-server


Then visit `localhost:8080` in your web browser.


 
## Build And Publish Production Site

The build script compiles the project source:

    bin/production-build
    

It will write the site's files to `$arraybio/marketing-site/generated/production`


If you want to try the compiled/compressed site locally before publishing, cd to the above directory and `python -m SimpleHTTPServer 8080`


To publish, move/copy/sync the newly generated files to `$arraybio/arraybiostat.github.io/` and use git to commit and push the changes. Eg: 

    rsync --verbose --recursive --checksum --delete --exclude '.*' $arraybio/marketing-site/generated/production/ $arraybio/arraybiostat.github.io/f 
    cd $arraybio/arraybiostat.github.com
    git add *
    git commit -am 'describe my changes'
    git push origin master
   

Github Pages may take minutes to update.


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
