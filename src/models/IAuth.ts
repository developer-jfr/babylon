export type IAuth = {
    access_token: string,
    refresh_token: string,
    token_type: string
}

export type IRegister = {
    username: string,
    email: string,
    password1: string,
    password2: string
}

export type ILogin = {
    username: string | null,
    password: string | null,
}

export type ISend = {
    success: boolean
}

export type IUpdateMe = {
    token: string,
    first_name: string,
    last_name: string,
    phone: string,
    comment: string
}

export type IUpdateMeRes = {
    first_name: string,
    last_name: string,
    phone: string,
    comment?: string
}



export type IUpdateUserNotification = {
    token: string,
    tg_notifications: true,
    email_notifications: true
}

export type IUpdateUserNotificationRes = {
    tg_notifications: true,
    email_notifications: true
}


export type IPersonalArea = {
    token: string
    first_name: string,
    last_name: string,
    phone: string,
    comment: string
}

export type INotification = {
    token: string
    tg_notifications: boolean
    email_notifications: boolean
}

export type IChangePassword = {
    email: string | undefined
    code: string
    password1: string
    password2: string
}

export type IRessetPassword = {
    password1: string
    password2: string
}

//--------------- Errors ------------
export type IErrorCode = {
    response: {
        data: {
            detail: string
        }
    }
}

export type IErrorCode422 = {
    detail: [
        {
            loc: [
                string
            ],
            msg: string,
            type: string
        }
    ]
}

//--------------- Users Me ---------------
export type IUsersMe = {
    id: string
    created_at: string
    username: string
    email: string,
    hashed_password: string
    first_name: string
    last_name: string
    phone: string
    comment: string
    is_active: boolean
    is_superuser: boolean
    tg_notifications: boolean
    email_notifications: boolean
    password_reset_code: string
    parent_id: string
}

//------------------ User Details ------------------
export type IUserDetails = {

    id: string
    username: string
    first_name: string
    last_name: string
    email: string
    phone: string
}