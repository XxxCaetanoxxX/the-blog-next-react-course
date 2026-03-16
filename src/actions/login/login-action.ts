'use server'

import { asyncDelay } from "@/utils/async-delay"

type loginActionState={
    username:string,
    error:string
}

export async function loginAction(state: loginActionState, formData: FormData){
 await asyncDelay(3000);

 return{
    username:'',
    error:''
 }

}