# Sass options:
# http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#options
sass_options = Hash.new

# Enable Sass inspection directly from the browser.
#
# Chrome Canary support (Applies to Webkit Nightlies as well.):
#   http://blog.q42.nl/post/35203391115/debug-sass-and-less-in-webkit-inspector-and-save-css-cha
# Firefox Extension:
#   https://addons.mozilla.org/en-US/firefox/addon/firesass-for-firebug
#
# Set to true to enable. Enabling will disable `line_comments`.
#
sass_options[:debug_info] = false

##
# Compass configuration:
# http://compass-style.org/help/tutorials/configuration-reference

# Development is the default environment. When compiling for production, this
# should be flagged as :production. This can be done through the command line
# with the following.
#
#   $ compass compile -e production --force
#

css_dir         = "frontend/static/css_compiled"
sass_dir        = "frontend/stylesheets"
relative_assets = true
output_style    = (environment == :production ? :compressed : :expanded)
