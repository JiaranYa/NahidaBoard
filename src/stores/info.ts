import { defineStore } from "pinia"
import { PlayerInfo, AvatarInfo } from '../utils/models/storage'

export const useInfoStore = defineStore('uid', () => {
    const data = {};
    // uid合集
    const uidSet = new Set()

    const _updateUid = (uid: any) => {
        /**
         * 更新uid组，加入新的uid
         */
        if (!uidSet.has(uid)) {
            uidSet.add(uid)
        }
    }

    const _deleteUid = (uid: string) => {
        /**
         * 从uid组中删除某个uid的信息
         */
        if (uidSet.has(uid)) {
            uidSet.delete(uid)
        }
    }
    // 人物信息

    const infoData: any = {}

    // 数据更新
    const _updateInfo = (uid: any, data: any) => {
        /**
         * 更新角色信息
         */
        const newInfo = new PlayerInfo(data)

        if (uid in infoData) {
            const info: PlayerInfo = infoData[uid]
            if (info) {
                info.update(newInfo.avatarList)
                infoData[uid] = info
            }
        } else {
            infoData[uid] = newInfo
        }
    }
    const getDataFormUid = (uid: string) => {
        return infoData.get(uid)
    }

    // 处理enka数据
    const updateFromEnka = (enka_data: object) => {
        if ("uid" in enka_data) {
            const uid = enka_data.uid
            _updateUid(uid)

            if ("playerInfo" in enka_data) {
                _updateInfo(uid, enka_data)
            }
        }
    }

    const deleteFromUid = (uid: string) => {

    }

    return { data, updateFromEnka, deleteFromUid, uidSet, infoData }
})