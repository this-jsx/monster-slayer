function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    computed: {
        monsterBarStyles() {
            if(this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles() {
            if(this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if(value <=0 && this.monsterHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'monster'
            } 
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'player'
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            // const attackValue = this.monsterHealth -= attackValue;
            const attackValue = getRandom(5, 12);
            this.addLogMessages('player', 'attack', attackValue);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer() {    
            // const attackValue = this.playerHealth -= attackValue;
            const attackValue = getRandom(8, 15);
            this.addLogMessages('monster', 'attack', attackValue);
            this.playerHealth -= attackValue
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandom(10, 25);
            this.addLogMessages('player', 'attack', attackValue);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandom(8, 20);
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue
            }
            this.addLogMessages('player', 'heal', healValue);
            this.attackPlayer()
        },
        surrender() {
            return this.winner = 'monster'
        },
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null,
            this.logMessages = []
        },
        addLogMessages(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },
})

app.mount('#game')