/**
 * 玩家信息
 * @class
 */
export class PlayerInfo {

    uid: string = ""
    nickname: string = ""
    level: number = 0
    signature: string = ""
    nameCardId: number = 0
    profileId: number = 0
    avatarList: any = {}
    updatetime = new Date()

    constructor(data: any) {
        this.uid = data.uid
        const playerinfo = data.playerInfo
        this.nickname = playerinfo.nickname
        this.level = playerinfo.level
        this.signature = playerinfo.signature
        this.nameCardId = playerinfo.nameCardId
        this.profileId = playerinfo.profilePicture.avatarId
        if ("avatarInfoList" in data) {
            data.avatarInfoList.forEach((element: any) => {
                this.avatarList[element.avatarId] = new AvatarInfo(element)
            })
        }
    }

    update(newavatarList: any) {
        newavatarList.forEach((element: AvatarInfo, key: number) => {
            this.avatarList[key] = element
        })
    }
}
/**
 * 角色信息
 * @class
 */
export class AvatarInfo {
    aid: number = 0
    level: number = 0
    ascension: number = 0
    fetter: number = 0
    constellation: number = 0
    // talents
    equips: Equipment
    updatetime = new Date()
    
    constructor(data: any) {
        this.aid = data.avatarId
        this.level = parseInt(data.propMap["4001"].val)
        this.ascension = parseInt(data.propMap["1002"].val)
        if ("talentIdList" in data) {
            this.constellation = data.talentIdList.length
        } else {
            this.constellation = 0
        }

        this.equips = new Equipment(data.equipList)
    }
}
/**
 * 武器信息
 * @class
 */
class Weapon {
    // 武器id
    id: number
    // 等级
    level: number
    // 精炼
    refinement: number
    // 突破
    promote: number

    constructor(data: any) {
        this.id = data.itemId
        this.level = data.weapon.level
        this.refinement = data.weapon.affixMap[parseInt("1" + this.id.toString())] + 1
        this.promote = data.weapon.promoteLevel
    }
}

class Equipment {
    //武器
    weapon: Weapon | null = null
    // 花
    flower: Artifact | null = null
    // 羽
    plume: Artifact | null = null
    // 沙
    sands: Artifact | null = null
    // 杯
    goblet: Artifact | null = null
    // 冠
    circlet: Artifact | null = null

    constructor(data: Array<any>) {
        data.forEach((element: any) => {
            switch (element.flat.itemType) {
                case "ITEM_WEAPON":
                    this.weapon = new Weapon(element)
                    break
                case "ITEM_RELIQUARY":
                    switch (element.flat.equipType) {
                        case "EQUIP_BRACER":
                            this.flower = new Artifact(element)
                            break
                        case "EQUIP_NECKLACE":
                            this.plume = new Artifact(element)
                            break
                        case "EQUIP_SHOES":
                            this.sands = new Artifact(element)
                            break
                        case "EQUIP_RING":
                            this.goblet = new Artifact(element)
                            break
                        case "EQUIP_DRESS":
                            this.circlet = new Artifact(element)
                            break

                    }

            }
        })
    }
}

class Artifact {
    // 圣遗物id
    id: number
    // 等级
    level: number
    // 星级
    rank: number
    // 类型
    type: string
    // 主属性id
    mainProp: number
    // 副属性id
    subProps: Array<number>


    constructor(data: any) {
        this.id = data.itemId
        this.level = data.reliquary.level - 1
        this.rank = data.flat.rankLevel
        this.type = data.flat.equipType
        this.mainProp = data.reliquary.mainPropId
        this.subProps = data.reliquary.appendPropIdList
    }
}


