var unread_items,folder,checked={};
var icon_url = chrome.extension.getURL("128.png");

if (window.Notification) {
    setInterval(function() {
    	folder = $('.listnav .selected').attr('id');
        unread_items=$('.list-view-items .unread');
        if(checked[folder]==undefined){
        	checked[folder] = {};
            unread_items.each(function(index){
                var title=$(this).find('.subject').text();
                var from = $(this).find('.name-list').text();
                var content = $(this).find('.thread-snippet').text();
                var ts = $(this).find('.date').text();
                checked[folder][title+from+ts]=true;
            });
        }
        else{
            unread_items.each(function(index){
                var title=$(this).find('.subject').text();
                var from = $(this).find('.name-list').text();
                var content = $(this).find('.thread-snippet').text();
                var ts = $(this).find('.date').text();
                var key = title+from+ts;
                if(!checked[folder][key]){
                	checked[folder][key]=true;
	                new Notification(ts+' - '+from, {
	                	icon: icon_url,
	                    body: title+'\n'+content
	                });
	            }
            });
        }
    }, 15000);
}
