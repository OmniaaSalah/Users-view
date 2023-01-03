import { environment } from "src/environments/environment";
import { Localization } from "../models/global/global.model";


export function getLocalizedValue(val:Localization){
    if(!(val instanceof Object)) return val
    let lang = localStorage.getItem('preferredLanguage') || environment.defaultLang
    return lang=='ar'? val.ar : val.en
}