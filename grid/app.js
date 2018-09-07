var dataStatusApp = new Vue({
    el: "#dataStatusApp",
    created() {
        this.ws = new WebSocket("wss://real.okex.com:10440/websocket/okexapi"); /* this.ws*/    
        /* чтоб не было проблем с адресацией стоит заменить формат:
            function(error) { console.log("error", error); }; 
        на  (error) => { console.log("error", error); };
        */    

        this.ws.onopen = () => { console.log("onopen", this.throttling.next); };
        this.ws.onerror = (error) => { console.log("error", error); };
        this.ws.onclose = (e) => { console.log("close", e); };
        this.ws.onmessage = (message) => { console.log("message", message); };

        for (let i = 1; i < this.numRows; i++) {
            this.dataStatus[i] = { 
                id: i,
                timeReceived: i,
                status: 0,
                bidRate: i,
                askRate: i,
                bidSize: i,
                askSize: i 
            };
        }
        this.timer = setInterval(() => {
            let id = Math.floor(Math.random() * (this.numRows) + 1),
                value = Math.random() * 509;
            status = Math.floor(Math.random() * 20);
            this.setDataStatusById({
                id: id,
                timeReceived: Date.now(),
                status: status > 1 ? 2 : status,
                bidRate: value,
                askRate: value*1.25,
                bidSize: Math.floor(value/10),
                askSize: Math.floor(value/7) 
            });
        }, 100);
    },  
    beforeDestroy () {
        clearInterval(this.timer);
    },
    computed: {
        data () { return this.dataStatus || {}; },
    },
    methods: {
      
        setDataStatusById (param) {
            this.dataStatus[param.id] = param;
            if (Date.now() > this.throttling.next) { /* throttling*/
                this.setObjReactive (this.dataStatus);
                this.throttling.next = this.throttling.interval + Date.now();
                // console.log("throttling", this.throttling.next);
            }
        },
          
        setObjReactive (obj) {      
        /* vue.js имеет баг при реактивности сложных объектов, этот хак
        вызывает принудительное обновление объекта для реактивности*/
            Vue.set(obj, "setObjReactive", 42); 
            Vue.delete(obj, "setObjReactive");
        },
    },
    data: {
        timer: 0,
        numRows: 70,
        throttling: { /* инициализация throttling на 5 сек*/
            interval: 5000,
            next: Date.now()
        },
        ws: 0, /* не хорошо объявлять глобально, что-то может ws переопределить и начнутся странные баги*/
        dataStatus: {id: {}},
        tableStyle: "caption black white--text",
        tableHeaderStyle: "primary",
        tableBodyStyle: "grey lighten-5 black--text font-weight-light",
        statusColor: {
            "0": "",
            "2": "green accent-1",
            "1": "red accent-1"
        }
    }
});