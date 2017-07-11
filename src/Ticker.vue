<template>
    <div id="stock">
        <h3>{{stock.name}} | {{stockSymbol}}</h3>
        <p>{{stock.amount}}</p>
    </div>
</template>

<script>
    /*
    {
        stock: [{
            name: "XURPAS",
            price: {
                currency: "PHP",
                amount: 8.56
            },
            percent_change: 0.71,
            volume: 625200,
            symbol: "X"
        }],
        as_of: "2017-07-11T10:22:00+08:00"
    }
    
    */

    import axios from 'axios';

    export default {
        props: {
            stockSymbol: ''
        },
        data() {
            return {
                interval: 30000,
                stock: {
                    name: '',
                    amount: 0,
                    percent_change: '',
                    volume: 0,
                    symbol: ''
                },
                as_of: ''
            }
        },
        created: function () {
            this.getStock();
            setInterval(function () {
                this.getStock();
            }.bind(this), this.interval);
        },
        methods: {
            getStock: function () {
                axios.get('https://phisix-api.appspot.com/stocks/' + `${this.stockSymbol}` + '.json')
                    .then(response => {
                        for (let i = 0; i < response.data.length; i++) {
                            let stock = response.data[i];
                            console.log(stock);
                            this.stock.name = stock.stock[0].name;
                            this.stock.amount = stock.stock[0].price.amount;
                            this.stock.percent_change = stock.stock[0].percent_change;
                            this.stock.volume = stock.stock[0].volume;
                            this.stock.symbol = stock.stock[0].symbol;
                            this.as_of = stock.as_of;
                        }
                    })
                    .catch(e => { console.log(e) });
            }
        }
    }
</script>

<style lang="scss">

</style>