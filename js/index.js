require(["Panel"],function(){
	console.log(window.Panel)
	$("#alert").click(function(){
		Panel.alert();
	});

	$("#loading").click(function(){
		var loading = Panel.loading();
		setTimeout(function(){
			loading.remove();
		},20000)
	});
})