import {ecommerceApi} from "@/redux/api";

export const authApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<any, {email:string; password:string}>({
            query: ({ email, password }) => ({
                url:`/api/user/login/`,
                method: "POST",
                body: JSON.stringify({email, password}),
            })
        }),
    })
})
export const {
    useLoginMutation
} = authApi