# TEST

TypeWriter 				= require './src/TypeWriter'
{HangulTypeWriter} 	= require './src/HangulTypeWriter'

str = ""
log = () ->
	if arguments.length > 0
		str = arguments[0]
		console.log str
	else
		str

type = new HangulTypeWriter "삼 겹살a b", log
type.start()