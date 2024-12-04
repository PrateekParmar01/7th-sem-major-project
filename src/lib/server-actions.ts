import {prisma} from '@/lib/db';

export const postDoubt = async(userId:string,chapterId:string|null,question:string,description:string,isOwner:boolean) => {
    try{
        const newDoubt = await prisma.doubt.create({
            data : {
                userId,
                chapterId,
                question,
                description,
                isOwner,
                views : 0
            }
        })

        console.log(newDoubt);
        return 
    }
    catch(error){
        console.log('Error posting doubt',error);

    }
}

