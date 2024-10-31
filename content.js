if (window.location.hostname === 'dev-bootcamp.mitrais-dev.com') {
    (async () => {
        const authValues = {
            'graph-refresh-token': window.localStorage.getItem('graph-refresh-token'),
            'atomic-access-token': window.localStorage.getItem('atomic-access-token'),
            'graph-access-token': window.localStorage.getItem('graph-access-token'),
            'atomic-refresh-token': window.localStorage.getItem('atomic-refresh-token'),
            'user': window.localStorage.getItem('user'),
        }
        
        const result = await browser.runtime.sendMessage({
            type: 'put', values: authValues
        });
        
        result && alert('Copied!!');
    })();
} else if (/^localhost/.test(window.location.hostname)) {
    (async () => {
        const result = await browser.runtime.sendMessage({ type: 'get' });
        
        if (result && typeof result === 'object' && result.hasOwnProperty('authValues')) {
            const { authValues } = result;
        
            for (let key in authValues) {
                window.localStorage.setItem(key, authValues[key]);
            }
    
            if (window.confirm('Woosh... Just rescued 3 minutes of your precious time. \nUse them wisely.')) {
                window.location.reload();
            }
        } else {
            if (window.confirm('Please login first. I\'ll show you the way.')) {
                window.location.href = 'dev-bootcamp.mitrais-dev.com';
            }
        }
    })();
}
