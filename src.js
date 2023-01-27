import fetch from "node-fetch";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class accountCleaner {
    constructor(token) {
        this.token = token;
        this.channelIds = [];
        this.serverIds = [];
    }
    async verifyAuth() {
        const url = "https://discord.com/api/users/@me";
        const res = await fetch(url, {
            headers: {
                authorization: this.token
            }
        })
        const data = await res.json();
        if (data.id)  return {
            isValid: true
        };
    }
    async getServerIds() {
        const url = "https://discord.com/api/users/@me/guilds"
        const res = await fetch(url, {
            method: "GET",
            headers: {
                authorization: this.token
            }
        })
        const data = await res.json();
        for (let i = 0; i < data.length; i++) {
            this.serverIds.push(data[i].id);
        }
    }

    async getDmIds() {
        const url = "https://discord.com/api/users/@me/channels"
        const res = await fetch(url, {
            method: "GET",
            headers: {
                authorization: this.token
            }
        })
        const data = await res.json();
        for (let i = 0; i < data.length; i++) {
            this.channelIds.push(data[i].id);
        }
    }

    async leaveServer(guildId) {
        const url = `https://discord.com/api/v9/users/@me/guilds/${guildId}`
        try {
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    authorization: this.token
                }
            })
            const statusC = await res.json();
            if (statusC !== 204) await this.deleteServer(guildId);
        } catch (e) {
            return;
        }

    }
    async deleteServer(guildId) {
        const url = `https://discord.com/api/v9/guilds/${guildId}/delete`;
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    authorization: this.token
                }
            })
            console.log(await res.json());
        } catch (e) {
            return;
        }
    }

    async closeDms(channelId) {
        const url = `https://discord.com/api/v9/channels/${channelId}?silent=false`
        try {
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    authorization: this.token
                }
            })
        } catch (e) {
            return;
        }
    }
    async Wipe() {
        await this.getDmIds();
        await this.getServerIds();
        for (var x = 0; x < this.channelIds.length; x++) {
            await this.closeDms(this.channelIds[x]);
            await sleep(200);
        }
        for (var x = 0; x < this.serverIds.length; x++) {
            await this.leaveServer(this.serverIds[x]);
            await sleep(200);
        }
    }
}

export default accountCleaner;