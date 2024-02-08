interface UserState {
    token: string
    authInfo: AuthInfoType | {}
}
interface AuthInfoType {
    nickname: string
    phone: string
    email: string
    shippingAddress: string
    recipient: string
}
