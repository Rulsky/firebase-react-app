# WIP tool to make DX of react apps easier for firebase cloud functions users.

At the moment only transpiles es6 code for cloud functions - no dev server.

# options
 -c, --clean - completly remove your `functions` dir and generate everything anew icluding `package-lock.json` and `node_modules` inside of it.
 --yarn - use yarn instead of npm to install deps

# Known problems
- due to the nature of chokidar changing case of letters (between lower and upper) of filenames won't be reflected in filename changing of transpiled files until dev restart. Does not affect the build process. Cured by either renaming file with changing a number of symbols or simply restarting.