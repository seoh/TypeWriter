###
#   Utility to teardown and assembly Ja/Mo
#
#   @see [Hangul Syllables(AC00–D7AF)](http://www.unicode.org/charts/PDF/UAC00.pdf)
###
(exports or window).Jamo =
	INITIAL: ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" ]
	MIDIAL : [ "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ" ]
	FINIAL : [ "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" ]

	# @ return {[number, number, number]} Teardowned each character to initial, midial, final
	teardown: (string) ->
		for char in string
			if not @isHangul(char)
				char
			else
				code = char.charCodeAt(0) - 0xAC00
				tail = code % 28
				mid  = (code-tail)/28 % 21
				head = (((code-tail)/28)-mid)/21
				[head, mid, tail]

	# @ return {String} 
	assembly: (array) -> 
		array.map (jamo) ->
			return jamo unless Array.isArray jamo
			String.fromCharCode (jamo[0] * 21 * 28 + jamo[1] * 28 + jamo[2] + 0xAC00)

	isHangul: (char) ->
		code = char.charCodeAt(0) 
		0xAC00 <= code and code <= 0xD7A3