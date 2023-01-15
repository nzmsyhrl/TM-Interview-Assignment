export class Address {
    aptNumber: string;
    city: string;
    state: string;
    postcode: string;
    street: string;
    section: string;

    constructor(address: string) {
        this.tokenize(address);
    }

    private tokenize(address: string) {
        // regular expressions for each address component
        const aptNumberRegex = /No\s\d+/gi;
        const cityRegex = /(kuala terengganu|kuala lumpur|kajang|bangi|damansara|petaling jaya|puchong|subang jaya|cyberjaya|putrajaya|mantin|kuching|seremban)/gi;
        const stateRegex = /(selangor|terengganu|pahang|kelantan|melaka|pulau pinang|kedah|johor|perlis|sabah|sarawak)/gi;
        const postcodeRegex = /\b[0-9]{5}\b/g;
        const streetRegex = /(jalan|jln|lorong|persiaran)\s/gi;

        let temp = address;

        // match each component in the address string
        let match = aptNumberRegex.exec(temp);
        if (match) {
            this.aptNumber = match[0];
            temp = temp.replace(this.aptNumber,'');
        }
        match = cityRegex.exec(temp);
        if (match) {
            this.city = match[0];
            temp = temp.replace(this.city,'');
        }
        match = stateRegex.exec(temp);
        if (match) {
            this.state = match[0];
            temp = temp.replace(this.state,'');
        }
        match = postcodeRegex.exec(temp);
        if (match) {
            this.postcode = match[0];
            temp = temp.replace(this.postcode,'');
        }
        match = streetRegex.exec(temp);
        if (match) {
            this.street = match[0];
            temp = temp.replace(this.street,'');
        }
        // everything else is considered as section
        this.section = temp.replace(/[^a-zA-Z\s]/g,'').trim();
    }
}
