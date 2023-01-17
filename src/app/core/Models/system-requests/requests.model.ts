import { Localization } from "../global/global.model"

export interface WorkflowOptions{
    
    id: 166,
    title: Localization
    label: Localization
    isCommentRequired: boolean,
    commentTitle: string,
    isAttachmentRequired: boolean,
    type: string,
    isActionVisibleExternally: boolean,
    buttonTag: buttonStyle
    isLoading:boolean
}


type buttonStyle = 'primary' | 'outline-none' | 'secondary'