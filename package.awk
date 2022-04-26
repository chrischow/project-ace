{
	if ((start = index ($0, "import")) != 0) {
		out = substr($0, 1, start - 1) # grab the bit before the start of import
		rest = substr($0, start)
		while ((end = index(rest, ";")) == 0) { # is the ending semi-colon there?
			if (getline <= 0) {
				print("unexpected error!", ERRNO) > "/dev/stderr"
				exit
			}
			rest = rest "\n" $0 
		}
		print "/**RAVEN* " out rest "*/"
	} else if ((start = index ($0, "module.exports")) != 0) {
		out = substr($0, 1, start - 1) # grab the bit before the start of import
		rest = substr($0, start)
		while ((end = index(rest, ";")) == 0) { # is the ending semi-colon there?
			if (getline <= 0) {
				print("unexpected error!", ERRNO) > "/dev/stderr"
				exit
			}
			rest = rest "\n" $0 
		}
		print "/**RAVEN* " out rest "*/"
	} else if ((start = index ($0, "export")) != 0) {
		out = substr($0, 1, start - 1) # grab the bit before the start of import
		rest = substr($0, start)
		while ((end = index(rest, "function")) == 0) { 
			if (getline <= 0) {
				print("unexpected error!", ERRNO) > "/dev/stderr"
				exit
			}
			rest = rest "\n" $0 
		}
		print "/**RAVEN* " out substr(rest, 1, end -1) "*/" substr(rest, end)
	} else {
		print $0
	}
}
