/*!
 * QR Code Generator - v0.1
 *
 * Copyright (c) 2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Adds a QR code to the 
 *
 */

var qrCodeGenerator = {
	
	lastGenerated: "",
	liAdded: false,
	
	/**
	* break up a pattern into its parts, pattern type and pattern name
	* @param  {String}       the shorthand partials syntax for a given pattern
	* @param  {Object}       the paths to be compared
	*
	* @return {Array}        the pattern type and pattern name
	*/
	getQRCode: function () {
		
		var url = this.createURL();
		
		$.ajax({
			type: 'GET',
			url: "http://miniqr.com/api/create.php?api=http&content="+url+"&size=150&rtype=json",
			async: false,
			jsonpCallback: 'plCallback',
			contentType: "application/json",
			dataType: 'jsonp',
			success: function(json) {
				
				var img               = document.createElement("img");
				img.src               = json.imageurl;
				img.alt               = "QR code for Pattern Lab";
				img.width             = "150";
				img.height            = "150";
				
				var br                = document.createElement("br");
				var a                 = document.createElement("a");
				a.href                = qrCodeGenerator.createURL();
				a.innerHTML           = "[link]"
				a.style.textTransform = "lowercase";
				
				var li                = document.createElement("li");
				li.style.textAlign    = "center";
				li.appendChild(img);
				li.appendChild(br);
				li.appendChild(a);
				
				var ul = document.querySelector(".sg-tools ul");
				if (qrCodeGenerator.liAdded) {
					ul.removeChild(ul.lastChild);
				}
				ul.appendChild(li);
				qrCodeGenerator.liAdded = true;
				
			},
			error: function(e) {
				console.log(e.message);
			}
		});
		
		
	},
	
	createURL: function() {
		var path = window.location.pathname;
		var search = window.location.search;
		var url = (xipHostname != "") ? xipHostname.replace("*", ipAddress)+path+search : window.location.toString();
		return url;
	}
	
};
