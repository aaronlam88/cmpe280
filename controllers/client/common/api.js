/**
 * an api to get data
 */
const api = {
    /**
     * get data from backend server using jQuery get or local cache with localStorage
     * will call $.get, will do window.dispatchEvent(url)
     * to get the data, use window.addEventListener(url, (event) => (event.data))
     * @param {string} url 
     */
    jQueryGet(url, eventID) {
        $.get(
            url,
        ).done((data) => {
            console.debug('success')
        }).fail(() => {
            console.error('fail');
        }).always((data) => {
            let event = new Event(eventID);
            event.data = data;
            window.dispatchEvent(event);
        });
    },

    /**
     * get data from backend server using jQuery post or local cache with localStorage
     * will call $.get, will do window.dispatchEvent(url)
     * to get the data, use window.addEventListener(url, (event) => (event.data))
     * @param {string} url 
     */
    jQueryPost(url, data, eventID) {
        $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (result) {
                    let event = new Event(eventID);
                    event.data = result;
                    window.dispatchEvent(event);
                }
            })
    }
}