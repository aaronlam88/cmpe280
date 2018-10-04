/**
 * an api to get data
 */
const api = {
    /**
     * get data from backend server using jQuery get
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
    }
}