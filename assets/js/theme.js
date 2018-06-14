
$(document).ready(function()
{
    /*
     * Load page
     */
    var page = getUrlParameter('page', 'dashboard');
    openPage(page);
    $('.th-sidebar [data-page]').on('click', function(e) {
        openPage($(this).data('page'));
    });

    /*
     * Sidebar state
     */
    var sidebarState = Cookies.get('th-sidebar-state');
    if (sidebarState === undefined || sidebarState === 'show') {
        UIkit.toggle('[data-sidebar]').toggle();
    }
    $('[data-sidebar]').on('click', function(e) {
        setTimeout(function() {
            if ($('body').hasClass('th-sidebar-show')) {
                Cookies.set('th-sidebar-state', 'show');
            } else {
                Cookies.set('th-sidebar-state', 'hide');
            }
        }, 50);
    });

});

function openPage(page) {
    $('.th-sidebar a').each(function() {
        $(this).parent().removeClass('uk-active');
    });

    // load page
    var holder = $('[data-content]');

    holder.html('<div class="uk-card uk-card-default uk-card-body uk-card-small">loading..</div>');
    setTimeout(function() {
        holder.load('page/' + page + '.html', function() {
            // Mark nav active
            $('.th-sidebar [data-page="' + page + '"]').parent().addClass('uk-active');
        });
    }, 250);
}

/*
 * https://stackoverflow.com/a/21903119
 */
function getUrlParameter(sParam, sDefault) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }

    return sDefault;
}
