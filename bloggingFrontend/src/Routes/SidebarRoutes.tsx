import {MessageCircleDashed , Home,UserRoundPen,Images,BookPlus ,BookHeart,Inbox, Search, Settings } from "lucide-react"

export const navMain=[
    {
        title:'Dashboard',
        url:'/admin',
        icon: Home,
    },
    {
        title:'Search',
        url:'/admin/search',
        icon: BookHeart,
    },
    {
        title:'My Blogs',
        url:'/admin/post',
        icon: BookHeart,
    },
    {
        title:'Create Blog',
        url:'/admin/add-post',
        icon: BookPlus ,
    },
    {
        title:'My Comments',
        url:'/admin/comments',
        icon: MessageCircleDashed,
    },
    {
        title:'Gallary',
        url:'/admin/gallary',
        icon: Images,
    },
    {
        title:'Profile',
        url:'/admin/profile',
        icon: UserRoundPen ,
    },

]



  