let instance = null

class FlagResource {
    static getInstance() {
        if (!instance) {
            instance = new FlagResource()
        }
        return instance
    }

    constructor() {
        this.flags = {
            'ae': require('./images/ae.png'),
            'au': require('./images/au.png'),
            'br': require('./images/br.png'),
            'ca': require('./images/ca.png'),
            'cn': require('./images/cn.png'),
            'eg': require('./images/eg.png'),
            'fr': require('./images/fr.png'),
            'de': require('./images/de.png'),
            'hk': require('./images/hk.png'),
            'in': require('./images/in.png'),
            'iq': require('./images/iq.png'),
            'ir': require('./images/ir.png'),
            'it': require('./images/it.png'),
            'jp': require('./images/jp.png'),
            'nz': require('./images/nz.png'),
            'ru': require('./images/ru.png'),
            'sa': require('./images/sa.png'),
            'gb': require('./images/gb.png'),
            'us': require('./images/us.png'),
        }
    }

    get(name) {
        return this.flags[name]
    }
}

export default FlagResource.getInstance();
