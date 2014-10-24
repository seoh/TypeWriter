'use strict'

gulp				= require 'gulp'
coffee			= require 'gulp-coffee'
coffeelint	= require 'gulp-coffeelint'
gulp.task 'lint', ->
	gulp.src 'src'
		.pipe coffeelint()
		.pipe coffeelint.reporter()

gulp.task 'coffee', ->
	gulp.src 'src/*.coffee'
		.pipe coffee()
		.pipe gulp.dest 'dist'

# The default task
gulp.task 'default', ->

	# Watches files for changes
	gulp.watch 'src/*.coffee', ->
		gulp.run 'lint'
		gulp.run 'coffee'
