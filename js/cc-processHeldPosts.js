var checkSavedApplications = function() {
	isOnline({
		yes: function () {
			var storage = $.localStorage;
			var posts = storage.get("posts") || [];
			var errorPosts = [];
			var processed = 0;
			while (posts.length > 0) {
				var post = posts.pop();
				$.ajax({
					type: "POST",
					data: post.data,
					url: post.url,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						errorPosts.push(post);
						storage.set("posts", errorPosts);
					}
				});
				processed++;
				storage.set("posts", posts);
			}
			if (processed > 0) {
				$.notify({ message: processed.toString() + ' applications or questions sent.'}, {type: 'success'});
			}
		},
		no: function () {
			var storage = $.localStorage;
			var posts = storage.get("posts") || [];
			if (posts.length > 0) {
				$.notify({ message: posts.length.toString() + ' applications or questions waiting for connection.'}, {type: 'warning'});
			}
		}
	});
}

$(document).ready(function () {
	checkSavedApplications();
});