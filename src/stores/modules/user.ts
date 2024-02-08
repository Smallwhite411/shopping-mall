import { defineStore } from 'pinia'
import { APP_NAME } from '@/libs/enum'
const STORE_KEY = APP_NAME + '-USER'

export const useUserStore = defineStore({
    id: STORE_KEY,
    state: (): UserState => ({
        token: '',
        authInfo: {},
    }),
    getters: {
        getToken: (state: UserState): string => {
            return state.token
        },
        getAuthInfo: (state: UserState): AuthInfoType => {
            return state.authInfo as AuthInfoType
        },
    },
    actions: {
        // 每个用户都有对应的token
        setToken(data: string) {
            this.token = data
        },
        removeToken() {
            this.token = ''
        },
        setAuthInfo(data: any) {
            this.authInfo = data
        },
        removeAuthInfo() {
            this.authInfo = {}
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage, // $localStorage,
                paths: ['token'], //可以选择保存的字段  其余的不保存
            },
            {
                storage: sessionStorage,
                paths: ['authInfo'],
            },
        ],
    },
})