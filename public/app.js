const vue = Vue.createApp({
    data() { // Data or variables in a vue app
        return {
            templateList: [],
            index: 0,
            admin: false,
            socket: null,
            ip: ""
        }
    },
    async created() { // when the app is created/initialized
        this.socket = io.connect("http://localhost:5500"); // connect to a socket
        
        this.socket.on('connect', () => { // on socket connect
            console.log("connected to server")
        });

        // on created get the list right away
        try {
            this.templateList = await (await fetch('http://localhost:5500/templateList')).json();
            this.saveToLocalStorage()
        } catch(err){
            console.log(err)
        }
        
    },
    socket: {
        connect: () => {console.log("connected")}
    },
    methods: { // methods should be here | methods that are here sould always be async
        getTemplateLists: async function() { // get the templateLists
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            };

            await fetch("http://localhost:5055/templateList", requestOptions)
            .then(response => response.json()) // turn response into json
            .then(data => { // do what you want
                this.templateList = data;
            })
        },
        getListById: async function(id) { // get a single list via ID

        },
        saveToLocalStorage: async function() { // save to local storage the templateList
            localStorage.setItem('TemplateLists', JSON.stringify(this.templateList));
        },
    }
}).mount('#app');