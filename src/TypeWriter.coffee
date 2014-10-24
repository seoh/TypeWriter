class (exports or window).TypeWriter
	constructor: (@string, @target, @delayFn) ->
		@delayFn ?= () -> Math.random() * (500 - 250) + 250

	_get: ->
		if window?.Framer
			str = @target.html
		else if typeof HTMLElement isnt 'undefined' and @target instanceof HTMLElement
			str = @target.innerHTML
		else if typeof @target is "function"
			str = @target()
		else # define property or something i don't care
			str = @target

	_set: (string) ->
		if window?.Framer
			@target.html = string
		else if typeof HTMLElement isnt 'undefined' and @target instanceof HTMLElement
			@target.innerHTML = string
		else if typeof @target is "function"
			@target string
		else # define property or something i don't care
			@target = string

	_type: () ->
		if @_offset >= @string.length
			return
		morpheme = @string[@_offset++]

		@_set @_get() + morpheme
		@_runner = setTimeout @_type, @delayFn()

	start: () ->
		@_offset = 0
		@_type = @_type.bind @
		@resume()

	stop: () ->
		clearTimeout @_runner

	resume: () ->
		@_runner = setTimeout @_type, @delayFn()

exports.TypeWriter::pause = exports.TypeWriter::stop