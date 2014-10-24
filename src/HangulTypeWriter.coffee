{TypeWriter} = require './TypeWriter'
{Jamo} = require './Jamo'

###
#				Hangul TypeWriter
###

class (exports or window).HangulTypeWriter extends TypeWriter
	constructor: () ->
		super 
		@string = Jamo.teardown @string

		# enum type { .None, .Initial, .Midial, .Final }
		Type =
			None    : 0
			Initial : 1
			Midial  : 2
			Final   : 3

		@flatten = @string.reduce (pre, cur)->
			if Array.isArray cur
				pre.push char: cur[0], type: Type.Initial, origin: cur
				pre.push char: cur[1], type: Type.Midial, origin: cur
				pre.push char: cur[2], type: Type.Final, origin: cur if cur[2] isnt 0
			else
				cur = '<br>' if cur.charCodeAt(0) is 10
				pre.push char: cur, type: Type.None
			pre
		, []

	_get: (backward=false) ->
		str = super() 
		str = str.substring 0, str.length-1 if backward
		str

	_type: () ->
		if @_offset >= @flatten.length
			return
		morpheme = @flatten[@_offset++]
		if morpheme.type > 1
			chars = morpheme.origin.slice 0, morpheme.type
			chars.push 0
			str = @_get(true) + Jamo.assembly([chars])
		else if morpheme.type is 1
			str = @_get()
			str += Jamo.INITIAL[morpheme.char]
		else
			str = @_get()
			str += morpheme.char

		@_set str
		@_runner = setTimeout @_type, @delayFn()