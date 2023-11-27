<script setup lang="ts">
import { ref } from "vue";
const { ipcRenderer } = window.require('electron')
import { useInfoStore } from '../stores/info'
// import { PlayerInfo } from '../utils/models/storage'
import { useStaticStore } from "../stores/static"

// 通过uid从enka获取展柜信息
const inputuid = ref();
const submitUID = (uid: string) => {
    ipcRenderer.send('getenka', uid)

    ipcRenderer.on('enka-response', (_event: any, data: any) => {
        // 处理enka数据
        uidStore.updateFromEnka(data)
    })
}

const uidStore = useInfoStore()
const s = useStaticStore()
function test() {
    const data = uidStore.data
    uidStore.updateFromEnka(data)
    console.log(s.p)
}
</script>

<template>
    <div class="container">
        <div class="header">
            <div class="inputbox">
                <input type="text" v-model="inputuid" placeholder="请输入内容" />
                <button @click="submitUID(inputuid)">提交</button>
            </div>
        </div>
        <div class="content">
            <button @click="test">测试</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.header {
    position: relative;
    height: 40%;

    .inputbox {
        position: absolute;
        top: 50%;
        left: 50%;
    }
}

.content {
    position: relative;
    height: 60%;
    width: 100%;
    background-color: lightgreen;
}
</style>
../stores/info